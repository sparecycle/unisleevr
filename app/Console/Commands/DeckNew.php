<?php

namespace App\Console\Commands;

use App\Models\Deck;
use Illuminate\Console\Command;

class DeckNew extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'deck:new';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Make a new deck for a given user id';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Ask for the deck name, user ID, and cards
        $deckName = $this->ask('Deck Name:');
        $deckUserID = $this->ask('User ID:');
        $deckCards = $this->ask('Cards (JSON format):');
        $this->info($deckName);

        // Confirm the information before creating the deck
        if ($this->confirm('Is this information correct?')) {
            // Create and save the new deck
            $deck = new Deck();
            $deck->name = $deckName;
            $deck->user_id = $deckUserID;
            $deck->cards = $deckCards; // Save cards as JSON string
            $deck->save();

            $this->info('Saved.');
        }

        return 0;
    }
}
