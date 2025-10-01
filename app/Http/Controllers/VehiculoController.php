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
        $vehiculos = Vehiculo::paginate(5)->withQueryString(); //Mandamos a la vista que se paginen 5 o mas registros por pagina y que mantenga la cadena de consulta para el paginador
        //retornar la vista de personal con los registros obtenidos
        return Inertia::render('Vehiculos/Index', [    //referencia de la vista
            'vehiculos' => $vehiculos
        ]); //renderiza la ubicación y vista de personal *no tocar*
    }

    //------------- CREATE ----- FORMULARIO PARA NUEVO REPORTE ---------------
    public function create(): Response
    {
        //retornar la vista de crear venta
        return Inertia::render('Vehiculos/componentes/CreatePage'); //renderiza la ubicación y vista del formulario de nuevo cliente
    }
    //------------- STORE ------ GUARDAR NUEVO REPORTE ---------------
    public function store (Request $request){
        // 1 validar los campos
        $request->validate([
            'numero_economico' => 'required|string|max:10',
            'tipo_vehiculo' => 'required|string|max:255',
            'marca' => 'required|string|max:150',
            'modelo' => 'nullable|string|max:150',
            'placas' => 'nullable|string|max:10|unique:vehiculos,placas',
            'estado_vehiculo' => 'required|string|max:150',
            'anio' => 'nullable|string|max:4',
            'fecha_adquisicion' => 'required|date',
            'km_inicial' => 'nullable|string|max:150',
        ]);

        // 2 guardar archivo en storage/app/public/reportes_incidentes
      

        // 3 Crear el registro en la BD
        Vehiculo::create([
            'numero_economico' => $request->numero_economico,
            'tipo_vehiculo' => $request->tipo_vehiculo,
            'marca' => $request->marca,
            'modelo' => $request->modelo,
            'placas' => $request->placas,
            'estado_vehiculo' => $request->estado_vehiculo,
            'anio' =>$request->anio,
            'fecha_adquisicion' => $request->fecha_adquisicion,
            'km_inicial' => $request->km_inicial,
        ]);

        // Redirigir o devolver respuesta
        return back()->with('success', 'Vehiculo de emergencia creado correctamente.');
    }
       
    //------------- SHOW ----- MOSTRAR A DETALLE UN REPORTE ---------------

    //------------- EDIT ----- FORMULARIO PARA EDITAR UN REPORTE ---------------

    //------------- UPDATE ----- ACTUALIZAR UN REPORTE ---------------
   
    //------------- DESTROY ----- ELIMINAR UN REPORTE ---------------

}
