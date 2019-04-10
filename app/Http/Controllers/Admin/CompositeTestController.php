<?php

namespace App\Http\Controllers\Admin;

use App\CompositeTest;
use App\Exercise;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CompositeTestController extends Controller
{
    public function __construct()
    {
        $this->middleware(['role:teacher']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $compositeTests = CompositeTest::all();
        $tests = [];

        foreach ($compositeTests as $test) {
            $t['name'] = $test->name;
            $t['id'] = $test->id;
            $t['version'] = $test->version;
            $t['exercise_part1'] = Exercise::find($test->exercise_part1);
            $t['exercise_part2'] = Exercise::find($test->exercise_part2);
            $t['exercise_part3'] = Exercise::find($test->exercise_part3);
            $t['exercise_part4'] = Exercise::find($test->exercise_part4);
            $t['exercise_part5'] = Exercise::find($test->exercise_part5);
            $t['exercise_part6'] = Exercise::find($test->exercise_part6);
            $t['exercise_part7'] = Exercise::find($test->exercise_part7);

            $tests[] = $t;
        }

        return view('admin.composite-tests.index', compact('tests'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $exercises = Exercise::all();
        return view('admin.composite-tests.create', compact('exercises'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $compositeTest = [
            'name' => addslashes($request->get('name')),
            'version' => addslashes($request->get('version')),
        ];


        for($i = 1; $i < 8; $i++) {
            $exercise = Exercise::find(addslashes($request->get('part_' . $i)));

            if (!is_null($exercise)) {
                $compositeTest['exercise_part' . $i] = $exercise->id;
            }
        }

        CompositeTest::create($compositeTest);

        return redirect()->route('composite-tests.index')->with('success', 'L\'exercice composé a été créé.');
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
