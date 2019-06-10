<?php

namespace App\Http\Controllers\Admin;

use App\Explanation;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ExplanationController extends Controller
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
        $explanations = Explanation::orderBy('title')->get();
        return view('admin.explanations.index', compact('explanations'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.explanations.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Explanation::create([
            'title' => $request->get('title'),
            'explanation' => $request->get('explanation'),
        ]);

        return redirect()->route('explanations.index')->with('success', 'Explanation has been created.');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $explanation = Explanation::find($id);
        return view('admin.explanations.show', compact('explanation'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $explanation = Explanation::find($id);
        return view('admin.explanations.edit', compact('explanation'));
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
        $explanation = Explanation::find($id);

        $explanation->title = $request->get('title');
        $explanation->explanation = $request->get('explanation');

        $explanation->save();

        return redirect()->route('explanations.index')->with('success', 'Explanation has been updated.');
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
