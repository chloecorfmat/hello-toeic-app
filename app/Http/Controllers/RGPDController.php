<?php

namespace App\Http\Controllers;

use App\CompositeTrial;
use App\Exercise;
use App\Game;
use App\Trial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RGPDController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function personalData(Request $request)
    {
        $user = Auth::user();


        // Manage groups.
        $groups = $user->groups()->get();
        $arr_groups = $groups->toArray();

        foreach ($groups as $key => $group) {
            $arr_groups[$key]['lessons'] = $group->lessons()->get()->toArray();
        }

        // Manage single exercises.
        $exercises = Trial::where('user_id', $user->id)
            ->where('composite_trial_id', NULL)
            ->get();
        $arr_exercises = $exercises->toArray();
        foreach ($exercises as $key => $exercise) {
            $arr_exercises[$key]['corrections'] = $exercise->corrections()->get()->toArray();
        }

        // Manage composite tests.
        $composites = CompositeTrial::where('user_id', $user->id)
            ->get();

        $arr_composites = $composites->toArray();

        foreach ($composites as $key_composite => $composite) {
            $trials = $composite->trials()->get();

            $arr_trials = $trials->toArray();

            foreach ($trials as $key_trial => $trial) {
                $arr_trials[$key_trial]['corrections'] = $trial->corrections()->get()->toArray();
            }

            $arr_composites[$key_composite]['exercises'] = $arr_trials;
        }

        // Manage games.
        $games = Game::where('user_id', $user->id)->get();

        // Manage user.
        $array = $user->toArray();
        $array['disabilities'] = $user->disabilities()->get()->toArray();
        $array['roles'] = $user->roles()->get()->toArray();
        $array['groups'] = $arr_groups;

        // Manage badges.
        $array['badges'] = $user->badges()->get()->toArray();
        $array['badges_progression'] = $user->badge_types()->get()->toArray();

        $array['exercises'] = $arr_exercises;
        $array['composite_tests'] = $arr_composites;
        $array['games'] = $games;

        return response()->json($array);
    }
}
