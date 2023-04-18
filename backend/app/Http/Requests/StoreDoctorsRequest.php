<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StoreDoctorsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'firstName' => ['required', 'string', 'max:255'],
            'lastName' => ['required', 'string', 'max:255'],
            'email' => ['required','string','email','unique:doctors', 'max:255'],
            'password' => ['required', 'string', 'min:8' , 'confirmed' , Password::defaults()],
            'city' => ['required', 'string', 'max:255'],
            'officeAddress' => ['required', 'string', 'max:255'],
            'phoneNumber' => ['required', 'string', 'max:13'],
            'officePhoneNumber' => ['required', 'string', 'max:13'],
            'speciality' => ['required', 'string', 'max:255'],
            'profilePicture' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
        ];
    }
}
