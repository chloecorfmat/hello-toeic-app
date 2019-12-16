<?php

namespace App\Http\Controllers;

use App\Services\FlashService;
use DaveJamesMiller\Breadcrumbs\Facades\Breadcrumbs;
use Illuminate\Http\Request;
use App\CompositeTrial;
use App\CompositeTest;

class CompositeTrialController extends Controller
{
    /**
     * Constructor.
     */
    public function __construct()
    {
        $this->middleware(['permission:tests-achieve']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = \Auth::user();

        $trials = CompositeTrial::where('user_id', '=', $user->id)
            ->orderBy('datetime', 'DESC')
            ->get();

        $names = [];

        // Get test name.
        foreach ($trials as $trial) {
            $names[] = CompositeTest::find($trial->composite_test_id)->name;
        }

        $common_data['active_trail'] = 'student-composite-tests';
        $common_data['header'] = [
            'title' => trans('composite-tests.results_last'),
            'subtitle' => '(' . $trials->count() . ' ' . trans('app.results') . ')',
            'breadcrumb' => Breadcrumbs::generate('student.composite-tests.index'),
            'theme' => 'colored-background',
        ];
        $common_data['flashs'] = FlashService::getMessages();

        return view('composite-trials.index', compact('trials', 'user', 'names', 'common_data'));
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
        //
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
