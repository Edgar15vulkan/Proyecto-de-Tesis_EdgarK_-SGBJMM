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

//rutas de personal 
Route::get('/personal', [PersonalController::class, 'index'])->name('personal.index'); //ruta de la sección de personal
Route::get('/personal/create', [PersonalController::class, "create"])->name('personal.create'); //Se agrega la ruta del formulario de personal
                            //Se declara el formulario de personal en la ruta
Route::post('/personal', [PersonalController::class, "store"])->name('personal.store'); //Se agrega la ruta del formulario personal
                            //Se declara la ruta para guardar personal
Route::delete('/personal/{id}', [PersonalController::class, 'destroy'])->name('personal.destroy'); //Se agrega la ruta de eliminar personal
                            //Se declara la ruta de eliminar personal en la ruta
//rutas de documentos-personal

Route::get('/documentos-personal', [DocumentoPersonalController::class, 'index'])->name('documentos-personal.index');

Route::post('/documentos-personal', [DocumentoPersonalController::class, 'store'])->name('documentos-personal.store');

Route::get('/personal/{id}/documentos', [DocumentoPersonalController::class, 'gestionar'])->name('documentos-personal.gestionar');

Route::get('/documentos-personal/{id}/descargar', [DocumentoPersonalController::class, 'descargar'])->name('documentos-personal.descargar');

Route::delete('/documentos-personal/{id}', [DocumentoPersonalController::class, 'destroy'])->name('documentos-personal.destroy');

//
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
