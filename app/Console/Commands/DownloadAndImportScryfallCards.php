<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use App\Models\Card;

class DownloadAndImportScryfallCards extends Command
{
    protected $signature = 'scryfall:download-import-cards';
    protected $description = 'Download and import Magic: The Gathering cards from Scryfall';

    public function handle()
    {
        $this->info('Fetching bulk data URL...');
        $bulkDataUrl = 'https://api.scryfall.com/bulk-data/default-cards';

        $response = Http::get($bulkDataUrl);
        $bulkData = $response->json();

        $downloadUrl = $bulkData['download_uri'];
        $localFilePath = storage_path('app/scryfall_cards.json');

        $this->info("Downloading bulk data to {$localFilePath}...");
        $downloadResponse = Http::withOptions(['sink' => $localFilePath])->get($downloadUrl);

        if ($downloadResponse->status() !== 200) {
            $this->error('Failed to download the bulk data file.');
            return 1;
        }

        $this->info('Processing the downloaded file...');
        $handle = fopen($localFilePath, 'r');

        if ($handle) {
            while (($line = fgets($handle)) !== false) {
                $card = json_decode($line, true);

                if ($card) {
                    $this->importCard($card);
                }
            }
            fclose($handle);
        } else {
            $this->error('Unable to open the downloaded file.');
        }

        $this->info('Card import completed!');
    }

    private function importCard($card)
    {
        // Save only the required fields
        Card::updateOrCreate(
            ['id' => $card['id']],
            [
                'name' => $card['name'],
                'scryfall_uri' => $card['scryfall_uri'],
                'highres_image' => $card['highres_image'],
                'image_status' => $card['image_status'],
                'image_uris' => json_encode($card['image_uris']),
                'foil' => $card['foil'],
                'nonfoil' => $card['nonfoil'],
                'finishes' => json_encode($card['finishes']),
                'set' => $card['set'],
                'set_name' => $card['set_name'],
                'collector_number' => $card['collector_number'],
            ]
        );

        $this->info("Imported card: {$card['name']}");
    }
}
