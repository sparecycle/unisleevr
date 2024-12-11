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
        'highres_image',
        'image_status',
        'image_uris',
        'foil',
        'nonfoil',
        'finishes',
        'set',
        'set_name',
        'collector_number',
    ];

    protected $casts = [
        'image_uris' => 'array',
        'finishes' => 'array',
    ];
}