<?php

namespace App\Http\Controllers;

use App\Models\Deck;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;


use Inertia\Inertia;
use Inertia\Response;


class CardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response 
    {
        // sample array - should return "Static Orb", "Sensory Deprivation", "Road of Return", "Henrika, Domnathi's Heir // Henrika, Infernal Seer"
        $cardList = array('86bf43b1-8d4e-4759-bb2d-0b2e03ba7012', '7050735c-b232-47a6-a342-01795bfd0d46','e718b21b-46d1-4844-985c-52745657b1ac', '946ca338-5f43-4cff-bd93-1b28449c5fdc');

        $identifiers = array_map(function($id) {
            return ['id' => $id];
        }, $cardList);

        // This will be replaced by assuming the cards based on the user's decks
        $scryfallResponse = Http::post('https://api.scryfall.com/cards/collection', [
            'identifiers' => $identifiers
        ]);
        

        $decks = Deck::query()
        ->where('user_id', Auth::id())
        ->paginate(12);

        return Inertia::render('Cards/Index', [
            'cards' => $scryfallResponse->json(),
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
