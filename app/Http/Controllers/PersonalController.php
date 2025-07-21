<?php

namespace App\Http\Controllers;

use App\Models\Personal; // Importar el modelo Personal
use App\Models\DatosServicio; // Importar el modelo DatosServicio
use Illuminate\Http\Request; //Request para validar formulario
use Inertia\Inertia;
use Inertia\Response;

class PersonalController extends Controller //Se crea el controlador de personal
{
    
    //Muestra la lista de servicios
    public function Index(Request $request)
    {   
        $query = Personal :: query();
 
        //si hay un parametro buscar, busca el personal por id
        if ($request ->has('search') && is_numeric($request ->search)) {
            $query->where('id', $request->search);
        } 
 
        $personal = $query -> paginate(5)->withQueryString(); //Mandamos a la vista que se paginen 5 o mas registros por pagina y que mantenga la cadena de consulta para el paginador
        //retornar la vista de ventas con los registros obtenidos
        return Inertia::render('Personal/personalVista', [    //referencia de la vista
            'personal' => $personal
        ]); //renderiza la ubicación y vista de ventas *no tocar*
    }
    //Create para la creacion de registros con formulario
    public function create(): Response
    {
        //retornar la vista de crear venta
        return Inertia::render('Personal/componentes/CreatePage'); //renderiza la ubicación y vista del formulario de nuevo cliente
    }

    //Guarda una nueva persona en la base de datos
    public function store(Request $request)
    {
        //validación de datos de formulario
       $validated = $request->validate([
            //datos personales
            'nombre' => 'required|string|max:255',
            'apellido_paterno' => 'required|string|max:255',
            'apellido_materno' => 'nullable|string|max:255',
            'sexo' => 'required|in:Masculino,Femenino,Otro',
            'CURP' => 'required|string|max:18|unique:datos_personales,CURP', //validación de CURP, debe ser único
            'fecha_nacimiento' => 'required|date',
            'lugar_nacimiento' => 'required|string|max:100',
           
            //datos de servicio
            'fecha_ingreso' => 'required|date',
            'cargo' => 'nullable|string|max:100',
            'rol' => 'nullable|string|max:100',
            'estado' => 'required|in:Activo,Inactivo,Retirado,Suspendido,Fallecido,Comision',
            'voluntario' => 'nullable|boolean',
            'zona_adscripcion' => 'nullable|string|max:100',
            'observaciones' => 'nullable|string|max:255',

        ]);
        //creación de los datos personales asociados a la persona
        $persona = Personal::create([
            'nombre' => $request->nombre,
            'apellido_paterno' => $request->apellido_paterno,
            'apellido_materno' => $request->apellido_materno,
            'sexo' => $request->sexo,
            'CURP' => $request->CURP,
            'fecha_nacimiento' => $request->fecha_nacimiento,
            'lugar_nacimiento' => $request->lugar_nacimiento,
          
        ]);
        //creación de los datos de servicio asociados a la persona
        $persona->servicio()->create([
            'fecha_ingreso' => $request->fecha_ingreso,
            'cargo' => $request->cargo,
            'rol' => $request->rol,
            'voluntario' => $request->voluntario ?? false, // Asignar valor por defecto si no se proporciona
            'estado' => $request->estado,
            'zona_adscripcion' => $request->zona_adscripcion,
            'observaciones' => $request->observaciones,

        ]);
        //redireccionar a la vista de ventas con mensaje de exito
        return redirect()->route('personal.index')->with('success', 'Personal creado exitosamente.');
    }
    //Eliminar un registro de cliente
    public function destroy($id)
        {
            $persona = Personal::findOrFail($id);
            $persona->delete();

        return redirect()->route('personal.index')->with('success', 'Personal eliminado correctamente.');
    }

}
