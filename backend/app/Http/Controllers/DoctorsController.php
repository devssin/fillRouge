<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use App\Mail\ActiveAccount;
use Illuminate\Http\Request;
use App\Traits\HttpResponses;
use Laravel\Sanctum\HasApiTokens;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Http\Requests\StoreDoctorsRequest;
use Illuminate\Validation\ValidationException;



class DoctorsController extends Controller
{
    use HasApiTokens, HttpResponses;
    /**
     * Register a new doctor.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\JsonResponse
     * @throws ValidationException
     */

    public function register(StoreDoctorsRequest $request)
    {
        $request->validated($request->all());


        $image = $request->file('profilePicture');
        if ($image) {
            $imageName = rand() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('public/profilePictures', $imageName);
        } else {
            $imageName = null;
        }



        // Create a new Doctor model instance


        $doctor = Doctor::create([
            'firstName' => $request->firstName,
            'lastName' => $request->lastName,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'city' => $request->city,
            'officeAddress' => $request->officeAddress,
            'phoneNumber' => $request->phoneNumber,
            'officePhoneNumber' => $request->officePhoneNumber,
            'speciality' => $request->speciality,
            'profilePicture' => $imageName,
        ]);

        // Return a JSON response with the doctor data and a success message
        return response()->json([
            'doctor' => $doctor,
            'message' => 'Doctor registered successfully!',
            'token' => $doctor->createToken('doctor-token')->plainTextToken,
        ], 201);
    }

    /**
     * Log in a doctor.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\JsonResponse
     * @throws ValidationException
     */
    public function login(LoginRequest $request)
    {

        $request->validated($request->all());

        // Retrieve the doctor by email
        $doctor = Doctor::where('email', $request->email)->first();

        // Check if doctor exists and if the password is valid
        if (!$doctor || !Hash::check($request->password, $doctor->password)) {
            // If authentication fails, throw an error
            return response()->json([
                'message' => 'Invalid credentials',
            ], 401);
        }

        // If authentication is successful, generate a new token for the doctor using Sanctum
        $token = $doctor->createToken('doctor-token')->plainTextToken;

        // Return a JSON response with the doctor data and the token
        return response()->json([
            'doctor' => $doctor,
            'token' => $token,
            'message' => 'Doctor logged in successfully!',
        ], 200);
    }

    public function logout(Request $request)
    {
        // Revoke the token that was used to authenticate the current request...
        $request->user()->currentAccessToken()->delete();

        return $this->successResponse('Logged out successfully');
    }

    public function index()
    {
        $doctors = Doctor::orderBy('created_at', 'desc')->get();
        return response()->json(
            [
                'doctors' => $doctors,
            ],
            200
        );
    }

    public function activeDoctors()
    {
        $doctors = Doctor::where('status', 'accepted')->get();
        return response()->json(
            [
                'doctors' => $doctors,
            ],
            200
        );
    }

    public function activate($id)
    {
        $doctor = Doctor::find($id);
        $doctor->status = 'accepted';
        $doctor->save();

        $mailData = [
            'name' => $doctor->firstName,
            'email' => $doctor->email,
            'subject' => 'Account activation',
            'body' => 'Your account has been activated successfully! You can now login to your account and start using our services.',
        ];

        Mail::to($doctor->email)->send(new ActiveAccount($mailData));


        return response()->json(
            [
                'doctor' => $doctor,
                'message' => 'Doctor activated successfully!',
                'status' => 200,

            ],
            200
        );
    }



    public function desactivate($id)
    {
        $doctor = Doctor::find($id);
        $doctor->status = 'rejected';
        $doctor->save();
        return response()->json(
            [
                'doctor' => $doctor,
                'message' => 'Doctor deactivated successfully!',
                'status' => 200,

            ],
            200
        );
    }

    public function latest()
    {
        $doctors = Doctor::where('status', 'accepted')->orderBy('created_at', 'desc')->take(6)->get();
        return response()->json(
            [
                'doctors' => $doctors,
            ],
            200
        );
    }


    public function search($speciality, $city)
    {




        if ($speciality == 0 && $city == 0) {
            $doctors = Doctor::where('status', 'accepted')->get();
            return response()->json(
                [
                    'doctors' => $doctors,
                ],
                200
            );
        }

        if ($speciality == 0) {
            $doctors = Doctor::where('city', 'like', '%' . $city . '%')->where('status', 'accepted')->get();
            return response()->json(
                [
                    'doctors' => $doctors,
                ],
                200
            );
        }

        if ($city == 0) {
            $doctors = Doctor::where('speciality', 'like', '%' . $speciality . '%')->where('status', 'accepted')
                ->get();
            return response()->json(
                [
                    'doctors' => $doctors,
                ],
                200
            );
        }


        $doctors = Doctor::where('speciality', 'like', '%' . $speciality . '%')->where('status', 'accepted')
            ->where('city', 'like', '%' . $city . '%')
            ->get();
        return response()->json(
            [
                'doctors' => $doctors,
            ],
            200
        );
    }

    public function show($id)
    {
        $doctor = Doctor::find($id);
        return response()->json(
            [
                'doctor' => $doctor,
            ],
            200
        );
    }

    public function countDoctors()
    {
        $doctors = Doctor::all();
        $count = $doctors->count();
        return response()->json(
            [
                'count' => $count,
            ],
            200
        );
    }
}
