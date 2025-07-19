<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Grupo extends Model
{
    //
    protected $table = 'grupos'; // Define el nombre de la tabla
    protected $primaryKey = 'id'; // Define la clave primaria

    protected $fillable = [   // Define los campos que se pueden llenar masivamente
        //personal_id FK
        'nombre_grupo',
        'descripcion',
        'estado',
    ];
}
