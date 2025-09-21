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
        Schema::table('datos_contacto', function (Blueprint $table) {
            //
            $table->unsignedBigInteger('personal_id')->after('id'); // o colócala donde prefieras
            $table->foreign('personal_id')->references('personal_id')->on('datos_personales')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('datos_contacto', function (Blueprint $table) {
            //
             $table->dropForeign(['personal_id']);
            $table->dropColumn('personal_id');
        });
    }
};
