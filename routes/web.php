<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

//controladores
use App\Http\Controllers\PersonalController;    // Controlador de Personal
use App\Http\Controllers\DocumentoPersonalController;

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

//--------------------- ruta descargar documentos ----------------
Route::get('/documentos-personal/{documento}/descargar', [DocumentoPersonalController::class, 'descargar'])
    ->name('documentos-personal.descargar');

//--------------------- ruta eliminar documentos -------------------
Route::delete('/documentos-personal/{id}', [DocumentoPersonalController::class, 'destroy'])
    ->name('documentos-personal.destroy');

//
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
