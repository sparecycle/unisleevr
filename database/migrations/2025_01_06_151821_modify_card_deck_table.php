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
        Schema::table('card_deck', function (Blueprint $table) {
            $table->dropForeign(['card_id']); // Drop the existing foreign key
            $table->dropColumn('card_id'); // Drop the existing column
            $table->foreignUuid('card_id')->constrained()->onDelete('cascade'); // Add as UUID
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
