<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Admin::factory()->create([
            'username' => 'nissay',
            'email' => 'yassin.aaynealhayate@gmail.com',
            'password' => bcrypt('nissay123'),
        ]);
    }
}
