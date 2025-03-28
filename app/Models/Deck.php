<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory; // Import HasFactory
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\Card;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Deck extends Model
{
    use HasFactory; // Enable factory support

    protected $fillable = [
        'name',
        'cards',
        'user_id' // Add user_id to fillable properties
    ];

    protected $casts = [
        'cards' => 'array', // Cast cards to an array
    ];

    // define the many to many relationship with the Card model, also the method
    /*public function cards(): BelongsToMany*/
    /*{*/
    /*    return $this->belongsToMany(Card::class);*/
    /*}*/
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

}


