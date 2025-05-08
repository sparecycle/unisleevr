<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    use HasFactory;

    protected $keyType = 'string'; // UUID is a string
    public $incrementing = false; // UUIDs are not auto-incrementing

    protected $fillable = [
        'id',
        'name',
        'scryfall_uri',
        'image_uris',
        'type_line',
        'oracle_text',
        'color_identity',
        'mana_cost',
        'power',
        'toughness',
    ];

    protected $casts = [
        'image_uris' => 'array',
        'color_identity' => 'array',
    ];

    // define the inverse many to many relationship with the Deck model, also the method
    public function decks(): BelongsToMany
    {
        return $this->belongsToMany(Deck::class);
    }
}
