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
        Schema::create('hours', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->time('start_time');
            $table->time('end_time');
            $table->unsignedBigInteger('day_id');
            $table->unsignedBigInteger('doctor_id');
            $table->boolean('is_available')->default(true);
            $table->foreign('day_id')->references('id')->on('days')->delete('cascade');
            $table->foreign('doctor_id')->references('id')->on('doctors')->delete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hours');
    }
};
