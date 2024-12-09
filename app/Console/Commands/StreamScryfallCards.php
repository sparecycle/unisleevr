<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Card;

class StreamScryfallCards extends Command
{
    protected $signature = 'scryfall:stream-cards';
    protected $description = 'Stream and import Magic: The Gathering cards from Scryfall';

    public function handle()
    {
        $this->info('Fetching bulk data URL...');
        $bulkDataUrl = 'https://api.scryfall.com/bulk-data/default-cards';

        $response = file_get_contents($bulkDataUrl);
        $bulkData = json_decode($response, true);

        $downloadUrl = $bulkData['download_uri'];

        $this->info('Downloading and streaming bulk card data...');
        $handle = fopen($downloadUrl, 'r');

        if ($handle) {
            while (($line = fgets($handle)) !== false) {
                $card = json_decode($line, true);

                if ($card) {
                    $this->importCard($card);
                }
            }
            fclose($handle);
        } else {
            $this->error('Unable to open the data stream.');
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
