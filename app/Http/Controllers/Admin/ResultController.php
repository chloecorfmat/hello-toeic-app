<?php

namespace App\Http\Controllers\Admin;

use App\CompositeTrial;
use App\Game;
use App\Setting;
use App\Trial;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ResultController extends Controller
{
    /**
     * Constructor.
     */
    public function __construct()
    {
        $this->middleware(['permission:results-see']);
    }

    /**
     * Show results.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('admin.results.index');
    }

    /**
     * Show composite trials.
     *
     * @return \Illuminate\Http\Response
     */
    public function compositeTests()
    {
        $scores = [
            'low' => Setting::where('key', 'config.score.low')->first()->value,
            'intermediate' => Setting::where('key', 'config.score.intermediate')->first()->value
        ];

        $composite_trials = CompositeTrial::orderBy('datetime', 'DESC')
            ->get();

        return view('admin.results.composite-tests', compact('composite_trials', 'scores'));
    }

    /**
     * Show trials.
     *
     * @return \Illuminate\Http\Response
     */
    public function exercises()
    {
        $scores = [
            'low' => Setting::where('key', 'config.score.low')->first()->value,
            'intermediate' => Setting::where('key', 'config.score.intermediate')->first()->value
        ];

        $trials = Trial::orderBy('datetime', 'DESC')
            ->get();

        return view('admin.results.exercises', compact('trials', 'scores'));
    }

    /**
     * Show games.
     *
     * @return \Illuminate\Http\Response
     */
    public function games()
    {
        $games = Game::orderBy('datetime', 'DESC')
            ->get();

        return view('admin.results.games', compact('games'));
    }
}
