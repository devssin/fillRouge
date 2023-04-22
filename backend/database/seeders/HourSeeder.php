<?php

namespace Database\Seeders;

use App\Models\Hour;
use App\Models\Doctor;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class HourSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // get the last inserted doctor
        $doctor = Doctor::latest()->first();

        $hours = [];
        for ($i = 0; $i < 30; $i++) {
            for ($j = 8; $j < 17; $j++) {
                $hours[] = [
                    'name' => $j . ':00',
                    'start_time' => $j . ':00:00',
                    'end_time' => $j . ':30:00',
                    'day_id' => $i + 1,
                    'doctor_id' => $doctor->id,
                ];
                $hours[] = [
                    'name' => $j . ':30',
                    'start_time' => $j . ':30:00',
                    'end_time' => ($j + 1) . ':00:00',
                    'day_id' => $i + 1,
                    'doctor_id' => $doctor->id,
                ];
            }
        }


        // Insert the hours into the database
        foreach ($hours as $hour) {
            Hour::create($hour);
        }
    }
}
