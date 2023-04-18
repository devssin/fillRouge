<?php

namespace App\Models;

use App\Models\Appointement;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Doctor extends Authenticatable
{
    use HasFactory, HasApiTokens, Notifiable;

    protected $guard = 'doctor';
    protected $table = 'doctors';

    protected $fillable = [
        'firstName',
        'lastName',
        'email',
        'password',
        'city',
        'officeAddress',
        'phoneNumber',
        'officePhoneNumber',
        'speciality',
        'profilePicture',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function appointements()
    {
        return $this->hasMany(Appointement::class);
    }
   
}
