<?php

namespace App\Http\Controllers\Admin;

use App\CompositeTrial;
use App\Game;
use App\Services\FlashService;
use App\Setting;
use App\Trial;
use DaveJamesMiller\Breadcrumbs\Facades\Breadcrumbs;
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
        $common_data['active_trail'] = 'teacher-results';
        $common_data['header'] = [
            'title' => trans('app.results'),
            'breadcrumb' => Breadcrumbs::generate('results.index'),
            'buttons' => [
                [
                    'title' => trans('exercises.results'),
                    'url' => route('results.exercises'),
                ],
                [
                    'title' => trans('composite-tests.results'),
                    'url' => route('results.composite-tests'),
                ],
                [
                    'title' => trans('games.results'),
                    'url' => route('results.games'),
                ],
            ],
            'theme' => 'colored-background',
        ];
        $common_data['flashs'] = FlashService::getMessages();

        return view('admin.results.index', compact('common_data'));
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

        $common_data['active_trail'] = 'teacher-results';
        $common_data['header'] = [
            'title' => trans('composite-tests.results'),
            'breadcrumb' => Breadcrumbs::generate('results.composite-tests'),
            'theme' => 'colored-background',
        ];
        $common_data['flashs'] = FlashService::getMessages();

        return view(
            'admin.results.composite-tests',
            compact(
                'composite_trials',
                'scores',
                'common_data'
            )
        );
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

        $common_data['active_trail'] = 'teacher-results';
        $common_data['header'] = [
            'title' => trans('exercises.results'),
            'breadcrumb' => Breadcrumbs::generate('results.exercises'),
            'theme' => 'colored-background',
        ];
        $common_data['flashs'] = FlashService::getMessages();

        return view(
            'admin.results.exercises',
            compact(
                'trials',
                'scores',
                'common_data'
            )
        );
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

        $common_data['active_trail'] = 'teacher-results';
        $common_data['header'] = [
            'title' => trans('games.results'),
            'breadcrumb' => Breadcrumbs::generate('results.games'),
            'theme' => 'colored-background',
        ];
        $common_data['flashs'] = FlashService::getMessages();

        return view(
            'admin.results.games',
            compact(
                'games',
                'common_data'
            )
        );
    }
}
