<?php

namespace App\Models;

use App\Models\Appointement;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Doctor extends Authenticatable
{
    use HasFactory, HasApiTokens, Notifiable;


    protected static function boot()
    {
        parent::boot();

        // Register an event to run the HoursTableSeeder whenever a new doctor is created
        static::created(function ($doctor) {
            Artisan::call('db:seed', ['--class' => 'HourSeeder']);
        });
    }
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

    public function hours()
    {
        return $this->hasMany(Hour::class);
    }
    public function appointements()
    {
        return $this->hasMany(Appointement::class);
    }
   
}
