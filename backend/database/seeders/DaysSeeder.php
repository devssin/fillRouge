<?php

namespace Database\Seeders;

use App\Models\Day;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DaysSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get today's date
        $startDate = now();
        // Create an array to hold the days
        $days = [];

        // Loop 30 times to generate the next 30 days
        for ($i = 0; $i < 30; $i++) {
            // Add the current date to the array
            $days[] = [
                'name' => $startDate->format('l'),
                'date' => $startDate->format('Y-m-d'),
            ];

            // Move to the next day
            $startDate->modify('+1 day');
        }

        // Insert the days into the database



        foreach ($days as $day) {
            Day::create($day);
        }
    }
}
