<?php

namespace App\Http\Controllers;

use App\Models\Day;
use Illuminate\Http\Request;

class DaysController extends Controller
{
    //

    public function index(){
        
        $days = Day::all();
        return response()->json([
            'days' => $days,
        ], 200);
    }

}
