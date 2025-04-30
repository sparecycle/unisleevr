<?php

use App\Models\Deck;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('creates a deck', function () {
    $user = User::factory()->create();

    $this->actingAs($user);

    $payload = [
        'name' => 'Test Deck',
        'user_id' => $user->id,
        'cards' => [
            ['id' => 1, 'name' => 'Card A', 'type' => 'Creature'],
            ['id' => 2, 'name' => 'Card B', 'type' => 'Spell'],
        ],
        'commanders' => [
            ['id' => 1, 'name' => 'Commander A', 'type' => 'Legendary Creature'],
            ['id' => 2, 'name' => 'Commander B', 'type' => 'Planeswalker'],
        ],
    ];

    $response = $this->post(route('decks.store'), $payload);

    $deck = Deck::where('name', 'Test Deck')->first();

    expect($deck)->not->toBeNull();
    expect($deck->cards)->toBe($payload['cards']);
    expect($deck->commanders)->toBe($payload['commanders']);
    expect($user->refresh()->decks)->toHaveCount(1);
    expect($user->decks->first()->name)->toBe('Test Deck');

    $response->assertRedirect(route('decks.index'));
    $this->assertDatabaseHas('decks', [
        'name' => 'Test Deck',
        'cards' => json_encode($payload['cards']),
        'commanders' => json_encode($payload['commanders']),
    ]);
});

it('lists decks on the index route', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    Deck::factory()->count(3)->create(['user_id' => $user->id]);

    $response = $this->get(route('decks.index'));

    $response->assertStatus(200);
    $response->assertSee('Decks');
});

it('updates a deck', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $deck = Deck::factory()->create(['user_id' => $user->id]);

    $payload = [
        'name' => 'Updated Deck Name',
        'cards' => [
            ['id' => 1, 'name' => 'Card C', 'type' => 'Creature'],
            ['id' => 2, 'name' => 'Card D', 'type' => 'Spell'],
        ],
        'commanders' => [
            ['id' => 1, 'name' => 'Commander C', 'type' => 'Legendary Creature'],
            ['id' => 2, 'name' => 'Commander D', 'type' => 'Planeswalker'],
        ],
    ];

    $response = $this->put(route('decks.update', $deck), $payload);

    $deck->refresh();

    expect($deck->cards)->toBe($payload['cards']);
    expect($deck->name)->toBe('Updated Deck Name');

    $response->assertRedirect(route('decks.index'));
    $this->assertDatabaseHas('decks', [
        'id' => $deck->id,
        'name' => 'Updated Deck Name',
        'cards' => json_encode($payload['cards']),
        'commanders' => json_encode($payload['commanders']),
    ]);
});

it('deletes a deck', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $deck = Deck::factory()->create(['user_id' => $user->id]);

    $response = $this->delete(route('decks.destroy', $deck));

    $response->assertRedirect(route('decks.index'));
    $this->assertDatabaseMissing('decks', ['id' => $deck->id]);
});
