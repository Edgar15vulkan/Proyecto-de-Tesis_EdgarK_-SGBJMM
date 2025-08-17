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
            $personales = Personal::all(); // traer todos los registros
            return Inertia::render('Documentos/componentes/CreateDoc', [
                'personales' => $personales,
            ]);
        }



    //guardar nuevo documento del formulario
    public function store(Request $request) //
    {
        // 1️⃣ Validar los campos
        $validated = $request->validate([
            'personal_id' => 'required|exists:datos_personales,personal_id', // ajusta si tu tabla se llama diferente
            'tipo_documento' => 'required|string|max:255',
            'nombre_documento' => 'required|string|max:255',
            'archivo' => 'nullable|file|mimes:pdf,doc,docx,png,jpg,jpeg|max:2048',
            'entregado' => 'boolean',
            'fecha_entrega' => 'nullable|date',
        ]);

        // 2️⃣ Guardar archivo si viene
        $rutaArchivo = null;
        if ($request->hasFile('archivo')) {
            $rutaArchivo = $request->file('archivo')->store('documentos', 'public'); 
            // Se guarda en storage/app/public/documentos
        }

        // 3️⃣ Crear el registro en BD
        $documento = DocumentoPersonal::create([
            'personal_id' => $validated['personal_id'],
            'tipo_documento' => $validated['tipo_documento'],
            'nombre_documento' => $validated['nombre_documento'],
            'ruta_documento' => $rutaArchivo, // guarda la ruta para poder descargarlo luego
            'entregado' => $validated['entregado'] ?? false,
            'fecha_entrega' => $validated['fecha_entrega'] ?? null,
        ]);

        // 4️⃣ Redirigir o devolver respuesta
        return redirect()
            ->back()
            ->with('success', 'Documento cargado correctamente.');
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

        if (!Storage::disk('public')->exists($documento->ruta_documento)) {
            abort(404, 'Archivo no encontrado.');
        }

        $ruta = Storage::disk('public')->path($documento->ruta_documento);
        return response()->download($ruta);
    }

    //Eliminar documento
    public function destroy($id)
    {
        $documento = DocumentoPersonal::findOrFail($id);

        if (Storage::disk('public')->exists($documento->ruta_documento)) {
            Storage::disk('public')->delete($documento->ruta_documento);
        }

        $documento->delete();

        return back()->with('success', 'Documento eliminado');
}
}
