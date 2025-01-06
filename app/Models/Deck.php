<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
// use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\Card;

class Deck extends Model
{
    protected $fillable = [
        'name',
        'cards'
    ];

    // Get the cards for this deck.
    // public function cards(): HasMany
    // {
    //     return $this->hasMany(Card::class);
    // }


    public function cards(): BelongsToMany
    {
        return $this->belongsToMany(Card::class);
    }

    //Temp
    // protected $casts = [
    //     'cards' => 'array'
    // ];
}
