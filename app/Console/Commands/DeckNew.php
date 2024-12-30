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
        // $this->info('hello world');
        $deckName = $this->ask('Deck Name:');
        $deckUserID = $this->ask('User ID:');
        $this->info($deckName);

        if ($this->confirm('Is this information correct?')) {
            $deck = new Deck();
            $deck->name = $deckName;
            $deck->save();

            $this->info("Saved.");
        }

        return 0;
    }
}
