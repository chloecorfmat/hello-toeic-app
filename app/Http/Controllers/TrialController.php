<?php

namespace App\Http\Controllers;

use App\Exercise;
use App\Trial;
use Illuminate\Http\Request;

class TrialController extends Controller
{

    public function __construct()
    {
        $this->middleware(['permission:exercises-achieve'])->except(['show']);
        $this->middleware(['permission:exercises-achieve|exercises-manage'])->only(['show']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = \Auth::user();

        $trials = Trial::where('user_id', '=', $user->id)
            ->orderBy('datetime', 'DESC')
            ->get();

        return view('trials.index', compact('trials', 'user'));

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = \Auth::user();
        $trial = Trial::findOrFail($id);

        if (!$user->hasRole('teacher') && $trial->user->id !== $user->id ) {
            abort(403);
        }

        $datas['trial'] = $trial;

        $datas['max_score'] = count($trial->test()->get()[0]->questions)*5;

        // Global stats.
        $stats = [];
        $test_id = $trial->test->id;

        $exercise = Exercise::find($test_id);

        return view('trials.show', compact('datas', 'stats', 'exercise'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
