<?php

use App\Badge;
use App\BadgeType;
use Illuminate\Database\Seeder;

class BadgeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $badge_type_id = BadgeType::where('method', 'aChallengePerDayXTimes')->first()->id;
        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 1,
            'image' => '',
            'nb_repetitions' => 5
        ]);

        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 2,
            'image' => '',
            'nb_repetitions' => 25
        ]);

        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 3,
            'image' => '',
            'nb_repetitions' => 50
        ]);

        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 4,
            'image' => '',
            'nb_repetitions' => 100
        ]);

        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 5,
            'image' => '',
            'nb_repetitions' => 365
        ]);

        $badge_type_id = BadgeType::where('method', 'getXPointsOnChallengeMode')->first()->id;
        Badge::create([
        'badge_type_id' => $badge_type_id,
        'level_id' => 1,
        'image' => '',
        'nb_repetitions' => 10
        ]);

        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 2,
            'image' => '',
            'nb_repetitions' => 25
        ]);

        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 3,
            'image' => '',
            'nb_repetitions' => 50
        ]);

        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 4,
            'image' => '',
            'nb_repetitions' => 100
        ]);

        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 5,
            'image' => '',
            'nb_repetitions' => 300
        ]);

    }
}
