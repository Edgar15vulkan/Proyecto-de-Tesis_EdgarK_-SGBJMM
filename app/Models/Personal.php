<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\DatosServicio; // Importar el modelo DatosServicio
use App\Models\DatosContacto; // Importar el modelo DatosContacto
use App\Models\LicenciaConducir; // Importar el modelo LicenciaConducir

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

    // Relación uno a uno con DatosServicio
    public function servicio()
    {
        return $this->hasOne(DatosServicio::class, 'personal_id'); // Relación uno a uno con DatosServicio                                                                      
    }

    // Relación uno a uno con DatosContacto
    public function contacto()
    {
        return $this->hasOne (DatosContacto::class, 'personal_id', 'personal_id'); // Relación uno a uno con DatosContacto
    }
    // Relación uno a muchos con LicenciaConducir
    public function licencia()
    {
        return $this->hasOne(LicenciaConducir::class, 'personal_id');
    }
}
