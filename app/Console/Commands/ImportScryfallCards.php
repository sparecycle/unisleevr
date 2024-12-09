<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use App\Models\Card;

class ImportScryfallCards extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'scryfall:import-cards';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import Magic: The Gathering cards from Scryfall';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->info('Fetching bulk data URL...');
        $response = Http::get('https://api.scryfall.com/bulk-data/default-cards');
        $downloadUrl = $response->json('download_uri');

        $this->info('Downloading bulk card data...');
        $cards = Http::get($downloadUrl)->json();

        $this->info('Processing and importing cards...');
        collect($cards)->chunk(100)->each(function ($chunk) {
            foreach ($chunk as $card) {
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
            }
        });

        $this->info('Card import completed!');
        return 0;
    }
}
