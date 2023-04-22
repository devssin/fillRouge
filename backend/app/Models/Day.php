<?php

namespace App\Models;

use App\Models\Hour;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Day extends Model
{
    use HasFactory;
    protected $table = 'days';
    protected $fillable = ['name', 'date'];

    public function hours()
    {
        return $this->hasMany(Hour::class);
    }
}
