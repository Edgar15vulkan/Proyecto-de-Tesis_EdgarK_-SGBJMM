<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Personal; // Importar el modelo Personal

class DatosServicio extends Model
{
    //
    protected $table = 'datos_servicio'; // Define el nombre de la tabla
    protected $primaryKey = 'id'; // Define la clave primaria
    protected $fillable = [   // Define los campos que se pueden llenar masivamente
        'personal_id', // Clave foránea a la tabla de datos personales
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

public function personal()
{
    return $this->belongsTo(Personal::class, 'personal_id'); // Relación inversa con Personal
}

}
