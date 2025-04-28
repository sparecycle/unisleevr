<?php

namespace App\Console\Commands;

use App\Models\Deck;
use Illuminate\Console\Command;
use Illuminate\Support\Str;


class SeedUserWithDecks extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'deck:seedmany {userId} {count}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create multiple decks for a given user ID, each seeded with a predefined card.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Get the user ID and number of decks from the command arguments
        $userId = $this->argument('userId');
        $count = (int) $this->argument('count');

        // Predefined card data
        $cardData = array([

                'id' => '4f616706-ec97-4923-bb1e-11a69fbaa1f8',
                'name' => 'Counterspell',
                'oracleText' => 'Counter target spell.',
                'cardSuperType' => ['Instant'],
                'cardType' => [],
                'colorIdentity' => ['U'],
                'imgUris' => [
                    'art_crop' => 'https://cards.scryfall.io/art_crop/front/4/f/4f616706-ec97-4923-bb1e-11a69fbaa1f8.jpg?1726837907',
                    'border_crop' => 'https://cards.scryfall.io/border_crop/front/4/f/4f616706-ec97-4923-bb1e-11a69fbaa1f8.jpg?1726837907',
                    'large' => 'https://cards.scryfall.io/large/front/4/f/4f616706-ec97-4923-bb1e-11a69fbaa1f8.jpg?1726837907',
                    'normal' => 'https://cards.scryfall.io/normal/front/4/f/4f616706-ec97-4923-bb1e-11a69fbaa1f8.jpg?1726837907',
                    'png' => 'https://cards.scryfall.io/png/front/4/f/4f616706-ec97-4923-bb1e-11a69fbaa1f8.png?1726837907',
                    'small' => 'https://cards.scryfall.io/small/front/4/f/4f616706-ec97-4923-bb1e-11a69fbaa1f8.jpg?1726837907',
                ],
                'manaCost' => ['{U}', '{U}'],
        ]);

        // Create the specified number of decks
        for ($i = 1; $i <= $count; $i++) {
            $deck = new Deck();
            $generatedName = "dummy-deck-" . Str::uuid(); // Generate the name
            $deck->name = substr($generatedName, 0, 46); // Truncate to 46 characters
            $deck->user_id = $userId;
            $deck->cards = $cardData; // Assign the array directly
            $deck->commanders = generateRandomCommander(); // Assign the array directly
            $deck->save();

            $this->info("Deck {$deck->name} created for user ID {$userId}.");
        }

        $this->info("Successfully created {$count} decks for user ID {$userId}.");
        return 0;
    }
}
