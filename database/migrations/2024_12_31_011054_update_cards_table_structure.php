<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('cards', function (Blueprint $table) {
            // Drop old columns that are no longer needed
            $table->dropColumn([
                'highres_image',
                'image_status',
                'foil',
                'nonfoil',
                'finishes',
                'set',
                'set_name',
                'collector_number',
            ]);

            // Add new columns based on the new data structure
            $table->string('type_line')->nullable();
            $table->text('oracle_text')->nullable();
            $table->json('color_identity')->nullable(); // Store color identity as JSON
            $table->string('mana_cost')->nullable();
            $table->string('power')->nullable();
            $table->string('toughness')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('cards', function (Blueprint $table) {
            // Add back the columns that were removed
            $table->boolean('highres_image')->nullable();
            $table->string('image_status')->nullable();
            $table->boolean('foil')->nullable();
            $table->boolean('nonfoil')->nullable();
            $table->json('finishes')->nullable();
            $table->string('set')->nullable();
            $table->string('set_name')->nullable();
            $table->string('collector_number')->nullable();

            // Drop the new columns
            $table->dropColumn([
                'type_line',
                'oracle_text',
                'color_identity',
                'mana_cost',
                'power',
                'toughness',
            ]);
        });
    }
};

