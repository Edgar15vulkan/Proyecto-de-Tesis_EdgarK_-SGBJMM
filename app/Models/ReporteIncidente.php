<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ReporteIncidente extends Model
{
    //
    use HasFactory;

    protected $table = 'reporte_incidentes'; // nombre de la tabla

    protected $primaryKey = 'id'; // PK 

    protected $fillable = [
        'titulo',
        'personal_id',
        'fecha',
        'grupo',
        'descripcion',
        'archivo',
    ];

    /** Relación con el autor (datos_personales).*/
    public function autor()
    {
        return $this->belongsTo(Personal::class, 'personal_id', 'personal_id');
    }
}
