<?php

namespace App\Http\Controllers;

use App\Models\Personal; // Importar el modelo Personal
use Illuminate\Http\Request; //Request para validar formulario
use Inertia\Inertia;
use Inertia\Response;

class PersonalController extends Controller //Se crea el controlador de personal
{
    
    //Muestrar una tabla con los registros de personal
    public function Index(Request $request)  //Recibe un objeto Request para manejar los datos de la solicitud
    {   
        $query = Personal :: with(['servicios', 'contactos', 'licencias','documentos']); // Creamos una consulta base para el modelo Personal
 
        //si hay un parametro buscar, busca el personal por id
        if ($request ->has('search') && is_numeric($request ->search)) {
            $query->where('personal_id', $request->search);
        } 
 
        $personal = $query -> paginate(5)->withQueryString(); //Mandamos a la vista que se paginen 5 o mas registros por pagina y que mantenga la cadena de consulta para el paginador
        //retornar la vista de personal con los registros obtenidos
        return Inertia::render('Personal/personalVista', [    //referencia de la vista
            'personal' => $personal
        ]); //renderiza la ubicación y vista de personal *no tocar*
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

            //datos de contacto
            'correo_electronico' => 'required|email|max:255',
            'telefono' => 'nullable|string|max:15',
            'ciudad' => 'nullable|string|max:100',
            'colonia' => 'nullable|string|max:100',
            'calle' => 'nullable|string|max:100',
            'nombre_contacto_emergencia' => 'nullable|string|max:100',
            'parentesco_contacto_emergencia' => 'nullable|string|max:50',
            'celular_contacto_emergencia' => 'nullable|string|max:15',

            // Datos de licencia de conducir
            'licencia_conducir' => 'required|boolean',
            'tipo' => 'nullable|in:Tipo A,Tipo B,Tipo C,Tipo D, Tipo E',
            'licencia_ numero' => 'nullable|string|max:50',
            'fecha_expedicion' => 'nullable|date',
            'fecha_vencimiento' => 'nullable|date|after_or_equal:fecha_expedicion',
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
        $persona->servicios()->create([
            'fecha_ingreso' => $request->fecha_ingreso,
            'cargo' => $request->cargo,
            'rol' => $request->rol,
            'voluntario' => $request->voluntario ?? false, // Asignar valor por defecto si no se proporciona
            'estado' => $request->estado,
            'zona_adscripcion' => $request->zona_adscripcion,
            'observaciones' => $request->observaciones,
        ]);
        //creación de los datos de contacto asociados a la persona
        $persona->contactos()->create([
            //campos
            'correo_electronico' => $request->correo_electronico,
            'telefono' => $request->telefono,
            'ciudad' => $request->ciudad,
            'colonia' => $request->colonia,
            'calle' => $request->calle,
            'nombre_contacto_emergencia' => $request->nombre_contacto_emergencia,
            'parentesco_contacto_emergencia' => $request->parentesco_contacto_emergencia, 
            'celular_contacto_emergencia' => $request->celular_contacto_emergencia, 
        ]);
        
        //creación de los datos de licencia de conducir asociados a la persona
        $persona->licencias()->create([
            //campos
            'licencia_conducir' => $request->licencia_conducir,
            'tipo' => $request->tipo,
            'licencia_numero' => $request->licencia_numero,
            'fecha_expedicion' => $request->fecha_expedicion,
            'fecha_vencimiento' => $request->fecha_vencimiento,
        ]);


        //redireccionar a la vista de personal con mensaje de exito
        return redirect()->route('personal.index')->with('success', 'Personal creado exitosamente.');
    }
    //Eliminar un registro de personal
    public function destroy($personal_id)
        {
            $persona = Personal::findOrFail($personal_id);
            $persona->delete();

        return redirect()->route('personal.index')->with('success', 'Personal eliminado correctamente.');
    }

}
