<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Deck;
use App\Models\Card;

class DeckCardSeeder extends Seeder
{
    public function run()
    {
        $wabbitDeck = Deck::where('name', 'Wabbits')->first();
        if ($wabbitDeck) {
            $wabbitDeck->cards()->syncWithoutDetaching([
                'a16fabbe-4557-4067-b882-f2e5dbd8b458', // Sword of Hearth and Home
                '70291c7b-a86f-4466-8502-c28765a89b2a', // Green Sun's Zenith
                '89e8443d-daf4-4cef-9080-d7568b5c540e', // Talisman of Unity
                'dc137850-df52-400c-95e2-45bf25a3e62c', // Selesnya Signet
                'b16321b6-3e28-424b-ac72-038cc4ed6458', // Swords to Plowshares
                'a7aed564-2d2d-42c4-bf11-812bc1a0284c', // Path to Exile
                'f2c4f80e-84a0-463b-82c3-5c6503809351', // Doubling Season
            ]);
        }

        $blessedDeck = Deck::where('name', 'Blessed Bounce')->first();
        if ($blessedDeck) {
            $blessedDeck->cards()->syncWithoutDetaching([
                'a16fabbe-4557-4067-b882-f2e5dbd8b458', // Sword of Hearth and Home
                '70291c7b-a86f-4466-8502-c28765a89b2a', // Green Sun's Zenith
                '89e8443d-daf4-4cef-9080-d7568b5c540e', // Talisman of Unity
                'dc137850-df52-400c-95e2-45bf25a3e62c', // Selesnya Signet
                'b16321b6-3e28-424b-ac72-038cc4ed6458', // Swords to Plowshares
                'a7aed564-2d2d-42c4-bf11-812bc1a0284c', // Path to Exile
                'b2af9184-df81-413b-abcf-331c4471e6d4', // Hornet Queen
                'f2c4f80e-84a0-463b-82c3-5c6503809351', // Doubling Season
            ]);
        }

        $verdantDeck = Deck::where('name', 'Verdant be thy name')->first();
        if ($verdantDeck) {
            $verdantDeck->cards()->syncWithoutDetaching([
                '4e4fb50c-a81f-44d3-93c5-fa9a0b37f617', // Omnath, Locus of Creation
                '70291c7b-a86f-4466-8502-c28765a89b2a', // Green Sun's Zenith
                'b2af9184-df81-413b-abcf-331c4471e6d4', // Hornet Queen
            ]);
        }
    }
}
