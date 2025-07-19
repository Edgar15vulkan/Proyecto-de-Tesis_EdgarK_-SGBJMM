<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DatosServicio extends Model
{
    //
    protected $table = 'datos_servicio'; // Define el nombre de la tabla
    protected $primaryKey = 'id'; // Define la clave primaria
    protected $fillable = [   // Define los campos que se pueden llenar masivamente
        //persona_id fk
        'fecha_ingreso',
        'cargo',
        'rol',
        'estado',
        'zona_adscripcion',
        'observaciones'
    ];
    
    protected $casts = [    // Define los tipos de datos para los campos
    'voluntario' => 'boolean',    // Campo booleano
];


}
