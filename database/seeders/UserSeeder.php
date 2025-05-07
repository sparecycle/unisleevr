<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Jordan',
                'email' => 'jordan@addwonder.com',
                'password' => bcrypt('password'),
            ],
        ];
        foreach ($users as $user) {
            User::updateOrCreate(
                ['email' => $user['email']], // Match by email - avoid duplicate
                $user
            );
        }
    }
}
