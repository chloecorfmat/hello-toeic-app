<?php

namespace App\Tasks;

use App\Badge;
use App\BadgeType;
use App\User;
use Illuminate\Support\Facades\DB;

/**
 * Class BadgesTask
 * @package App\Tasks
 */

class BadgesTask {
    public function __invoke() {
        // stayXDaysInChallengeTop.
        $key = "stayXDaysInChallengeTop";
        $badge_type = BadgeType::where('method', $key)->get()->first();
        $users_id = [];
        $users_top = DB::table('users')
            ->join('games', 'games.user_id', '=', 'users.id')
            ->orderBy('games.score', 'desc')
            ->limit(10)
            ->select('users.id', 'users.name')
            ->get()
            ->unique();

        foreach ($users_top as $u) {
            $user = User::find($u->id);
            $users_id[] = $u->id;

            $user_badge_type = $user->badge_types()->where('method', $key)->get()->first();

            if (!is_null($user_badge_type)) {
                $pivot = $user_badge_type->pivot->nb_repetitions + 1;
                $user->badge_types()->updateExistingPivot($badge_type, ['nb_repetitions' => $pivot]);
            } else {
                // Init badge_type.
                $pivot = 1;
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

            if (!empty($badges)) {
                foreach ($badges as $badge) {
                    $user->badges()->attach($badge, ['datetime' => (new \DateTime())]);
                }
            }
        }

        $users_badge_type = $badge_type->users()->get();

        if (!empty($users_badge_type)) {
            foreach ($users_badge_type as $user) {
                if (!in_array($user->id, $users_id)) {
                    $user->badge_types()->updateExistingPivot($badge_type, ['nb_repetitions' => 0]);
                }
            }
        }
    }
}
