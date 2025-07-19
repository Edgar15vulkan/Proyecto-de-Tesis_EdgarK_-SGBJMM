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
        Schema::create('datos_contacto', function (Blueprint $table) {
            $table->id();
            $table->string('correo_electronico', 100)->unique(); // Correo electrónico
            $table->string('telefono', 15)->nullable(); // Teléfono de contacto
            $table->string('ciudad', 100)->nullable(); // Ciudad de residencia
            $table->string('colonia', 100)->nullable(); // Colonia de residencia
            $table->string('calle', 100)->nullable(); // Calle de residencia
            $table->string('nombre_contacto_emergencia', 100)->nullable(); // Nombre de contacto en caso de emergencia
            $table->string('parentesco_contacto_emergencia', 50)->nullable(); // Parentesco del contacto de emergencia
            $table->string('celular_contacto_emergencia', 15)->nullable(); // Celular de contacto en caso de emergencia
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('datos_contacto');
    }
};
