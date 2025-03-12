<?php

namespace App\Http\Controllers;

use App\Models\Deck;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

use Inertia\Inertia;

class DeckController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $decks = Deck::query()
            ->where('user_id', Auth::id())
            ->paginate(12);

        return Inertia::render('Decks/Index', [
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
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $request->user()->decks()->create($validated);

        return redirect(route('decks.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Deck $deck)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Deck $deck)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Deck $deck)
    {
        Gate::authorize('update', $deck);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $deck->update($validated);

        return redirect(route('decks.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Deck $deck):RedirectResponse
    {
        //
        Gate::authorize('delete', $deck);

        $deck->delete();

        return redirect(route('decks.index'));
    }
}
