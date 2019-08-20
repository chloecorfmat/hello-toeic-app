<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Part;
use Illuminate\Http\Request;

class PartController extends Controller
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
        $parts = Part::orderBy('version')->get();
        return view('admin.parts.index', compact('parts'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.parts.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $texts = $request->get('texts') === 'true' ? 1 : 0;
        $files = $request->get('files') === 'true' ? 1 : 0;
        $inline = $request->get('inline') === 'true' ? 1 : 0;
        $questions = $request->get('questions') === 'true' ? 1 : 0;

        if ($inline &&
            (!$texts || $request->get('type') !== "reading"))
        {
            return redirect()->route('parts.create')->withErrors([trans('common.inline_constraint')]);
        }

        Part::create([
            'name' => $request->get('name'),
            'version' => $request->get('version'),
            'type' => $request->get('type'),
            'description' => addslashes($request->get('description')),
            'nb_questions' => $request->get('nb-questions'),
            'texts' => $texts,
            'files' => $files,
            'questions' => $questions,
            'nb_answers' => $request->get('nb-answers'),
            'inline' => $inline,
            'duration' => $request->get('duration'),
        ]);

        return redirect()->route('parts.index')->with('success', trans('parts.added'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $part = Part::find($id);
        return view('admin.parts.show', compact('part'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $part = Part::find($id);
        return view('admin.parts.edit', compact('part'));
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
        $part = Part::find($id);

        if (($request->get('inline') === 'true') &&
            (($request->get('texts') !== 'true') || $request->get('type') !== "reading"))
        {
            return redirect()->route('parts.edit', ['id' => $id])->withErrors([trans('common.inline_constraint')]);
        }

        $part->name = $request->get('name');
        $part->version = $request->get('version');
        $part->type = $request->get('type');
        $part->description = $request->get('description');
        $part->nb_questions = $request->get('nb-questions');
        $part->texts = $request->get('texts') === 'true' ? 1 : 0;
        $part->inline = $request->get('inline') === 'true' ? 1 : 0;
        $part->files = $request->get('files') === 'true' ? 1 : 0;
        $part->questions = $request->get('questions') === 'true' ? 1 : 0;
        $part->nb_answers = $request->get('nb-answers');
        $part->duration = $request->get('duration');

        $part->save();

        return redirect()->route('parts.index')->with('success', trans('parts.updated'));
    }


    /**
     * Display a confirmation form before destroy model.
     *
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $part = Part::find($id);
        return view('admin.parts.delete', compact('part'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $part = Part::find($id);
        $count = $part->tests()->count();

        if ($count == 0) {
            $part->delete();
            return redirect()->route('parts.index')->with('success', trans('parts.deleted'));
        }

        return redirect()->route('parts.index')->with('error', trans('parts.delete_constraint'));
    }
}
