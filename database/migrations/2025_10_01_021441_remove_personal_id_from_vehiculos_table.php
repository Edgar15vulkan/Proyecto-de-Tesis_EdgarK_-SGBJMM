<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Eliminar personal_id de la tabla vehiculos
     */
    public function up(): void
    {
        Schema::table('vehiculos', function (Blueprint $table) {
              // Primero hay que soltar la llave foránea antes de eliminar la columna
        $table->dropForeign(['personal_id']);
        $table->dropColumn('personal_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('vehiculos', function (Blueprint $table) {
            //
            $table->unsignedBigInteger('personal_id');
            $table->foreign('personal_id')
                ->references('personal_id')
                ->on('datos_personales')
                ->onDelete('cascade');
        });
    }
};
