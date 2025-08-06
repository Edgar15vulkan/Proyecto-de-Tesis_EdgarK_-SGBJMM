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
            //
            $table->unsignedBigInteger('personal_id')->after('id'); // Agregar la columna personal_id
            $table->foreign('personal_id')->references('personal_id')->on('datos_personales')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('documentos_personal', function (Blueprint $table) {
            //
            $table->dropForeign(['personal_id']); // Eliminar la clave foránea
        });
    }
};
