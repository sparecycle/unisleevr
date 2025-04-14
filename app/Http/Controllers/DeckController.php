<?php

namespace App\Http\Controllers;

use App\Models\Deck;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

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
            ->paginate(24);

        return Inertia::render('Decks/Index', [
            'decks' => $decks
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
            'cards' => 'required|array|min:1', // Require cards to be a non-empty array
        ]);

        Deck::create([
            'name' => $validated['name'],
            'user_id' => $validated['user_id'],
            'cards' => $validated['cards'], // Ensure cards is always populated
        ]);

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
            'cards' => 'required|array|min:0'
        ]);

        $deck->update($validated);

        return redirect(route('decks.index'));
    }

    public function updateDecks(Request $request)
    {
        $request->validate([
            'decks' => 'required|array',
            'decks.*.id' => 'required|exists:decks,id',
            'decks.*.name' => 'required|string|max:255',
            'decks.*.cards' => 'required|array|min:0'
        ]);

        DB::beginTransaction();

        try {
            foreach ($request->decks as $deckData) {
                $deck = Deck::findOrFail($deckData['id']);

                // Skip if deck not found in the collection
                if (!$deck) {
                    continue;
                }

                // Authorization check for each deck
                Gate::authorize('update', $deck);

                // Update the deck with its specific data
                $deck->update([
                    'name' => $deckData['name'],
                    'cards' => $deckData['cards']
                ]);
            }

            // Commit the transaction if all updates succeeded
            DB::commit();

            return redirect(route('decks.index'))->with('success', 'Decks updated successfully');
        } catch (\Exception $e) {
            // Rollback the transaction on error
            DB::rollBack();

            return redirect()->back()->withErrors(['error' => 'Failed to update decks: ' . $e->getMessage()]);
        }
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
