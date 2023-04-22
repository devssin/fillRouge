<?php

namespace App\Http\Controllers;

use App\Models\Hour;
use App\Models\Doctor;
use App\Models\Patient;
use App\Models\Appointement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AppointementsController extends Controller
{

    public function index(){
        $appointements = Appointement::all();
        foreach($appointements as $appointement){
            $appointement->patientFirstName = Patient::find($appointement->patient_id)->firstName;
            $appointement->patientLastName = Patient::find($appointement->patient_id)->lastName;
            $appointement->doctorFirstName = Doctor::find($appointement->doctor_id)->firstName;
            $appointement->doctorLastName = Doctor::find($appointement->doctor_id)->lastName;
            
        }

        return response()->json([
            'appointements' => $appointements,
            'status' => 200
        ], 200);

    }
    public function store( Request $request){

        $hour = Hour::find($request->hour_id);
        $hour->is_available = false;
        $hour->save();

        $appointement = new Appointement();
        $appointement->patient_id = Auth::guard('patient')->user()->id;
        $appointement->doctor_id = $request->doctor_id;
        $appointement->date = $request->date;
        $appointement->time = $hour->start_time;
        $appointement->save();


        return response()->json([
            'message' => 'Appointement created successfully',
            'appointement' => $appointement,
            'status' => 200
        ], 200);
    }

    public function doctorAppointements($id){
        $appointements = Appointement::where('doctor_id', $id)->get();
        foreach($appointements as $appointement){
            $appointement->patientFirstName = Patient::find($appointement->patient_id)->firstName;
            $appointement->patientLastName = Patient::find($appointement->patient_id)->lastName;
            $appointement->patientEmail = Patient::find($appointement->patient_id)->email;
            $appointement->patientPhoneNumber = Patient::find($appointement->patient_id)->phoneNumber;
        }
        return response()->json([
            'appointements' => $appointements,
            'status' => 200
        ], 200);
    }

    public function patientAppointements($id){
        $appointements = Appointement::where('patient_id', $id)->get();
        foreach($appointements as $appointement){
            $appointement->doctorFirstName = Doctor::find($appointement->doctor_id)->firstName;
            $appointement->doctorLastName = Doctor::find($appointement->doctor_id)->lastName;
            $appointement->doctorEmail = Doctor::find($appointement->doctor_id)->email;
            $appointement->doctorPhoneNumber = Doctor::find($appointement->doctor_id)->phoneNumber;
        }
        return response()->json([
            'appointements' => $appointements,
            'status' => 200
        ], 200);
    }

    public function countAppointements(){
        $appointements = Appointement::all();
        $count = count($appointements);
        return response()->json([
            'count' => $count,
            'status' => 200
        ], 200);
    }

    
}
