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

class DocumentoPersonalController extends Controller
{
    public function index()
    {   
        $documentos = DocumentoPersonal::all(); 
        return Inertia::render('Documentos/Index', 
        [            
            'documentos' => DocumentoPersonal::all(),
            'personas' => Personal::all(),

        ]);
    }


    //guardar documento
    public function store(Request $request) //
    {
        $validator = Validator::make ($request->all(),[
            'tipo_documento' => 'required|string|max:255',
            'nombre_documento' => 'required|string|max:255',
            'archivo' => 'required|file|mimes:pdf,doc,docx,jpg,jpeg,png|max:2048',
            'personal_id' => 'required|exists:datos_personales,id',
            
        ]);

        if ($validator->fails()) {
            return back()->withErrors ($validator)->withInput();
        }

        $ruta = $request ->file('archivo')->store('documentos/personal', 'public');

        DocumentoPersonal::create([
            'tipo_documento' => $request -> tipo_documento, 
            'nombre_documento' => $request -> nombre_documento,
            'archivo' => $ruta, 
            'entregado' => true,
            'fecha_entrega' => now(),
            'personal_id' => $request -> personal_id,
        ]);

        return back()->with('success', 'Documento cargado correctamente.');

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
