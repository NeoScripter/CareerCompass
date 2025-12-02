<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('plans', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->unsignedInteger('duration');
            $table->unsignedInteger('price');
            $table->unsignedInteger('prevPrice')->nullable();
            $table->text('description');
            $table->boolean('taken')->default(false);
            $table->json('perks');
            $table->string('tier');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plans');
    }
};
