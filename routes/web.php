<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

//controladores
use App\Http\Controllers\PersonalController;    // Controlador de Personal
use App\Http\Controllers\DocumentoPersonalController; // Controlador de Documentos del personal
use App\Http\Controllers\ReporteIncidenteController; // Controlador de Reporte de Incidentes


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

//rutas del sistema
//--------------------------------------------------------------------------- 
//-------------------Rutas de Personal ----------------------------- 
//Listar personal registrado     --- INDEX ----
Route::get('/personal', [PersonalController::class, 'index'])->name('personal.index');

//Crear nuevo personal con formulario  ---- CREATE ----
Route::get('/personal/create', [PersonalController::class, "create"])->name('personal.create'); 
 
//Guardar nuevo personal siguiendo el formulario anterior  --- STORE ----
Route::post('/personal', [PersonalController::class, "store"])->name('personal.store'); 

//Mostrar una persona   ---- SHOW ---
Route::get('/personal/{id}', [PersonalController::class, 'show'])->name('personal.show');

//EDITAR una persona    ---- EDIT ----
Route::get('/personal/{id}/edit', [PersonalController::class, 'edit'])->name('personal.edit');

//Actualizar una persona ---- UPDATE ----
Route::put('/personal/{id}', [PersonalController::class, 'update'])->name('personal.update');

//Eliminar personal por ID  ----- DESTROY ----                        
Route::delete('/personal/{id}', [PersonalController::class, 'destroy'])->name('personal.destroy'); 
                         
//---------------------------------------------------------------------------                          
//----------------Rutas de Documentos-personal  TODOS   --------------------
Route::get('/documentos-personal', [DocumentoPersonalController::class, 'index'])
    ->name('documentos-personal.index');

//--------ruta para mostrar los documentos de una sola persona---------
Route::get('/documentos-personal/{personal}', [DocumentoPersonalController::class, 'show'])
    ->name('documentos-personal.show');

//--------------crear nuevo documento------------
Route::get('/documentos-personal/{personal}/create',[DocumentoPersonalController::class, 'create'])
    ->name('documentos-personal.create');

//------------- ruta guardar documentos ------------------
Route::post('/documentos-personal', [DocumentoPersonalController::class, 'store'])
->name('documentos-personal.store');

//--------------------- ruta gestionar documentos --------------
Route::get('/personal/{id}/documentos', [DocumentoPersonalController::class, 'gestionar'])
    ->name('documentos-personal.gestionar');

//---------------------- ruta para Ver documentos ---------------
Route::get('/documentos-personal/{id}/ver', [DocumentoPersonalController::class, 'ver'])
    ->name('documentos-personal.ver');

//--------------------- ruta descargar documentos ----------------
Route::get('/documentos-personal/{documento}/descargar', [DocumentoPersonalController::class, 'descargar'])
    ->name('documentos-personal.descargar');

//--------------------- ruta eliminar documentos -------------------
Route::delete('/documentos-personal/{id}', [DocumentoPersonalController::class, 'destroy'])
    ->name('documentos-personal.destroy');


//--------------------------------------------------------------------------- 
//--------------------- Rutas de Reportes de Incidentes -------------------
Route::prefix('reportes')->name('reportes.')->group(function () {
    Route::get('/', [ReporteIncidenteController::class, 'index'])->name('index');
    Route::get('/create', [ReporteIncidenteController::class, 'create'])->name('create');
    Route::post('/', [ReporteIncidenteController::class, 'store'])->name('store');
    Route::get('/{reporte}', [ReporteIncidenteController::class, 'show'])->name('show');
    Route::get('/{reporte}/edit', [ReporteIncidenteController::class, 'edit'])->name('edit');
    Route::put('/{reporte}', [ReporteIncidenteController::class, 'update'])->name('update');
    Route::delete('/{reporte}', [ReporteIncidenteController::class, 'destroy'])->name('destroy');
    Route::get('/{reporte}/download', [ReporteIncidenteController::class, 'download'])->name('download');
});





Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
