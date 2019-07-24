<?php

namespace App\Http\Controllers;

use App\Lesson;
use App\Setting;
use App\Trial;
use App\CompositeTrial;
use App\Game;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware(['permission:test-execute'])->only('train');
    }

    /**
     * Show the user profile dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function home() {
        return redirect()->route('profile');
    }

    /**
     * Show the user profile dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $datetime = (new \DateTime())->format('Y-m-d H:i:s');
        $user = \Auth::user();

        $scores = [
            'low' => Setting::where('key', 'config.score.low')->first()->value,
            'intermediate' => Setting::where('key', 'config.score.intermediate')->first()->value
        ];

        $trials = Trial::where('user_id', '=', $user->id)
            ->where('composite_trial_id', NULL)
            ->orderBy('datetime', 'DESC')
            ->get();

        $composite_trials = CompositeTrial::where('user_id', '=', $user->id)
            ->orderBy('datetime', 'DESC')
            ->get();

        $groups = $user->groups()->get();
        $gids = [];

        foreach ($groups as $group) {
            $gids[] = $group->id;
        }

        $lessons = Lesson::whereIn('group_id', $gids)
            ->where('start_datetime', '<=', $datetime)
            ->where('end_datetime', '>=', $datetime)
            ->get();

        foreach ($lessons as $lesson) {
            // @TODO : check if user already take this lesson.
        }

        $stats['composite-trials'] = CompositeTrial::where('user_id', $user->id)->count();
        $stats['trials'] = Trial::where('user_id', $user->id)->where('composite_trial_id', NULL)->count();
        $stats['games'] = Game::where('user_id', $user->id)->count();

        $datas = [
            'user' => $user,
            'trials' => $trials,
            'stats' => $stats,
        ];

        return view('profile', compact('datas', 'stats', 'scores', 'lessons', 'composite_trials'));
    }
}
