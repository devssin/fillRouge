<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function login(LoginRequest $request){
        $request->validated($request->all());
        
        $admin = Admin::where('email', $request->email)->first();

        if(!$admin || !Hash::check($request->password, $admin->password)){
            return response()->json([
                'message' => 'Invalid credentials',
            ], 401);
        }

        return response()->json(
            [
                'admin' => $admin,
                'message' => 'Admin logged in successfully!',
                'token' => $admin->createToken('admin-token')->plainTextToken,
            ],
            201
        );
    }
}
