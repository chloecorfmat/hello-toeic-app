<?php

namespace App\Http\Controllers;

use App\Services\Mp3Service;
use Illuminate\Http\Request;
use App\Exercise;
use App\Trial;
use App\Correction;

class ExerciseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $exercises = Exercise::all();
        return view('exercises.index', compact('exercises'));
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
        $exercise = Exercise::find($id);

        if (is_null($exercise)) {
            abort(404);
        }

        $questions = $exercise->questions()->orderBy('number')->get();

        if (!$questions->count()) {
            abort(404);
        }

        $source = '';
        $datasources_ar = [];
        $listening_duration = 0;

        foreach ($questions as $question) {
            $documents = $question->documents;

            foreach ($documents as $document) {
                if ($document->type === 'audio') {
                    if (file_exists('storage/' . $document->url)) {
                        if (empty($source)) {
                            $source = url('storage/' . $document->url);
                        }

                        if (!in_array(url('storage/' . $document->url), $datasources_ar)) {
                            $filename = url('storage/' . $document->url);
                            $datasources_ar[] = $filename;

                            $m = new Mp3Service('storage/' . $document->url);
                            $a = $m->get_metadata();

                            if ($a['Encoding']=='Unknown')
                                $len = 0;
                            else if ($a['Encoding']=='VBR')
                                $len= $a['Length'];
                            else if ($a['Encoding']=='CBR')
                                $len= $a['Length'];

                            $listening_duration += $len;
                        }
                    }
                }
            }
        }

        $datasources = implode(', ', $datasources_ar);

        return view('exercises.show', compact('exercise', 'questions', 'datasources', 'source', 'listening_duration'));
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
        $score = 0;
        $exercise = Exercise::find($id);
        $questions = $exercise->questions()->orderBy('number')->get();
        $user_answers = $request->all();

        $user = \Auth::user();
        $user_id = $user->id;
        $trial_entity = Trial::create([
            'exercise_id' => $id,
            'user_id' => $user_id,
            'score' => 0,
            'datetime' => now(),
        ]);

        foreach ($questions as $key => $question) {
            $answer = $question->answer->id;
            if (isset($user_answers[$key]) && $answer == $user_answers[$key]) {
                $state = 1;
                $score = $score + 5;
            } else {
                $state = 0;
            }

            Correction::create([
                'question_id' => $question->id,
                'proposal_id' => $user_answers[$key] ?? null,
                'trial_id' => $trial_entity->id,
                'state' => $state,
            ]);
        }

        $trial_entity->setAttribute('score', $score)->save();

        return redirect('/profile')->with('success', 'You get ' . $score . ' points.');
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
