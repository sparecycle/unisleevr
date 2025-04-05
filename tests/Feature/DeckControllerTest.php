<?php

namespace Tests\Feature;

use App\Models\Deck;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DeckControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test the create route for DeckController.
     */
    public function test_create_deck()
    {
        // Create a user
        $user = User::factory()->create();

        // Simulate a logged-in user
        $this->actingAs($user);

        // Assert that the decks relationship exists and is initially empty
        $this->assertInstanceOf(\Illuminate\Database\Eloquent\Collection::class, $user->decks);
        $this->assertTrue($user->decks->isEmpty());

        // Define the payload for the request
        $payload = [
            'name' => 'Test Deck',
            'user_id' => $user->id,
            'cards' => [
                ['id' => 1, 'name' => 'Card A', 'type' => 'Creature'],
                ['id' => 2, 'name' => 'Card B', 'type' => 'Spell'],
            ],
        ];

        // Send a POST request to the create route
        $response = $this->post(route('decks.store'), $payload);

        // Retrieve the deck from the database
        $deck = Deck::where('name', 'Test Deck')->first();

        $this->assertNotEmpty($deck->cards);
        // Assert that the deck was created in the database
        $this->assertDatabaseHas('decks', [
            'name' => 'Test Deck',
            'user_id' => $user->id,
        ]);

        // Assert that the cards were stored correctly as an array
        $this->assertEquals($payload['cards'], $deck->cards); // Use the model's casted value

        // Refresh the user to load the new relationship data
        $user->refresh();

        // Now check that the user has one deck
        $this->assertInstanceOf(\Illuminate\Database\Eloquent\Collection::class, $user->decks);
        $this->assertFalse($user->decks->isEmpty());
        $this->assertEquals(1, $user->decks->count());
        $this->assertEquals('Test Deck', $user->decks->first()->name);

        // Assert that the response redirects to the decks index page
        $response->assertRedirect(route('decks.index'));
    }

    /**
     * Test the index route for DeckController.
     */
    public function test_index_decks()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        Deck::factory()->count(3)->create(['user_id' => $user->id]);

        $response = $this->get(route('decks.index'));

        $response->assertStatus(200);
        $response->assertSee('Decks');
    }

    /**
     * TO DO: Test the show route for DeckController.
     */


    /**
     * TO DO: Test the edit route for DeckController.
     */

    /**
     * Test the update route for DeckController.
     */
    public function test_update_deck()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        // Assert that the decks relationship exists and is initially empty
        $this->assertInstanceOf(\Illuminate\Database\Eloquent\Collection::class, $user->decks);
        $this->assertTrue($user->decks->isEmpty());

        $deck = Deck::factory()->create(['user_id' => $user->id]);

        $payload = [
            'name' => 'Updated Deck Name',
            'cards' => [
                ['id' => 1, 'name' => 'Card A', 'type' => 'Creature'],
                ['id' => 2, 'name' => 'Card B', 'type' => 'Spell'],
            ]
        ];

        $response = $this->put(route('decks.update', $deck), $payload);

        $user->refresh();

        $this->assertFalse($user->decks->isEmpty());

        $response->assertRedirect(route('decks.index'));
        $this->assertDatabaseHas('decks', ['id' => $deck->id, 'name' => 'Updated Deck Name']);
    }

    /**
     * Test the destroy route for DeckController.
     */
    public function test_destroy_deck()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $deck = Deck::factory()->create(['user_id' => $user->id]);

        $response = $this->delete(route('decks.destroy', $deck));

        $response->assertRedirect(route('decks.index'));
        $this->assertDatabaseMissing('decks', ['id' => $deck->id]);
    }
}
