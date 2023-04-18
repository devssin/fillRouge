<?php

namespace Database\Seeders;

use App\Models\Doctor;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DoctorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        Doctor::factory()->create([
            'firstName' => 'Ahmed',
            'lastName' => 'Kabbaj',
            'email' => 'ahmed@gmail.com',
            'password' => bcrypt('ahmed123'),
            'city' => 'Marrakech',
            'officeAdress' => '12 Hay Izdihar Marrakech',
            'phoneNumber' => '0629873383',
            'officePhoneNumber' => '0527272261',
            'speciality' => 'Pédiatre'
        ]);
    }
}
