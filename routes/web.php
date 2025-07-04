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
        'unisleevrVersion' => '0.1.0',
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/founders', function () {
    return Inertia::render('Founders');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name(
        'profile.edit'
    );
    Route::patch('/profile', [ProfileController::class, 'update'])->name(
        'profile.update'
    );
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name(
        'profile.destroy'
    );
});

Route::resource('cards', CardController::class)
    ->only(['index', 'store'])
    ->middleware(['auth', 'verified']);

Route::resource('decks', DeckController::class)
    ->only(['index', 'store', 'update', 'destroy', 'show'])
    ->middleware(['auth', 'verified']);

Route::put('decks-batch', [DeckController::class, 'updateDecks'])
    ->name('decks.update-batch')
    ->middleware(['auth', 'verified']);

require __DIR__ . '/auth.php';
