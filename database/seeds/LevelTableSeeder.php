<?php

use App\Level;
use Illuminate\Database\Seeder;

class LevelTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Level::create([
            'name' => 'bronze',
            'level' => '1',
            'color' => '#CD7F32',
        ]);

        Level::create([
            'name' => 'silver',
            'level' => '2',
            'color' => '#C0C0C0',
        ]);

        Level::create([
            'name' => 'gold',
            'level' => '3',
            'color' => '#FFD700',
        ]);

        Level::create([
            'name' => 'platinum',
            'level' => '4',
            'color' => '#7F7679',
        ]);

        Level::create([
            'name' => 'onyx',
            'level' => '5',
            'color' => '#353839',
        ]);


    }
}
