<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Patient extends Authenticatable
{
    use HasFactory, HasApiTokens, Notifiable;

    protected $guard = 'patient';
    protected $table = 'patients';

    protected $fillable = [
        'firstName',
        'lastName',
        'email',
        'password',
        'phoneNumber',
    ];

    protected $hidden = [
        'password',

    ];

    public function appointements()
    {
        return $this->hasMany(Appointement::class);
    }


}
