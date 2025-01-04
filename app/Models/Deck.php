<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Card;

class Deck extends Model
{
    protected $fillable = [
        'name',
        'cards'
    ];

    //Temp
    protected $casts = [
        'cards' => 'array'
    ];
}
