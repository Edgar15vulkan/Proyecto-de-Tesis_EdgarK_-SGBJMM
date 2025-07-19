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
        Schema::create('licencias_conducir', function (Blueprint $table) {
            $table->id();
            // persona_id FK
            $table->boolean('licencia_conducir')->default(false); // Indica si la persona tiene licencia de conducir
            $table->enum('tipo', [
                'Tipo A', // vehículos particulares
                'Tipo B', // vehículos de transporte público taxis y carga
                'Tipo C', // microbuses y autobuses
                'Tipo D', //carga pesada 
                'Tipo E', //vehiculos de emergencia y escolares
            ])->nullable(); // Tipo de licencia 
            $table->string('licencia_numero')->nullable(); // Número de licencia de conducir
            $table->date('fecha_expedicion')->nullable(); // Fecha de expedición de la licencia
            $table->date('fecha_vencimiento')->nullable(); // Fecha de vencimiento de la licencia
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('licencias_conducir');
    }
};
