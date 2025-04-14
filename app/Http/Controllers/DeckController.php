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
    public function index(Request $request)
    {
        $decks = Deck::query()
            ->where('user_id', Auth::id())
            ->paginate(24);

        if ($request->wantsJson()) {
            return response()->json(['decks' => $decks]);
        }

        return Inertia::render('Decks/Index', [
            'decks' => $decks,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        // Validate the request data
        $validated = $request->validate([
            'name' => 'required|string|max:255', // Validate the name field
            'user_id' => 'required|integer|exists:users,id', // Validate the user_id field
            'cards' => 'required|array|min:1', // Require cards to be a non-empty array
        ]);

        // Create a new deck with the validated data
        Deck::create([
            'name' => $validated['name'],
            'user_id' => $validated['user_id'],
            'cards' => $validated['cards'], // Include cards in the creation
        ]);

        // Redirect to the decks index page
        return redirect(route('decks.index'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'user_id' => 'required|integer|exists:users,id',
            'cards' => 'required|array|min:1',
        ]);

        $deck = Deck::create([
            'name' => $validated['name'],
            'user_id' => $validated['user_id'],
            'cards' => $validated['cards'],
        ]);

        // Check if the request expects an Inertia response
        if ($request->wantsJson()) {
            return response()->json(['deck' => $deck]); // Return JSON for API requests
        }

        return redirect()->route('decks.index')->with('success', 'Deck created successfully!');
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
            'cards' => 'required|array|min:0'
        ]);

        $deck->update($validated);

        return redirect(route('decks.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Deck $deck): RedirectResponse
    {
        Gate::authorize('delete', $deck); // Authorize the delete action

        $deck->delete(); // Delete the deck

        return redirect(route('decks.index'));
    }
}
