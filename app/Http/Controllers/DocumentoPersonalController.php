<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
//Importar modelos
use App\Models\DocumentoPersonal;
use App\Models\Personal;
use App\Http\Controllers\Auth;
use App\Models\User;
use Illuminate\Auth\Events\Validated;

class DocumentoPersonalController extends Controller
{
    //Metódo Index para mostrar los documentos personales
    public function index(Request $request)
    {   
        $query = Personal:: with (['documentos']); //crear consulta del modelo Personal con documentos
        $documentos = DocumentoPersonal::all();
        $personal = $query-> paginate(5)->withQueryString(); 
        return Inertia::render('Documentos/Index', 
        [            
            'documentos' => DocumentoPersonal::all(),
            'personal' => $personal

        ]);
    }
    //crear un nuevo documento
    public function create(): Response
    {
        return Inertia::render('Documentos/componentes/FormNuevoDocumento');//renderiza la ubicación del formulario
             //cargar todos los registros de personal
    }


    //guardar nuevo documento del formulario
    public function store(Request $request) //
    {
        $validated = $request->validate([
            //validar datos del formulario
            'personal_id' => 'required|exists:datos_personales,id',
            'tipo_documento' => 'required|string|max:255',
            'nombre_documento' => 'required|string|max:255',
            'archivo' => 'required|file|mimes:pdf,doc,docx,jpg,jpeg,png|max:2048',
            'entregado' => 'required|boolean',
            'fecha_entrega' => 'required|date',
            'personal_id' => 'required|exists:datos_personales,id', //FK personal 
        
        ]);
        //creación de los datos del documento asociado a la persona
        $ruta = $request ->file('archivo')->store('documentos/personal', 'public');


        //crear el documento usando la relación con personal
        DocumentoPersonal::create([

            'personal_id' => $validated['personal_id'],
            'tipo_documento' => $validated['tipo_documento'], 
            'nombre_documento' =>$validated['nombre_documento'],
            'ruta_documento' => $ruta,
            'entregado' => $validated['entregado'],
            'fecha_entrega' => $validated['fecha_entrega'],
           
        ]);
        //redireccionar a la vista de documentos detalle con mensaje de exito
        return redirect()->route('documentos-personal.index')->with('success', 'Documento creado exitosamente.');

    }

    //función de mostrar los documentos de una sola persona
    public function show($personal_id)
    {
        $personal = Personal::findOrFail($personal_id); //busca el personal por id
        $documentos = DocumentoPersonal::where('personal_id', $personal_id)->get();

        return Inertia('Documentos/componentes/Detalle', [
            'personal' => $personal,
            'documentos' => $documentos
        ]);                             
    }

    //Gestionar documento
    public function gestionar($id)
    {
        $documentos = DocumentoPersonal::where('personal_id', $id)->get();
        
        return Inertia::render('Documentos/Index', [
            'documentos' => $documentos,
            'personal_id' => $id
        ]);
    }
    //Descargar documento
    public function descargar($id)
    {
        $documento = DocumentoPersonal::findOrFail($id);

        if (!Storage::disk('public')->exists($documento->archivo)){
            abort(404, 'archivo no encontrado.');
        }
        $ruta = Storage::disk('public')->path($documento->archivo);
        return response()->download($ruta);
    }
    //Eliminar documento
    public function destroy($id)
    {
        $documento = DocumentoPersonal::findOrFail($id);

        if (Storage::exists($documento->archivo)) {
            Storage::delete ($documento->archivo);
        }

        $documento->delete();

        return back()->with('success', 'Documento eliminado');
    }
}
