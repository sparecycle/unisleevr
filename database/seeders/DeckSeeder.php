<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Deck;
use App\Models\User;

class DeckSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all(); // Fetch all users

        $decks = [
            ['name' => 'Verdant be thy name', 'user_email' => 'jordan@addwonder.com'],
            ['name' => 'Wabbits', 'user_email' => 'jordan@addwonder.com'],
            ['name' => 'Blessed Bounce', 'user_email' => 'jordan@addwonder.com'],
        ];

        foreach ($decks as $deckData) {
            $user = $users->where('email', $deckData['user_email'])->first();

            if ($user) {
                // Create deck and assign it to the user
                $deck = Deck::updateOrCreate(
                    ['name' => $deckData['name']],
                    ['name' => $deckData['name'], 'user_id' => $user->id] // Assign user_id
                );
            }
        }
    }
}
