<?php

namespace App\Http\Controllers;
//importaciones 
use Illuminate\Http\Request;
use App\Models\Vehiculo; // Importar el modelo de Vehiculo
use Inertia\Inertia;
use Inertia\Response;


class VehiculoController extends Controller
{
    //------------- INDEX ----- LISTAR REPORTES DE INCIDENTES ---------------
    //Muestrar una tabla con los registros de los vehiculos
    public function Index(Request $request)  //Recibe un objeto Request para manejar los datos de la solicitud
    {   
        $query = Vehiculo::with(['vehiculos']); // Creamos una consulta base para el modelo Personal
 
        $vehiculos = $query -> paginate(5)->withQueryString(); //Mandamos a la vista que se paginen 5 o mas registros por pagina y que mantenga la cadena de consulta para el paginador
        //retornar la vista de personal con los registros obtenidos
        return Inertia::render('Vehiculos/Index', [    //referencia de la vista
            'vehiculos' => $vehiculos
        ]); //renderiza la ubicación y vista de personal *no tocar*
    }

    //------------- CREATE ----- FORMULARIO PARA NUEVO REPORTE ---------------

    //------------- STORE ------ GUARDAR NUEVO REPORTE ---------------
 
    
        // 1 validar los campos
   

        // 2 guardar archivo en storage/app/public/reportes_incidentes
      

        // 3 Crear el registro en la BD
   

        // Redirigir o devolver respuesta
       
    

    //------------- SHOW ----- MOSTRAR A DETALLE UN REPORTE ---------------

    //------------- EDIT ----- FORMULARIO PARA EDITAR UN REPORTE ---------------

    //------------- UPDATE ----- ACTUALIZAR UN REPORTE ---------------
   
    //------------- DESTROY ----- ELIMINAR UN REPORTE ---------------

}
