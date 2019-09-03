<?php

namespace App\Observers;

use App\Badge;
use App\BadgeType;
use App\Game;
use App\Level;

class GameObserver
{
    /**
     * Handle the game "created" event.
     *
     * @param  \App\Game  $game
     * @return void
     */
    public function created(Game $game)
    {
        $data = [
            'getXPointsOnChallengeMode' => $game->score / 5,
        ];

        $update = TRUE;
        $user = $game->user;

        foreach ($data as $key => $value) {
            $badge_type = BadgeType::where('method', $key)->get()->first();
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
                    $user->badges()->attach($badge, ['datetime' => (new \DateTime())]);
                }
            }
        }


        // getATotalOfXPointsInChallenge.
        $badge_type = BadgeType::where('method', 'getATotalOfXPointsInChallenge')->get()->first();
        $user_badge_type = $user->badge_types()->where('method', 'getATotalOfXPointsInChallenge')->get()->first();
        if (!is_null($user_badge_type)) {
            $pivot = $user_badge_type->pivot->nb_repetitions + $game->score/5;
            $user->badge_types()->updateExistingPivot($badge_type, ['nb_repetitions' => $pivot]);
        } else {
            // Init badge type.
            $tmp_total = 0;
            $games = $user->games()->get();

            foreach($games as $game) {
                $tmp_total += $game->score;
            }

            $pivot = $tmp_total/5;
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

    /**
     * Handle the game "updated" event.
     *
     * @param  \App\Game  $game
     * @return void
     */
    public function updated(Game $game)
    {
        //
    }

    /**
     * Handle the game "deleted" event.
     *
     * @param  \App\Game  $game
     * @return void
     */
    public function deleted(Game $game)
    {
        //
    }

    /**
     * Handle the game "restored" event.
     *
     * @param  \App\Game  $game
     * @return void
     */
    public function restored(Game $game)
    {
        //
    }

    /**
     * Handle the game "force deleted" event.
     *
     * @param  \App\Game  $game
     * @return void
     */
    public function forceDeleted(Game $game)
    {
        //
    }

    private function getXPointsOnChallengeMode(int $nb_repetitions) {

    }
}
