<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DaysController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\HoursController;
use App\Http\Controllers\DoctorsController;
use App\Http\Controllers\PatientsController;
use App\Http\Controllers\AppointementsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::prefix('patients')->group(function () {
    Route::post('/register', [PatientsController::class, 'register']);
    Route::post('/login', [PatientsController::class, 'login']);
    Route::get('/', [PatientsController::class, 'index']);
    

});


Route::middleware(['auth:patient'])->group(function () {
    Route::post('/appointements/create', [AppointementsController::class, 'store']);
});


Route::middleware(['auth:doctor'])
    ->prefix('doctors')
    ->group(function () {
        Route::get('/{id}/appointements', [AppointementsController::class, 'doctorAppointements']);
    });




Route::middleware(['auth:doctor'])->group(function () {
    Route::put('/appointements/{id}/accept', [AppointementsController::class, 'accept']);
});


Route::prefix('doctors')->group(function () {
    Route::get('/latest', [DoctorsController::class, 'latest']);
    Route::post('/register', [DoctorsController::class, 'register']);
    Route::post('/login', [DoctorsController::class, 'login']);
    Route::get('/', [DoctorsController::class, 'index']);
    Route::get('/{speciality}/{city}', [DoctorsController::class, 'search']);
    Route::get('/{id}', [DoctorsController::class, 'show']);
});



Route::prefix('admin')->group(function () {
    Route::post('/register', [AdminController::class, 'register']);
    Route::post('/login', [AdminController::class, 'login']);
});







Route::middleware(['auth:admin'])->group(function () {
    Route::put('/doctors/{id}/activate', [DoctorsController::class, 'activate']);
    Route::put('/doctors/{id}/desactivate', [DoctorsController::class, 'desactivate']);
    Route::get('/appointements', [AppointementsController::class, 'index']);

});


Route::get('/days', [DaysController::class, 'index']);

Route::get('/doctors/{id}/hours/{day_id}', [HoursController::class, 'index']);
