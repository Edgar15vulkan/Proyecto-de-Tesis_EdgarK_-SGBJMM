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
        Schema::create('reporte_incidentes', function (Blueprint $table) {
            $table->id();
            $table->string('titulo', 150)->index(); // Título del reporte
            $table->foreignId('personal_id') //FK
              ->constrained('datos_personales', 'personal_id') // referencia a la tabla datos_personales
              ->onDelete('cascade');

            $table->date('fecha');
            $table->string('grupo', 100)->nullable()->index(); 
            $table->text('descripcion', 255)->nullable();
            $table->string('archivo', 2048)->nullable(); // ruta del archivo PDF/DOC
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reporte_incidentes');
    }
};
