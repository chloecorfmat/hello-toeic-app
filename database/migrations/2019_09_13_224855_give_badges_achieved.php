<?php

use App\Badge;
use App\BadgeType;
use App\Game;
use App\User;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class GiveBadgesAchieved extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $users = User::all();

        $key = 'getXPointsOnChallengeMode';
        $badge_type = BadgeType::where('method', $key)->get()->first();
        /**foreach ($users as $user) {
            $update = TRUE;
            $best_score = Game::where('user_id', $user->id)->max('score');

            $value = $best_score/5;
            if (!is_null($best_score)) {
                $datetime = Game::where('user_id', $user->id)
                    ->where('score', $best_score)->get()->first()->datetime;

                $user_badge_type = $user->badge_types()->where('method', $key)->get()->first();

                if (!is_null($user_badge_type) && ($user_badge_type->count() > 0)) {
                    $tmp_pivot = $user_badge_type->pivot->nb_repetitions;
                    $pivot = $tmp_pivot;
                    if ($tmp_pivot < $value) {
                        $user->badge_types()->updateExistingPivot($badge_type, ['nb_repetitions' => $value]);
                        $pivot = $value;
                    } else {
                        $update = FALSE;
                    }
                } else {
                    $user->badge_types()->attach($badge_type, ['nb_repetitions' => $value]);
                    $pivot = $value;
                }

                if ($update) {
                    // Manage badges.
                    $badges = Badge::where('badge_type_id', $badge_type->id)
                        ->where('nb_repetitions', '<=', $pivot)
                        ->pluck('badges.id')
                        ->toArray();

                    if (!empty($badges)) {
                        $user_badges = $user->badges()->where('badge_type_id', $badge_type->id)->get();

                        foreach ($user_badges as $user_badge) {
                            if (in_array($user_badge->id, $badges)) {
                                unset($badges[array_search($user_badge->id, $badges)]);
                            }
                        }
                    }

                    foreach ($badges as $badge) {
                        $user->badges()->attach($badge, ['datetime' => ($datetime)]);
                    }
                }

            }
        }**/

        // getATotalOfXPointsInChallenge.
        $badge_type = BadgeType::where('method', 'getATotalOfXPointsInChallenge')->get()->first();

        foreach ($users as $user) {
            $total = Game::where('user_id', $user->id)->sum('score')/5;
            if ($total !== 0) {
                $pivot = $total;
                $user_badge_type = $user->badge_types()->where('method', 'getATotalOfXPointsInChallenge')->get()->first();
                if (!is_null($user_badge_type)) {
                    $pivot = $total;
                    $user->badge_types()->updateExistingPivot($badge_type, ['nb_repetitions' => $pivot]);
                } else {
                    // Init badge type.
                    $user->badge_types()->attach($badge_type, ['nb_repetitions' => $pivot]);
                }

                // Manage badges.
                $badges = Badge::where('badge_type_id', $badge_type->id)
                    ->where('nb_repetitions', '<=', $pivot)
                    ->pluck('badges.id')
                    ->toArray();

                if (!empty($badges)) {
                    $user_badges = $user->badges()->where('badge_type_id', $badge_type->id)->get();

                    foreach ($user_badges as $user_badge) {
                        if (in_array($user_badge->id, $badges)) {
                            unset($badges[array_search($user_badge->id, $badges)]);
                        }
                    }
                }

                foreach ($badges as $badge) {
                    $user->badges()->attach($badge, ['datetime' => (new \DateTime())]);
                }
            }
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
