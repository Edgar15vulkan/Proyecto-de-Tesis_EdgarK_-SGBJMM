<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Personal;
use App\Utils\TextHelper;


class Vehiculo extends Model
{
    //
    protected $table = 'vehiculos'; // Define el nombre de la tabla
    protected $primaryKey = 'id'; // Define la clave primaria
    public $incrementing = true; // La clave primaria es autoincremental
    protected $keyType = 'int'; // de tipo entero

    protected $fillable = [  // Define los campos que se pueden llenar masivamente
        
        'numero_economico',
        'tipo_vehiculo',
        'marca',
        'modelo',
        'placas',
        'estado_vehiculo',
        'anio',
        'fecha_adquisicion',
        'km_inicial',
    ];
    //---------------------- RELACIONES CON OTROS MODELOS ---------------------
   
}
