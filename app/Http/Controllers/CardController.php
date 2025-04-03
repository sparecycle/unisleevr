<?php

namespace App\Http\Controllers;

use App\Models\Deck;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class CardController extends Controller
{
    public function index(): Response 
    {
        $userId = Auth::id();
        $decks = Deck::query()
            ->where('user_id', $userId)
            ->get();

        $cardIdList = $decks->flatMap(function ($deck) {
            return collect($deck->cards)->pluck('id');
        })->unique()->values()->toArray();

        $allCards = [];
        
        // Split the identifiers array into chunks of 75
        $chunks = array_chunk($cardIdList, 75);

        // Iterate over each chunk and make an HTTP request
        foreach ($chunks as $chunk) {
            // Transform the chunk into the correct format
            $identifiers = array_map(fn($id) => ['id' => $id], $chunk);

            $scryfallResponse = Http::post('https://api.scryfall.com/cards/collection', [
                'identifiers' => $identifiers // Correctly formatted array
            ]);

            if ($scryfallResponse->successful()) {
                $cards = $scryfallResponse->json('data');
                $allCards = array_merge($allCards, $cards);
            } else {
                error_log('Failed to fetch cards from Scryfall API. Status: ' . $scryfallResponse->status());
            }
        }

        return Inertia::render('Cards/Index', [
            'cards' => $allCards,
            'decks' => $decks
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Card $Card)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Card $Card)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Card $Card)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Card $Card)
    {
        //
    }
}
