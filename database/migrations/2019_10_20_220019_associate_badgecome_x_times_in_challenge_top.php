<?php

use App\Badge;
use App\BadgeType;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AssociateBadgecomeXTimesInChallengeTop extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $badge_type = BadgeType::where('method', 'comeXTimesInChallengeTop')->get()->first();
        $users = $badge_type->users()->get();


        foreach ($users as $user) {
            $pivot = $user->badge_types()->where('method', 'comeXTimesInChallengeTop')->first()->pivot->nb_repetitions;
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

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('challenge_top', function (Blueprint $table) {
            //
        });
    }
}
