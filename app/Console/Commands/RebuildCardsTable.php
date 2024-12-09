<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class RebuildCardsTable extends Command
{
    protected $signature = 'scryfall:rebuild-cards';
    protected $description = 'Rebuild the cards table daily using Scryfall bulk data';
    
    public function handle()
    {
        ini_set('memory_limit', '1G');
        $this->info('Fetching Scryfall bulk data URL...');
        $bulkDataUrl = 'https://api.scryfall.com/bulk-data/default-cards';
        $response = Http::get($bulkDataUrl);
        
        if ($response->status() !== 200) {
            $this->error('Failed to fetch bulk data metadata. Status: ' . $response->status());
            return 1;
        }
        
        $downloadUrl = $response->json('download_uri');
        $localFilePath = storage_path('app/scryfall_cards.json');
        
        $this->info("Downloading bulk data to {$localFilePath}...");
        $downloadResponse = Http::withOptions(['sink' => $localFilePath])->get($downloadUrl);
        
        if ($downloadResponse->status() !== 200) {
            $this->error('Failed to download the bulk data file. Status: ' . $downloadResponse->status());
            return 1;
        }
        
        $this->info('Clearing existing table...');
        try {
            DB::table('cards')->truncate();
        } catch (\Exception $e) {
            $this->error('Failed to truncate table: ' . $e->getMessage());
            return 1;
        }
        
        $this->info('Importing new data...');
        $this->importCards($localFilePath);
        
        $this->info('Cards table rebuilt successfully!');
    }
    
    private function importCards($filePath)
    {
        if (!file_exists($filePath)) {
            $this->error('The downloaded file does not exist at ' . $filePath);
            return;
        }
        
        $this->info('Streaming and processing JSON array...');
        
        $handle = fopen($filePath, 'r');
        if ($handle === false) {
            $this->error('Failed to open file for reading.');
            return;
        }

        $batch = [];
        $batchSize = 1000;
        $processed = 0;

        while (($line = fgets($handle)) !== false) {
            $card = json_decode($line, true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                $this->warn('Skipping invalid JSON line.');
                continue;
            }

            $batch[] = [
                'id' => $card['id'],
                'name' => $card['name'],
                'scryfall_uri' => $card['scryfall_uri'],
                'highres_image' => $card['highres_image'] ?? false,
                'image_status' => $card['image_status'] ?? 'unknown',
                'image_uris' => json_encode($card['image_uris'] ?? []),
                'foil' => $card['foil'] ?? false,
                'nonfoil' => $card['nonfoil'] ?? false,
                'finishes' => json_encode($card['finishes'] ?? []),
                'set' => $card['set'] ?? 'unknown',
                'set_name' => $card['set_name'] ?? 'unknown',
                'collector_number' => $card['collector_number'] ?? '0',
                'created_at' => now(),
                'updated_at' => now(),
            ];

            if (count($batch) >= $batchSize) {
                $this->processBatch($batch);
                $processed += count($batch);
                $batch = [];
            }
        }

        fclose($handle);

        // Process any remaining records in the batch
        if (!empty($batch)) {
            $this->processBatch($batch);
            $processed += count($batch);
        }

        $this->info("All cards processed. Total inserted: {$processed}");
    }

    private function processBatch(array $batch)
    {
        DB::transaction(function () use ($batch) {
            try {
                DB::table('cards')->insert($batch);
            } catch (\Exception $e) {
                $this->error('Failed to insert batch: ' . $e->getMessage());
            }
        });
    }
}
