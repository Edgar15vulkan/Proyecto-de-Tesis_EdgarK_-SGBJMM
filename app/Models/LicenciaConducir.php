<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LicenciaConducir extends Model
{
    //
    protected $table = 'licencias_conducir'; // Define el nombre de la tabla
    protected $primaryKey = 'id'; // Define la clave primaria

    protected $fillable = [ // Campos que se pueden llenar masivamente
        'licencia_conducir',
        'tipo',
        'licencia_numero',
        'fecha_expedicion',
        'fecha_vencimiento',
        
        //'personal_id'  Relación con el modelo Personal
    ];
}
