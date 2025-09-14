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
            $table->dropColumn('voluntario');
            //eliminar la columna de voluntario - boolean
        });

        Schema::table('licencias_conducir', function (Blueprint $table) {
            $table->dropColumn('licencia_conducir');
            //eliminar la columna de licencia_conducir - boolean
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // agregar columnas en caso de rollback
        Schema::table('datos_servicio', function (Blueprint $table) {
            $table->boolean('voluntario')->default(0);
        });

        Schema::table('licencias_conducir', function (Blueprint $table) {
            $table->boolean('licencia_conducir')->default(0);
        });
    }
};
