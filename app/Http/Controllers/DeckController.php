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
    public function index(Request $request)
    {
        $decks = Deck::query()->where('user_id', Auth::id())->paginate(24);

        // Read the paired_commanders.json file
        $filePath = base_path('database/seeders/paired_commanders.json');
        $pairedCommanders = file_exists($filePath) ? json_decode(file_get_contents($filePath), true) : [];

        if ($request->wantsJson()) {
            return response()->json([
                'decks' => $decks,
                'pairedCommanders' => $pairedCommanders,
            ]);
        }
        // Check if there is an updatedDeck in the session
        $updatedDeck = session('updatedDeck'); // Ensure updatedDeck is retrieved correctly

        return Inertia::render('Decks/Index', [
            'decks' => $decks,
            'updatedDeck' => $updatedDeck, // Pass the updatedDeck as a prop
            'pairedCommanders' => $pairedCommanders, // Pass pairedCommanders as a prop
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
            'cards' => 'array', // Require cards to be a non-empty array
            'commanders' => 'required|array|min:1|max:3', // Require commanders to be a non-empty array
        ]);

        // Create a new deck with the validated data
        Deck::create([
            'name' => $validated['name'],
            'user_id' => $validated['user_id'],
            'cards' => $validated['cards'], // Include cards in the creation
            'commanders' => $validated['commanders'],
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
            'cards' => 'array',
            'commanders' => 'required|array|min:1|max:3',
        ]);

        $deck = Deck::create([
            'name' => $validated['name'],
            'user_id' => $validated['user_id'],
            'cards' => $validated['cards'],
            'commanders' => $validated['commanders'],
        ]);

        // Redirect to the decks.index route with the updatedDeck in the session
        return redirect()
            ->route('decks.index')
            ->with([
                'success' => 'Deck updated successfully!',
                'updatedDeck' => $deck, // Store the updated deck in the session
            ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Deck $deck)
    {
        return Inertia::render('Decks/Show', [
            'deck' => $deck,
        ]);
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
            'cards' => 'array',
            'commanders' => 'required|array|min:1|max:3',
        ]);

        $deck->update($validated);

        // Redirect to the decks.index route with the updatedDeck in the session
        return redirect()
            ->route('decks.index')
            ->with([
                'success' => 'Deck updated successfully!',
                'updatedDeck' => $deck, // Store the updated deck in the session
            ]);
    }

    public function updateDecks(Request $request)
    {
        $request->validate([
            'decks' => 'required|array',
            'decks.*.id' => 'required|exists:decks,id',
            'decks.*.name' => 'required|string|max:255',
            'decks.*.cards' => 'array',
            'decks.*.commanders' => 'required|array|min:1|max:3',
        ]);

        DB::beginTransaction();

        try {
            foreach ($request->decks as $deckData) {
                $deck = Deck::findOrFail($deckData['id']);

                if (!$deck) {
                    continue;
                }

                Gate::authorize('update', $deck);

                $deck->update([
                    'name' => $deckData['name'],
                    'cards' => $deckData['cards'],
                    'commanders' => $deckData['commanders'],
                ]);
            }

            DB::commit();

            if ($request->wantsJson()) {
                return response()->json([
                    'message' => 'Decks updated successfully',
                ]);
            }

            return redirect()
                ->back()
                ->with([
                    'success' => 'Decks updated successfully!',
                ]);
        } catch (\Exception $e) {
            // Rollback the transaction on error
            DB::rollBack();

            if ($request->wantsJson()) {
                return response()->json(
                    ['error' => 'Failed to update decks: ' . $e->getMessage()],
                    422
                );
            }

            return redirect()
                ->back()
                ->withErrors([
                    'error' => 'Failed to update decks: ' . $e->getMessage(),
                ]);
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
