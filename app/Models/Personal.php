<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\DatosServicio; // Importar el modelo DatosServicio

class Personal extends Model
{
    //
    protected $table = 'datos_personales'; // Define el nombre de la tabla
    protected $primaryKey = 'personal_id'; // Define la clave primaria

    protected $fillable = [  // Define los campos que se pueden llenar masivamente
        'nombre',
        'apellido_paterno',
        'apellido_materno',
        'sexo',
        'CURP',
        'fecha_nacimiento',
        'lugar_nacimiento'
    ];

    public function servicio()
    {
        return $this->hasOne(DatosServicio::class, 'personal_id'); // Relación uno a uno con DatosServicio                                                                      
    }
}
