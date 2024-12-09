<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use JsonMachine\Items;
use App\Models\Card;

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
        
        if ($response->failed()) {
            $this->error('Failed to fetch bulk data metadata. Status: ' . $response->status());
            return 1;
        }
        
        $downloadUrl = $response->json('download_uri');
        $localFilePath = storage_path('app/scryfall_cards.json');
        
        $this->info("Downloading bulk data to {$localFilePath}...");
        $downloadResponse = Http::withOptions(['sink' => $localFilePath])->get($downloadUrl);
        
        if ($downloadResponse->failed()) {
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
        $this->info('Streaming and processing JSON array...');
        
        // Stream the JSON file
        $cards = Items::fromFile($filePath);
        
        $processed = 0;
        
        foreach ($cards as $card) {
            try {
                // Check if image_uris exists; provide a default if missing
                $imageUris = isset($card->image_uris) ? json_encode($card->image_uris) : '{}';
                
                Card::updateOrCreate(
                    ['id' => $card->id],
                    [
                        'name' => $card->name ?? null,
                        'scryfall_uri' => $card->scryfall_uri ?? null,
                        'highres_image' => $card->highres_image ?? false,
                        'image_status' => $card->image_status ?? 'unknown',
                        'image_uris' => $imageUris, // Use default empty JSON object if missing
                        'foil' => $card->foil ?? false,
                        'nonfoil' => $card->nonfoil ?? false,
                        'finishes' => isset($card->finishes) ? json_encode($card->finishes) : '[]', // Default to empty array
                        'set' => $card->set ?? 'unknown',
                        'set_name' => $card->set_name ?? 'unknown',
                        'collector_number' => $card->collector_number ?? '0',
                        ]
                    );
                    
                    $processed++;
                    
                    // Optional: Display progress every 1000 records
                    if ($processed % 1000 === 0) {
                        $this->info("Processed {$processed} cards...");
                    }
                } catch (\Exception $e) {
                    $this->error('Failed to process card ID ' . ($card->id ?? 'unknown') . ': ' . $e->getMessage());
                }
            }
            
            $this->info("All cards processed. Total cards: {$processed}");
        }
    }