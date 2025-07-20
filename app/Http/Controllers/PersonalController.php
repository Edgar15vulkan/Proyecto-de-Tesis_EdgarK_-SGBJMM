<?php

namespace App\Http\Controllers;

use App\Models\Personal; // Importar el modelo Personal
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
        return Inertia::render('Personal/componentes/FormNuevoPersonal'); //renderiza la ubicación y vista del formulario de nuevo cliente
    }

    //Guarda una nueva persona en la base de datos
    public function store(Request $request)
    {
        //validación de datos de formulario
       $validated = $request->validate([
            //datos a validar
            'nombre' => 'required|string|max:255',
            'apellido_paterno' => 'required|string|max:255',
            'apellido_materno' => 'nullable|string|max:255',
            'sexo' => 'required|in:Masculino,Femenino,Otro',
            'CURP' => 'required|string|max:18|unique:datos_personales,CURP', //validación de CURP, debe ser único
            'fecha_nacimiento' => 'required|date',
            'lugar_nacimiento' => 'required|string|max:100',
           
            //acompletar los datos faltantes

        ]);
        //creación de la nueva persona en la base de datos
        Personal::create($validated);

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
