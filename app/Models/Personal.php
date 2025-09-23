<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\DatosServicio; // Importar el modelo DatosServicio
use App\Models\DatosContacto; // Importar el modelo DatosContacto
use App\Models\LicenciaConducir; // Importar el modelo LicenciaConducir
use App\Models\DocumentoPersonal; // Importar el modelo DocumentoPersonal
use App\Utils\TextHelper; // Importar elk helper de texto

class Personal extends Model
{
    //
    protected $table = 'datos_personales'; // Define el nombre de la tabla
    protected $primaryKey = 'personal_id'; // Define la clave primaria
    public $incrementing = true; // La clave primaria es autoincremental
    protected $keyType = 'int'; // de tipo entero

    protected $fillable = [  // Define los campos que se pueden llenar masivamente
        'nombre',
        'apellido_paterno',
        'apellido_materno',
        'sexo',
        'CURP',
        'fecha_nacimiento',
        'lugar_nacimiento'
    ];
    //---------------------- RELACIONES CON OTROS MODELOS ---------------------
    // Relación uno a uno con DatosServicio
    public function servicios()
    {
        return $this->hasOne(DatosServicio::class, 'personal_id', 'personal_id'); // Relación uno a uno con DatosServicio                                                                      
    }
    // Relación uno a uno con DatosContacto
    public function contactos()
    {
        return $this->hasOne (DatosContacto::class, 'personal_id', 'personal_id'); // Relación uno a uno con DatosContacto
    }
    // Relación uno a muchos con LicenciaConducir
    public function licencias()
    {
        return $this->hasOne(LicenciaConducir::class, 'personal_id');
    }
    // Relación uno a muchos con DocumentosPersonal
    public function documentos()
    {
        return $this->hasMany(DocumentoPersonal::class, 'personal_id'); // Relación uno a muchos con DocumentosPersonal
    }
    // Relación uno a muchos con ReporteIncidente
    public function reportesIncidentes()
    {
        return $this->hasMany(ReporteIncidente::class, 'personal_id', 'personal_id');
    }
    //----------------------  FIN RELACIONES ---------------------

    //----------------------- MUTATORS ------------------------------
    public function setNombreAttribute($value)
    {
        $this->attributes['nombre'] = TextHelper::toUpper($value);
    }

    public function setApellidoPaternoAttribute($value)
    {
        $this->attributes['apellido_paterno'] = TextHelper::toUpper($value);
    }

    public function setApellidoMaternoAttribute($value)
    {
        $this->attributes['apellido_materno'] = TextHelper::toUpper($value);
    }
    //-----------------------------------------------------------------------
}
