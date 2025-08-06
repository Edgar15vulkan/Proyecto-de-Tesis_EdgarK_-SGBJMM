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
        //
        schema::table('documentos_personal', function (Blueprint $table) {
            // Hacer los campos de documentos personales nullable
            $table->string('tipo_documento')->nullable()->change();
            $table->string('nombre_documento')->nullable()->change();
            $table->string('ruta_documento')->nullable()->change();
            $table->date('fecha_entrega')->nullable()->change();
            $table->boolean('entregado')->default(false)->change(); // Asegurar que el campo booleano tenga un valor por defecto
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::table('documentos_personal', function (Blueprint $table) {
            // Revertir los cambios realizados en la migración up
            $table->string('tipo_documento')->nullable(false)->change();
            $table->string('nombre_documento')->nullable(false)->change();
            $table->string('ruta_documento')->nullable(false)->change();
            $table->date('fecha_entrega')->nullable(false)->change();
            $table->boolean('entregado')->default(false)->change(); // Asegurar que el campo booleano tenga un valor por defecto
        });
    }
};
