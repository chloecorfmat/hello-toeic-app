<?php

namespace App\Http\Controllers;

use App\CompositeTrial;
use App\Game;
use App\Trial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;

class GDPRController extends Controller
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

    /**
     * Export personal data to JSON.
     *
     * @param Request $request
     * @return mixed
     */
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

    /**
     * Collect consent before showing page.
     *
     * @param Request $request
     */
    public function collectConsent(Request $request) {
        return view('gdpr.collect-consent');
    }

    /**
     * Collect consent before showing page.
     *
     * @param Request $request
     */
    public function validateConsent(Request $request) {
        $user = Auth::user();
        $user->consent_at = (new \DateTime());
        $user->save();

        if ($request->session()->has('redirect')) {
            return redirect($request->session()->get('redirect'));
        } else {
            return redirect()->route('profile');
        }
    }

    /**
     * Collect consent before showing page.
     *
     * @param Request $request
     */
    public function refuseConsent(Request $request) {
        $user = Auth::user();
        $user->status = 0;
        $user->save();

        return redirect()->route('blockedAccount');
    }
}
