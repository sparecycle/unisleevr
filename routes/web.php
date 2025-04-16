<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CardController;
use App\Http\Controllers\DeckController;

use App\Models\Card;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {

    $userId = Auth::id();

    list($allCards, $decks) = getCardPoolAndDecksFromUserID($userId);

    // Ensure $allCards and $decks are arrays before slicing
    $decks = $decks->toArray();

    $allCards = array_slice($allCards, 0, 5);
    $decks = array_slice($decks, 0, 4);

    return Inertia::render('Dashboard', [
        'cards' => $allCards,
        'decks' => $decks
    ]);

})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/founders', function() {
    return Inertia::render('Founders');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('cards', CardController::class)
    ->only(['index', 'store'])
    ->middleware(['auth', 'verified']);

Route::resource('decks', DeckController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

Route::put('decks-batch', [DeckController::class, 'updateDecks'])
    ->name('decks.update-batch')
    ->middleware(['auth', 'verified']);

require __DIR__.'/auth.php';
