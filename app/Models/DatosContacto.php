<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DatosContacto extends Model
{
    //
    protected $table = 'datos_contacto'; // Nombre de la tabla en la base de datos
    protected $primaryKey = 'id'; // Clave primaria de la tabla
    protected $fillable = [ // Campos que se pueden llenar masivamente
        //'persona_id',  Relación con el modelo Persona
        'correo_electronico',
        'telefono',
        'ciudad',
        'colonia',
        'calle',
        'nombre_contacto_emergencia',
        'parentesco_contacto_emergencia',
        'celular_contacto_emergencia'
    ];

}
