<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LicenciaConducir extends Model
{
    //
    protected $table = 'licencias_conducir'; // Define el nombre de la tabla
    protected $primaryKey = 'id'; // Define la clave primaria

    protected $fillable = [ // Campos que se pueden llenar masivamente
        'personal_id',  // Clave foránea que relaciona con el modelo Personal
        'licencia_conducir',
        'tipo',
        'licencia_numero',
        'fecha_expedicion',
        'fecha_vencimiento',
        
        
    ];

    protected $casts = [
    'licencia_conducir' => 'boolean',
];

    // Relación con el modelo Personal
    public function personal()
    {
        return $this->belongsTo(Personal::class, 'personal_id');
    }
}
