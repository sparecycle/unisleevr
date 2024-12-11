<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class ShowCards extends Command
{
    protected $signature = 'db:show-cards';
    protected $description = 'Display cards from the database';

    public function handle()
    {
        $cards = DB::table('cards')->take(10)->get();

        $this->info("Displaying the first 10 cards:");
        $this->table(['Scryfall ID', 'Name', 'Set', 'Collector Number', 'Scryfall URI'], $cards->map(function ($card) {
            return [
                $card->id,
                $card->name,
                $card->set,
                $card->collector_number,
                $card->scryfall_uri,
            ];
        })->toArray());
    }
}
