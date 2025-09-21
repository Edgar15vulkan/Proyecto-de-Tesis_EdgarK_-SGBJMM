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
        //-------- relación de personal con documentos ---------
        $query = Personal:: with (['documentos', 'servicios', 'contactos', 'licencias']); //crear consulta del modelo Personal con documentos
        $persona = Personal::with('documentos')->first();
        //dd($persona->toArray());

        $documentos = DocumentoPersonal::all();
        // ------paginación ----------- Tabla de documentos por persona tipo resumen
        $personal = $query-> paginate(5)->withQueryString(); 
        //--------catalogo de tipo de documentos-----------
        $tiposDocumentos = [
            'Acta de Nacimiento',
            'INE',
            'CURP',
            'RFC',
            'Comprobante de domicilio',
            'Certificado de estudios',
            'Carta de antecedentes no penales',
            'Licencia de conducir',
            //'Pasaporte',
            'Certificado médico',
            //'Otros',
        ];
        //-------- resumen para cada persona ----------
        $personal->getCollection()->transform(function ($persona) use ($tiposDocumentos) {
            $estadoDocumentos = [];
            foreach ($tiposDocumentos as $tipo) {
                $estadoDocumentos[$tipo] = $persona->documentos
                    ->where('tipo_documento', $tipo)  //verficar con la columna de la tabla 
                    ->isNotEmpty();
            }
            //Agregar al objeto persona una propiedad nueva
            $persona->resumenDocumentos = $estadoDocumentos;
            return $persona;
        });

        //-------renderiza vista----------
        return Inertia::render('Documentos/Index', [            
            'personal' => $personal,
            'tiposDocumentos' => $tiposDocumentos,
        ]);
    }
    // crear un nuevo documento
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
        // 1 Validar los campos
        $validated = $request->validate([
            'personal_id' => 'required|exists:datos_personales,personal_id', // ajusta si tu tabla se llama diferente
            'tipo_documento' => 'required|string|max:255',
            'nombre_documento' => 'required|string|max:255',
            'archivo' => 'nullable|file|mimes:pdf,doc,docx,png,jpg,jpeg|max:10240',
            'entregado' => 'boolean',
            'fecha_entrega' => 'nullable|date',
        ]);

        // 2 Guardar archivo en storage/app/public/documentos

        $path = $request->file('archivo')->store('documentos', 'public');


        //  3 Crear el registro en BD
        $documento = DocumentoPersonal::create([
            'personal_id' => $validated['personal_id'], // FK a datos_personales
            'tipo_documento' => $validated['tipo_documento'],
            'nombre_documento' => $validated['nombre_documento'],
            'archivo' => $path, // guarda la ruta relativa
            'entregado' => $validated['entregado'] ?? false,
            'fecha_entrega' => $validated['fecha_entrega'] ?? null,
        ]);

        // Redirigir o devolver respuesta
        return back()->with('success', 'Documento cargado correctamente.');
    }

    //--------función de mostrar los documentos de una sola persona--------------
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

    //--------------Ver documento -----------------
    public function ver($id)
    {
        $documento = DocumentoPersonal::findOrFail($id);

        if (!$documento->archivo || !Storage::disk('public')->exists($documento->archivo)) {
            abort(404, 'Archivo no encontrado.');
        }
        $ruta = Storage::disk('public')->path($documento->archivo);
        return response()->file($ruta);
    }

    //--------------Descargar documento------------
    public function descargar(DocumentoPersonal $documento)
    {
        if (!$documento ->archivo || !Storage::disk('public')->exists($documento->archivo)){
            abort(404, 'El archivo no existe o no fue cargado.');
        }
        //Descargar con nombre legible
        //$rutaAbsoluta = Storage::disk('public')->path($documento->archivo);
        return response()->download(
            Storage::disk('public')->path($documento->archivo),
            $documento->nombre_documento . '.' . pathinfo($documento->archivo, PATHINFO_EXTENSION)
        );
    }

    //Eliminar documento
    public function destroy($id)
    {
        $documento = DocumentoPersonal::findOrFail($id);

        if ($documento->archivo && Storage::disk('public')->exists($documento->archivo)) {
            Storage::disk('public')->delete($documento->archivo);

        }

        $documento->delete();

        return back()->with('success', 'Documento eliminado');
    }
}
