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
        Schema::table('documentos_personal', function (Blueprint $table) {
            //renombrar la columna ruta_documento a archivo
            $table->renameColumn('ruta_documento', 'archivo');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('documentos_personal', function (Blueprint $table) {
            //
            $table->renameColumn('archivo', 'ruta_documento');
        });
    }
};
