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
            'getXPointsOnChallengeMode' => $game->score/5,
        ];

        $update = TRUE;

        $user = $game->user;


        $user_badge_types = $user->badge_types()->get();

        foreach ($user_badge_types as $badge_type) {
            if (in_array($badge_type->method, array_keys($data))) {
                $tmp_pivot = $badge_type->pivot->nb_repetitions;
                $pivot = $tmp_pivot;
                if ($tmp_pivot < $data[$badge_type->method]) {
                    $user->badge_types()->updateExistingPivot($badge_type, ['nb_repetitions' => $data[$badge_type->method]]);
                    $pivot = $badge_type->method;
                } else {
                    $update = FALSE;
                }

            } else {
                $user->badge_types()->attach($badge_type, ['nb_repetitions' => $data[$badge_type->method]]);
                $pivot = $data[$badge_type->method];
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

                $user->save();
            }
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
