<?php

namespace App\Http\Controllers\Admin;

use App\Example;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Webpatser\Sanitize\Sanitize;

class ExampleController extends Controller
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
        $examples = Example::all();
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
        if (
            $request->file('image')->getClientMimeType() === 'image/png' ||
            $request->file('image')->getClientMimeType() === 'image/jpeg'
        ) {
            $uid = uniqid();

            $new_file = $uid
                . '_'
                . Sanitize::string($request->get('name'))
                . '.'
                . $request->file('image')->extension();

            rename($request->file('image'), './storage/examples/' . $new_file);

            Example::create([
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
     * @param  \App\Example  $exerciseExample
     * @return \Illuminate\Http\Response
     */
    public function show(Example $exerciseExample)
    {
        return redirect()->route('examples.index');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Example  $exerciseExample
     * @return \Illuminate\Http\Response
     */
    public function edit(Example $exerciseExample)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Example  $exerciseExample
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Example $exerciseExample)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Example  $exerciseExample
     * @return \Illuminate\Http\Response
     */
    public function destroy(Example $exerciseExample)
    {
        //
    }
}
