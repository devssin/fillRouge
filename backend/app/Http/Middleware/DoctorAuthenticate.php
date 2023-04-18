<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DoctorAuthenticate
{
    public function handle(Request $request, Closure $next)
    {
        if (!Auth::guard('doctor')->check()) {
            // Return an error response if the doctor is not authenticated
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return $next($request);
    }
}