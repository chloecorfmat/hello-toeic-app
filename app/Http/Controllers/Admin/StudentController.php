<?php

namespace App\Http\Controllers\Admin;

use App\CompositeTest;
use App\CompositeTrial;
use DaveJamesMiller\Breadcrumbs\Facades\Breadcrumbs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\User;
use App\Trial;
use App\Game;
use App\Setting;

class StudentController extends Controller
{
    /**
     * Constructor.
     */
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware(['permission:users-manage'])->except('show');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Get all students.
        $students = User::whereHas("roles", function($q){ $q->where("name", "student"); })->get();

        $common_data['active_trail'] = 'teacher-users';
        $common_data['header'] = [
            'title' => trans('students.list'),
            'breadcrumb' => Breadcrumbs::generate('students.index'),
            'theme' => 'colored-background',
        ];

        return view(
            'admin.students.index',
            compact(
                'students',
                'common_data'
            )
        );

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
        $student = User::find($id);

        if (is_null($student)) {
            abort(404);
        }

        // Get all tests passed.
        $trials = Trial::where('user_id', '=', $student->id)
            ->orderBy('datetime', 'DESC')
            ->get();

        $composite_trials = CompositeTrial::where('user_id', '=', $student->id)
            ->orderBy('datetime', 'DESC')
            ->get();

        $composite_trials_names = [];

        // Get test name.
        foreach ($composite_trials as $trial) {
            $composite_trials_names[] = CompositeTest::find($trial->composite_test_id)->name;
        }

        $games = Game::where('user_id', '=', $student->id)
            ->orderBy('datetime', 'DESC')
            ->get();

        $scores = [
            'low' => Setting::where('key', 'config.score.low')->first()->value,
            'intermediate' => Setting::where('key', 'config.score.intermediate')->first()->value
        ];

        $common_data['active_trail'] = 'teacher-users';
        $common_data['header'] = [
            'title' => trans('app.profile'),
            'breadcrumb' => Breadcrumbs::generate('students.show', $student),
            'theme' => 'colored-background',
        ];

        return view(
            'admin.students.show',
            compact(
                'student',
                'trials',
                'composite_trials',
                'composite_trials_names',
                'games',
                'scores',
                'common_data'
            )
        );
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
