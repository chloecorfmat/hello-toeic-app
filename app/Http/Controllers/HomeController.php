<?php

namespace App\Http\Controllers;

use App\Lesson;
use App\Setting;
use App\Trial;
use App\CompositeTrial;
use App\Game;
use DaveJamesMiller\Breadcrumbs\Facades\Breadcrumbs;
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
        $this->middleware('role:admin')->only('admin');
        $this->middleware('role:teacher')->only('teacher');
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

        $lessons_access = [];

        foreach ($lessons as $lesson) {
            $lessons_access[$lesson->id] = CompositeTrial::where('composite_test_id', $lesson->composite_test_id)
                ->where('user_id', $user->id)
                ->where('datetime', '>', $lesson->start_datetime)
                ->where('datetime', '<', $lesson->end_datetime)
                ->count() > 0 ? 0 : 1;
        }

        $stats['composite-trials'] = CompositeTrial::where('user_id', $user->id)->count();
        $stats['trials'] = Trial::where('user_id', $user->id)->where('composite_trial_id', NULL)->count();
        $stats['games'] = Game::where('user_id', $user->id)->count();

        $datas = [
            'user' => $user,
            'trials' => $trials,
            'stats' => $stats,
        ];

        $badges = $user->badges;

        $common_data['header'] = [
            'title' => trans('app.dashboard'),
            'breadcrumb' => Breadcrumbs::generate('dashboard'),
        ];

        return view(
            'profile',
            compact(
                'datas',
                'stats',
                'scores',
                'lessons',
                'composite_trials',
                'lessons_access',
                'badges',
                'common_data'
            )
        );
    }

    /**
     * Contact page.
     */
    public function contact() {
        $common_data['header'] = [
            'title' => trans('app.contact'),
            'breadcrumb' => Breadcrumbs::generate('contact'),
        ];

        return view('contact', compact('common_data'));
    }

    public function teacher() {
        $common_data['header'] = [
            'title' => 'Teacher menu',
        ];

        return view('teacher', compact('common_data'));
    }

    public function admin() {
        $common_data['active_trail'] = 'admin';

        $common_data['header'] = [
            'title' => 'Admin menu',
        ];

        return view('admin', compact('common_data'));
    }
}
