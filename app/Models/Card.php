<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    use HasFactory;

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
}