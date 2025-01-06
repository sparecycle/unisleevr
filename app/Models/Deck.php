<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\Card;

class Deck extends Model
{
    protected $fillable = [
        'name',
        'cards'
    ];

    // define the many to many relationship with the Card model, also the method
    public function cards(): BelongsToMany
    {
        return $this->belongsToMany(Card::class);
    }

}


