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
        Schema::table('licencias_conducir', function (Blueprint $table) {
            //
            $table->unsignedBigInteger('personal_id')->after('id');
            //establecer la llave foranea
            $table->foreign('personal_id')
                ->references('personal_id') //clave primaria de la tabla datos_personales
                ->on('datos_personales')  // tabla a la que se hace referencia
                ->onDelete('cascade'); //eliminar en cascada si se elimina el registro relacionado
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('licencias_conducir', function (Blueprint $table) {
            
            $table->dropForeign(['personal_id']); //primero elimina la relación
            $table->dropColumn('personal_id');    //después elimina la columna

        });
    }
};
