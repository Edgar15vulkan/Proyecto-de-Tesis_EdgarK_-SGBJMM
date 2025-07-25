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
        Schema::table('datos_servicio', function (Blueprint $table) {
            //
            $table->string('cargo', 100)->nullable()->change();
            $table->string('rol', 100)->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('datos_servicio', function (Blueprint $table) {
            $table->string('cargo', 100)->nullable(false)->change();
            $table->string('rol', 100)->nullable(false)->change();
        });
    }
};
