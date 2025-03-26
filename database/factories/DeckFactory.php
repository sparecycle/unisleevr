<?php

namespace Database\Factories;

use App\Models\Deck;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class DeckFactory extends Factory
{
    protected $model = Deck::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->words(3, true), // Generate a random deck name
            'user_id' => User::factory(), // Associate with a user
            'cards' => [ // Store cards as an array
                ['id' => 1, 'name' => 'Card A', 'type' => 'Creature'],
                ['id' => 2, 'name' => 'Card B', 'type' => 'Spell'],
            ],
        ];
    }
}
