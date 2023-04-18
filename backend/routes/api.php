<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
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


Route::middleware(['auth:patient'])->group(function () {
    Route::post('/appointements/create', [AppointementsController::class, 'store']);
});


Route::middleware(['auth:doctor'])->group(function () {
    

});


Route::prefix('doctors')->group(function () {
    Route::post('/register', [DoctorsController::class, 'register']);
    Route::post('/login', [DoctorsController::class, 'login']);
    Route::get('/', [DoctorsController::class, 'index']);

});

Route::prefix('admin')->group(function (){
    Route::post('/register', [AdminController::class, 'register']);
    Route::post('/login', [AdminController::class, 'login']);
    
});



Route::prefix('patients')->group(function () {
    Route::post('/register', [PatientsController::class, 'register']);
    Route::post('/login', [PatientsController::class, 'login']);
   
});



Route::middleware(['auth:doctor']) 
    ->prefix('doctors') 
    ->group(function () {
        
    });

Route::middleware(['auth:admin'])->group(function () {
    Route::put('/doctors/{id}/activate', [DoctorsController::class, 'activate']);
    Route::put('/doctors/{id}/desactivate', [DoctorsController::class, 'desactivate']);
});



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
