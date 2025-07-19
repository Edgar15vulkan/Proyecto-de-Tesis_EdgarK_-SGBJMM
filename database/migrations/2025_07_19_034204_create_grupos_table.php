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
        Schema::create('grupos', function (Blueprint $table) {
            $table->id();
            //responsable_id FK
            $table->string('nombre_grupo', 100)->unique(); // Nombre del grupo
            $table->string('descripcion', 255)->nullable(); // Descripción del grupo
            $table->enum('estado', [
                'Activo', 
                'Inactivo', 
                'Suspendido', 
            ])->default('Activo'); // Estado del grupo (Activo, Inactivo, Suspendido
            $table->timestamps();
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('grupos');
    }
};
