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
        Schema::create('datos_personales', function (Blueprint $table) {
            $table->bigIncrements('personal_id'); // Primary key
            $table->string('nombre', 100); // Nombre(s)
            $table->string('apellido_paterno', 100); // Apellido paterno
            $table->string('apellido_materno', 100); // Apellido materno
            $table->enum('sexo', ['Masculino', 'Femenino', 'Otro']); // Sexo (Masculino, femenino)
            $table->string('CURP', 18)->unique(); // Clave Única de Registro de Población
            $table->date('fecha_nacimiento'); // Fecha de nacimiento
            $table->string('lugar_nacimiento', 100); // Lugar de nacimiento
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('datos_personales');
    }
};
