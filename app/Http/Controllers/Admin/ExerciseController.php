<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Part;
use App\Exercise;
use App\Question;
use App\Document;
use App\Services\ExerciseService;
use Illuminate\Http\Request;

class ExerciseController extends Controller
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
        $exercises = Exercise::all();
        return view('admin.exercises.index', compact('exercises'));
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

    /**
     * Import the specified resource to storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function import($id = null)
    {
        if (is_null($id)) {
            return redirect()->route('parts.index')->with('warning', 'You need to link an exercise to a part.');
        } else {
            $part = Part::find($id);
            return view('admin.exercises.import', compact('part'));
        }
    }

    /**
     * Store the import resources to storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function storeImport(Request $request)
    {
        $success = (new ExerciseService())->import($request);

        if ($success) {
            return redirect()->route('exercises.index')->with('success', 'Exercise has been imported.');
        }

        return redirect()->route('exercises.index')->with('error', 'An error occurred.');
    }
}
