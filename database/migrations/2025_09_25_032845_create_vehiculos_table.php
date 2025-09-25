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
        Schema::create('vehiculos', function (Blueprint $table) {
            $table->bigIncrements('id'); // ID principal

            $table->string('numero_economico', 100);  // ejm. Unidad 07, A-01, M-01
            $table->string('tipo_vehiculo', 150);
            $table->string('marca', 100);
            $table->string('modelo', 100);
            $table->string('placas', 20)->unique();
            $table->string('estado_vehiculo', 150);
            $table->year('anio'); //año de fabricación
            $table->date('fecha_adquisicion');
            $table->unsignedBigInteger('km_inicial');

            $table->unsignedBigInteger('personal_id'); // Relación con personal
            $table->timestamps();

            // Llave foránea
            $table->foreign('personal_id')->references('personal_id')->on('datos_personales')->onDelete('cascade');
            

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehiculos');
    }
};
