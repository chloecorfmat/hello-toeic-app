<?php

use Illuminate\Database\Seeder;
use App\Setting;

class SettingTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /**Setting::create([
            'key' => 'ff.email',
            'type' => 'feature_flipping',
            'value' => 'true',
            'name' => 'Send e-mails ?',
        ]);**/

        /**Setting::create([
            'key' => 'config.score.intermediate',
            'type' => 'config',
            'value' => '85',
            'name' => 'Score intermédiaire (%)',
        ]);

        Setting::create([
            'key' => 'config.score.low',
            'type' => 'config',
            'value' => '65',
            'name' => 'Score insuffisant (%)',
        ]);**/

        Setting::create([
            'key' => 'config.default.reading.duration',
            'type' => 'config',
            'value' => strval(75*60),
            'name' => 'Default timer (reading exercise)',
        ]);
    }
}
