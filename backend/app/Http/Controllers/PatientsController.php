<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\Patient;

use Illuminate\Support\Facades\Hash;
use App\Http\Requests\StorePatientRequest;

class PatientsController extends Controller
{
    public function register(StorePatientRequest $request)
    {

        $request->validated($request->all());
        $patient = Patient::create(
            [
                'firstName' => $request->firstName,
                'lastName' => $request->lastName,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'phoneNumber' => $request->phoneNumber,
            ]
        );

        return response()->json(
            [
                'patient' => $patient,
                'message' => 'Patient registered successfully!',
                'token' => $patient->createToken('patient-token')->plainTextToken,
            ],
            201
        );


    }

    public function login(LoginRequest $request){
        $request->validated($request->all());
        
        // Retrieve the doctor by email
        $patient = Patient::where('email', $request->email)->first();

        // Check if doctor exists and if the password is valid
        if (!$patient || !Hash::check($request->password, $patient->password)) {
            // If authentication fails, throw an error
            return response()->json([
                'message' => 'Invalid credentials',
            ], 401);
        }
        return response()->json(
            [
                'patient' => $patient,
                'message' => 'Patient logged in successfully!',
                'token' => $patient->createToken('patient-token')->plainTextToken,
            ],
            201
        );
    }
}
