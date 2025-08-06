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
        Schema::create('documentos_personal', function (Blueprint $table) {
            $table->engine =  'InnoDB'; // Usar InnoDB para soporte de claves foráneas
            $table->id();
            // Clave foránea a la tabla de empleados
           
            $table->enum('tipo_documento', [
                'Acta de nacimiento',
                'INE',
                'CURP',
                'RFC',
                'Comprobante de domicilio',
                'Certificado de estudios',
                'Carta de antecedentes no penales',
                'Licencia de conducir',
                'Pasaporte',
                'Certificado médico',
                'Otros',
            ]);
            $table->string('nombre_documento');
            $table->string('ruta_documento');
            $table->boolean('entregado')->default(false);
            $table->date('fecha_entrega')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documentos_personal');
    }
};
