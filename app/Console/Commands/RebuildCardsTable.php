<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use JsonMachine\Items;
use App\Models\Card;

class RebuildCardsTable extends Command
{
    protected $signature = 'scryfall:rebuild';
    protected $description = 'Rebuild the cards table daily using Scryfall bulk data';

    public function handle()
    {
        ini_set('memory_limit', '1G');
        $this->info('Fetching Scryfall bulk data URL...');
        $bulkDataUrl = 'https://api.scryfall.com/bulk-data/oracle-cards';
        $response = Http::get($bulkDataUrl);

        if ($response->failed()) {
            $this->error(
                'Failed to fetch bulk data metadata. Status: ' .
                    $response->status()
            );
            return 1;
        }

        $downloadUrl = $response->json('download_uri');
        $localFilePath = storage_path('app/scryfall_cards.json');

        $this->info("Downloading bulk data to {$localFilePath}...");
        $downloadResponse = Http::withOptions(['sink' => $localFilePath])->get(
            $downloadUrl
        );

        if ($downloadResponse->failed()) {
            $this->error(
                'Failed to download the bulk data file. Status: ' .
                    $downloadResponse->status()
            );
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
        $cards = Items::fromFile($filePath);
        $processed = 0;

        foreach ($cards as $card) {
            try {
                Card::updateOrCreate(
                    ['id' => $card->id],
                    [
                        'name' => $card->name ?? null,
                        'type_line' => $card->type_line
                            ? json_encode(splitStringByHyphen($card->type_line))
                            : null,
                        'oracle_text' => $card->oracle_text ?? null,
                        'color_identity' => isset($card->color_identity)
                            ? json_encode($card->color_identity)
                            : '{}',
                        'mana_cost' => isset($card->mana_cost)
                            ? json_encode(
                                turnManaCostIntoArray($card->mana_cost)
                            )
                            : null,
                        'power' => $card->power ?? null,
                        'toughness' => $card->toughness ?? null,
                        'scryfall_uri' => $card->scryfall_uri ?? null,
                        'image_uris' => isset($card->image_uris)
                            ? json_encode($card->image_uris)
                            : '{}',
                    ]
                );
                $processed++;
                if ($processed % 1000 === 0) {
                    gc_collect_cycles(); // Clean up memory
                    $this->info(
                        "Processed {$processed} cards. Memory cleaned."
                    );
                }
            } catch (\Exception $e) {
                $this->error(
                    'Failed to process card ID ' .
                        ($card->id ?? 'unknown') .
                        ': ' .
                        $e->getMessage()
                );
            }
        }
        $this->info("All cards processed. Total cards: {$processed}");
    }
}
