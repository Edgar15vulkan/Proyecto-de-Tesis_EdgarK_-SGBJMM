<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * HACER QUE ANIO/AÑO SEA NULo
     */
    public function up(): void
    {
        Schema::table('vehiculos', function (Blueprint $table) {
            $table->year('anio')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('vehiculos', function (Blueprint $table) {
            $table->year('anio')->nullable(false)->change();
        });
    }
};
