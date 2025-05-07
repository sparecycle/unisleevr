<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cards', function (Blueprint $table) {
            $table->uuid('id')->primary(); // Scryfall's card ID
            $table->string('name');
            $table->string('scryfall_uri');
            $table->boolean('highres_image');
            $table->string('image_status');
            $table->json('image_uris'); // Store the image URIs as JSON
            $table->boolean('foil');
            $table->boolean('nonfoil');
            $table->json('finishes'); // Store the finishes as JSON
            $table->string('set'); // Set code
            $table->string('set_name');
            $table->string('collector_number');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cards');
    }
};
