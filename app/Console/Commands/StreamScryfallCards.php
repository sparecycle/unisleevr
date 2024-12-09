<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use App\Models\Card;

class StreamScryfallCards extends Command
{
    protected $signature = 'scryfall:stream-cards';
    protected $description = 'Stream and import Magic: The Gathering cards from Scryfall';

    public function handle()
    {
        $this->info('Fetching bulk data URL...');
        $response = Http::get('https://api.scryfall.com/bulk-data/default-cards');
        $downloadUrl = $response->json('download_uri');

        $this->info('Streaming and processing bulk card data...');
        $stream = Http::get($downloadUrl, ['stream' => true]);

        $stream->body(function ($chunk) {
            $cardData = json_decode($chunk, true);

            if ($cardData) {
                $this->importCard($cardData);
            }
        });

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
