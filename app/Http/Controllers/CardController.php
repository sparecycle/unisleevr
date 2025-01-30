<?php

namespace App\Http\Controllers;

use App\Models\Card;
use App\Models\Deck;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


use Inertia\Inertia;
use Inertia\Response;


class CardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response 
    {
        // This will be replaced by assuming the cards based on the user's decks
        $cards = Card::paginate(10);

        $decks = Deck::query()
        ->where('user_id', Auth::id())
        ->paginate(12);

        return Inertia::render('Cards/Index', [
            'cards' => $cards,
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
