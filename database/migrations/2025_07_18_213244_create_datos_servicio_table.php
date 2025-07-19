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
        Schema::create('datos_servicio', function (Blueprint $table) {
            $table->id();
            //persoana_id FK
            $table->date('fecha_ingreso'); // Fecha de ingreso al servicio
            //grupo_id FK
            $table->string('cargo', 100); // Cargo desempeñado
            $table->string('rol', 100); // Rol desempeñado
            $table->boolean('voluntario')->default(false); // Indica si es voluntario
            $table->enum('estado', [
                'Activo', 
                'Inactivo', 
                'Retirado', 
                'Suspendido',
                'Fallecido',
                'Comision'
                ])->default('Activo'); // Estado de la persona (Activo, Inactivo)
            $table->string('zona_adscripcion', 100)->nullable(); // Zona de adscripción
            $table->string ('observaciones', 255)->nullable(); // Observaciones

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('datos_servicio');
    }
};
