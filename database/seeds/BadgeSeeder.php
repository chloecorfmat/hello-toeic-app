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
        /**$badge_type_id = BadgeType::where('method', 'aChallengePerDayXTimes')->first()->id;
        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 1,
            'image' => './badges/mountain-peak-1.svg',
            'nb_repetitions' => 5
        ]);

        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 2,
            'image' => './badges/mountain-peak-2.svg',
            'nb_repetitions' => 25
        ]);

        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 3,
            'image' => './badges/mountain-peak-3.svg',
            'nb_repetitions' => 50
        ]);

        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 4,
            'image' => './badges/mountain-peak-4.svg',
            'nb_repetitions' => 100
        ]);

        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 5,
            'image' => './badges/mountain-peak-5.svg',
            'nb_repetitions' => 365
        ]);

        $badge_type_id = BadgeType::where('method', 'getXPointsOnChallengeMode')->first()->id;
        Badge::create([
        'badge_type_id' => $badge_type_id,
        'level_id' => 1,
        'image' => './badges/mountain-peak-1.svg',
        'nb_repetitions' => 10
        ]);

        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 2,
            'image' => './badges/mountain-peak-2.svg',
            'nb_repetitions' => 25
        ]);

        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 3,
            'image' => './badges/mountain-peak-3.svg',
            'nb_repetitions' => 50
        ]);

        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 4,
            'image' => './badges/mountain-peak-4.svg',
            'nb_repetitions' => 100
        ]);

        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 5,
            'image' => './badges/mountain-peak-5.svg',
            'nb_repetitions' => 300
        ]);

        $badge_type_id = BadgeType::where('method', 'stayXDaysInChallengeTop')->first()->id;
        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 1,
            'image' => './badges/medal-1.svg',
            'nb_repetitions' => 1
        ]);

        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 2,
            'image' => './badges/medal-2.svg',
            'nb_repetitions' => 10
        ]);

        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 3,
            'image' => './badges/medal-3.svg',
            'nb_repetitions' => 25
        ]);

        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 4,
            'image' => './badges/medal-4.svg',
            'nb_repetitions' => 50
        ]);

        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 5,
            'image' => './badges/medal-5.svg',
            'nb_repetitions' => 100
        ]);

        $badge_type_id = BadgeType::where('method', 'getATotalOfXPointsInChallenge')->first()->id;
        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 1,
            'image' => './badges/scoreboard-1.svg',
            'nb_repetitions' => 25
        ]);

        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 2,
            'image' => './badges/scoreboard-2.svg',
            'nb_repetitions' => 50
        ]);

        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 3,
            'image' => './badges/scoreboard-3.svg',
            'nb_repetitions' => 200
        ]);

        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 4,
            'image' => './badges/scoreboard-4.svg',
            'nb_repetitions' => 500
        ]);

        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 5,
            'image' => './badges/scoreboard-5.svg',
            'nb_repetitions' => 1000
        ]);**/

        $badge_type_id = BadgeType::where('method', 'validateCompositeTestsXTimes')->first()->id;
        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 1,
            'image' => './badges/scoreboard-1.svg',
            'nb_repetitions' => 2
        ]);

        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 2,
            'image' => './badges/scoreboard-2.svg',
            'nb_repetitions' => 5
        ]);

        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 3,
            'image' => './badges/scoreboard-3.svg',
            'nb_repetitions' => 10
        ]);

        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 4,
            'image' => './badges/scoreboard-4.svg',
            'nb_repetitions' => 25
        ]);

        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 5,
            'image' => './badges/scoreboard-5.svg',
            'nb_repetitions' => 50
        ]);

        $badge_type_id = BadgeType::where('method', 'comeXTimesInChallengeTop')->first()->id;
        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 1,
            'image' => './badges/scoreboard-1.svg',
            'nb_repetitions' => 1
        ]);

        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 2,
            'image' => './badges/scoreboard-2.svg',
            'nb_repetitions' => 3
        ]);

        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 3,
            'image' => './badges/scoreboard-3.svg',
            'nb_repetitions' => 5
        ]);

        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 4,
            'image' => './badges/scoreboard-4.svg',
            'nb_repetitions' => 7
        ]);

        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 5,
            'image' => './badges/scoreboard-5.svg',
            'nb_repetitions' => 11
        ]);

        $badge_type_id = BadgeType::where('method', 'beFirstXTimesOnLesson')->first()->id;
        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 1,
            'image' => './badges/scoreboard-1.svg',
            'nb_repetitions' => 1
        ]);

        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 2,
            'image' => './badges/scoreboard-2.svg',
            'nb_repetitions' => 3
        ]);

        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 3,
            'image' => './badges/scoreboard-3.svg',
            'nb_repetitions' => 5
        ]);

        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 4,
            'image' => './badges/scoreboard-4.svg',
            'nb_repetitions' => 7
        ]);

        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 5,
            'image' => './badges/scoreboard-5.svg',
            'nb_repetitions' => 11
        ]);

        $badge_type_id = BadgeType::where('method', 'getXPointsInExercises')->first()->id;
        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 1,
            'image' => './badges/scoreboard-1.svg',
            'nb_repetitions' => 200
        ]);

        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 2,
            'image' => './badges/scoreboard-2.svg',
            'nb_repetitions' => 500
        ]);

        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 3,
            'image' => './badges/scoreboard-3.svg',
            'nb_repetitions' => 1000
        ]);

        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 4,
            'image' => './badges/scoreboard-4.svg',
            'nb_repetitions' => 5000
        ]);

        Badge::create([
            'badge_type_id' => $badge_type_id,
            'level_id' => 5,
            'image' => './badges/scoreboard-5.svg',
            'nb_repetitions' => 10000
        ]);
    }
}
