<?php

namespace App\Http\Controllers;
//importaciones 
use Illuminate\Http\Request;
use App\Models\ReporteIncidente; // Importar el modelo ReporteIncidente
use App\Models\Personal; // Importar el modelo Personal
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use SebastianBergmann\CodeCoverage\Report\Xml\Report;

class ReporteIncidenteController extends Controller
{
    //------------- INDEX ----- LISTAR REPORTES DE INCIDENTES ---------------
    public function index()
    {
        $reportes = ReporteIncidente::with('autor')
        ->orderBy('fecha')  //ordenar por fecha u otro dato
        ->paginate(10); // paginacion de 10

        return Inertia::render('Reportes/Index', [
            'reportes' => $reportes
        ]);
    }

    //------------- CREATE ----- FORMULARIO PARA NUEVO REPORTE ---------------
    public function create()
    {
        $personal = Personal::all(['personal_id', 'nombre']); //obtener personal_id y nombre del personal registrado

        return Inertia::render('Reportes/componentes/CreatePage', [
            'personal' => $personal
        ]);
    }

    //------------- STORE ------ GUARDAR NUEVO REPORTE ---------------
    public function store (Request $request)
    {
        // 1 validar los campos
        $request->validate([
            'titulo' => 'required|string|max:150',
            'personal_id' => 'required|exists:datos_personales,personal_id',
            'fecha' => 'required|date',
            'grupo' => 'nullable|string|max:100',
            'descripcion' => 'nullable|string|max:255',
            'archivo' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
        ]);

        // 2 guardar archivo en storage/app/public/reportes_incidentes
        $archivoPath = null; // inicializar variable
        if ($request->hasFile('archivo')) {
            $archivoPath = $request->file('archivo')->store('reportes_incidentes', 'public');
        }

        // 3 Crear el registro en la BD
        ReporteIncidente::create([
            'titulo' => $request->titulo,
            'personal_id' => $request->personal_id, // FK a autor
            'fecha' => $request->fecha,
            'grupo' => $request->grupo,
            'descripcion' => $request->descripcion,
            'archivo' => $archivoPath, // guarda la ruta relativa o null
        ]);

        // Redirigir o devolver respuesta
        return back()->with('success', 'Reporte de Incidente creado correctamente.');
    }

    //------------- SHOW ----- MOSTRAR A DETALLE UN REPORTE ---------------
  
    public function archivo($id)
    {
        $reporte = ReporteIncidente::findOrFail($id);

        if (!$reporte->archivo || !Storage::disk('public')->exists($reporte->archivo)) {
            abort(404, 'Archivo no encontrado.');
        }

        $ruta = Storage::disk('public')->path($reporte->archivo);

        return response()->file($ruta, [
            'Content-Disposition' => 'inline; filename="'.basename($reporte->archivo).'"'
        ]);
    }

    //------------- EDIT ----- FORMULARIO PARA EDITAR UN REPORTE ---------------
    public function edit (ReporteIncidente $reporte){
        $personal = Personal::all(['personal_id', 'nombre']);
        return Inertia::render('Reportes/componentes/Edit', [
            'personal' => $personal,
            'reporte' => $reporte
        ]);
    }

    //------------- UPDATE ----- ACTUALIZAR UN REPORTE ---------------
    public function update(Request $request, ReporteIncidente $reporte)
    {
        //1 validar campos
        $request->validate([
            'titulo' => 'required|string|max:150',
            'personal_id' => 'required|exists:datos_personales,personal_id',
            'fecha' => 'required|date',
            'grupo' => 'nullable|string|max:100',
            'descripcion' => 'nullable|string|max:255',
            'archivo' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
        ]);

        $archivoPath = $reporte->archivo;

        if ($request->hasFile('archivo')) {
            if ($archivoPath && Storage::disk('public')->exists($archivoPath)) {
                Storage::disk('public')->delete($archivoPath);
            }
            $archivoPath = $request->file('archivo')->store('reportes_incidentes', 'public');
        }

        $reporte->update([
            'titulo' => $request->titulo,
            'personal_id' => $request->personal_id,
            'fecha' => $request->fecha,
            'grupo' => $request->grupo,
            'descripcion' => $request->descripcion,
            'archivo' => $archivoPath,
        ]);

        return redirect()->route('reportes.index')->with('success', 'Reporte actualizado correctamente');      
    }

    //------------- DOWNLOAD ARCHIVO ----- DESCARGAR ARCHIVO ---------------
    public function download(ReporteIncidente $reporte)
    {
        if (!$reporte->archivo || !Storage::disk('public')->exists($reporte->archivo)) {
            abort(404, 'El archivo no existe o no fue cargado.');
        }
        //descargar con nombre legible
        return response()->download(
                Storage::disk('public')->path($reporte->archivo),
                $reporte->titulo . '.' . pathinfo($reporte->archivo, PATHINFO_EXTENSION)
        );
    }
    
    //------------- DESTROY ----- ELIMINAR UN REPORTE ---------------
    public function destroy(ReporteIncidente $reporte)
    {
        if ($reporte->archivo && Storage::disk('public')->exists($reporte->archivo)) {
            Storage::disk('public')->delete($reporte->archivo);
        }

        $reporte->delete();

        return redirect()->route('reportes.index')->with('success', 'Reporte eliminado correctamente');
    }

}
