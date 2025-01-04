<?php

namespace App\Http\Controllers;

use App\Models\Card;
use Illuminate\Http\Request;

use Inertia\Inertia;
use Inertia\Response;


class CardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response 
    {
        // Paginate the cards, 10 per page
        $cards = Card::paginate(10);

        return Inertia::render('Cards/Index', [
            'cards' => $cards
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
