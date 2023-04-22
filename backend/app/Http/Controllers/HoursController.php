<?php

namespace App\Http\Controllers;

use App\Models\Day;
use App\Models\Hour;
use App\Models\Doctor;
use Illuminate\Http\Request;

class HoursController extends Controller
{
    public function index($doctor_id, $day_id){

        $doctor = Doctor::find($doctor_id);
        $day = Day::find($day_id);
        $hours = $day->hours()->where('doctor_id', $doctor->id)->get();
        return response()->json([
            'hours' => $hours,
        ], 200);
    }
}
