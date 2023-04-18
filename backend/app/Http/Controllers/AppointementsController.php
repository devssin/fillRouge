<?php

namespace App\Http\Controllers;

use App\Models\Appointement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AppointementsController extends Controller
{
    public function store( Request $request){
        $appointement = Appointement::create([
            'doctor_id' => $request->doctor_id,
            'patient_id' => Auth::guard('patient')->user()->id,
            'date_time' => $request->date_time,
        ]);
        return response()->json([
            'appointement' => $appointement,
            'message' => 'Appointement created successfully!',
        ], 201);
    }
    
}
