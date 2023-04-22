<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hour extends Model
{
    use HasFactory;
    protected $table = 'hours';
    protected $fillable = ['name', 'start', 'end', 'day_id'];

    public function day()
    {
        return $this->belongsTo(Day::class);
    }

    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }
}
