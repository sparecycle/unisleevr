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
    public function index(): Response 
    {
        $userId = Auth::id();
        $decks = Deck::query()
            ->where('user_id', $userId)
            ->get();

        $cardList = $decks->flatMap(function ($deck) {
            return $deck->cards;
        })->unique()->values()->all();


        return Inertia::render('Cards/Index', [
            'cards' => $cardList
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
