<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Personal;
 // Importar el modelo 


class DocumentoPersonal extends Model{
    //
    protected $table = 'documentos_personal'; // Nombre de la tabla en la base de datos
    protected $primaryKey = 'id'; // Clave primaria de la tabla

    protected $fillable = [ // Campos que se pueden llenar masivamente
        'personal_id',  // Clave foránea a la tabla de datos personales
        'tipo_documento',
        'nombre_documento',
        'archivo', //ruta del archivo
        'entregado',
        'fecha_entrega',
    ];
    protected $casts = [
        'entregado' => 'boolean', // Campo booleano para 'entregado'
        'fecha_entrega' => 'date', // Campo de fecha para 'fecha_entrega'
    ];

    public function personal()
    {
        return $this->belongsTo(Personal::class, 'personal_id'); // Relación inversa con Personal
    }

        //  Accessor para devolver la URL pública del archivo
      public function getArchivoUrlAttribute()
    {
        return $this->archivo 
            ? asset('storage/' . $this->archivo) 
            : null;
    }
}