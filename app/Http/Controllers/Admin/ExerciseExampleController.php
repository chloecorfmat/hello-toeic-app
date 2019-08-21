<?php

namespace App\Http\Controllers\Admin;

use App\ExerciseExample;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Webpatser\Sanitize\Sanitize;

class ExerciseExampleController extends Controller
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
        $examples = ExerciseExample::all();
        return view('admin.exercises.examples.index', compact('examples'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.exercises.examples.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if ($request->file('image')->getClientMimeType() === 'image/png') {
            $uid = uniqid();

            $new_file = $uid
                . '_'
                . Sanitize::string($request->get('name'))
                . '.'
                . $request->file('image')->extension();

            rename($request->file('image'), './storage/examples/' . $new_file);

            ExerciseExample::create([
                'name' => $request->get('name'),
                'image' => './examples/' . $new_file,
            ]);

            return redirect()->route('examples.index')->with('success', trans('examples.added'));
        }


        return redirect()->route('examples.create')->withErrors([trans('form.image-constraints')]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ExerciseExample  $exerciseExample
     * @return \Illuminate\Http\Response
     */
    public function show(ExerciseExample $exerciseExample)
    {
        return redirect()->route('examples.index');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ExerciseExample  $exerciseExample
     * @return \Illuminate\Http\Response
     */
    public function edit(ExerciseExample $exerciseExample)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ExerciseExample  $exerciseExample
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ExerciseExample $exerciseExample)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ExerciseExample  $exerciseExample
     * @return \Illuminate\Http\Response
     */
    public function destroy(ExerciseExample $exerciseExample)
    {
        //
    }
}
