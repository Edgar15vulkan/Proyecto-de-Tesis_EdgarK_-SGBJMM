<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Personal; // Importar el modelo Personal
use App\Utils\TextHelper;

class DatosContacto extends Model
{
    //
    protected $table = 'datos_contacto'; // Nombre de la tabla en la base de datos
    protected $primaryKey = 'id'; // Clave primaria de la tabla
    protected $fillable = [ // Campos que se pueden llenar masivamente
        //'persona_id',  Relación con el modelo Persona
        'personal_id', // Clave foránea a la tabla de datos personales
        'correo_electronico',
        'telefono',
        'ciudad',
        'colonia',
        'calle',
        'nombre_contacto_emergencia',
        'parentesco_contacto_emergencia',
        'celular_contacto_emergencia'
    ];

    //----------------------- RELACIONES --------------------------
    public function personal()
    {
        return $this->belongsTo (Personal::class, 'personal_id' , 'personal_id'); // Relación inversa con Personal
    }

    //----------------------- MUTATORS ----------------------------
    public function setNombreContactoEmergenciaAttribute($value)
    {
        $this->attributes['nombre_contacto_emergencia'] = TextHelper::toUpper($value);
    }
}
