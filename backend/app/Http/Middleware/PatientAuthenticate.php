<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PatientAuthenticate
{
    public function handle(Request $request, Closure $next)
    {
        if (!Auth::guard('patient')->check()) {
            // Return an error response if the patient is not authenticated
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return $next($request);
    }
}