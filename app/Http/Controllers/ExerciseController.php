<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Exercise;
use App\Trial;
use App\Correction;
use Illuminate\Support\Facades\Auth;

use wapmorgan\Mp3Info\Mp3Info;

class ExerciseController extends Controller
{
    public function __construct()
    {
        $this->middleware(['permission:test-execute'])->only('show', 'update');
        $this->middleware(['permission:test-list'])->only('index');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $exercises = Exercise::where('visible', 1)->get();
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
        $user = Auth::user();
        $exercise = Exercise::find($id);

        if (is_null($exercise)) {
            abort(404);
        }

        if (!$exercise->visible &&
            !$user->hasRole('teacher')
        ) {
            abort(403);
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

                            $audio = new Mp3Info('storage/' . $document->url);
                            $listening_duration += $audio->duration;
                        }
                    }
                }
            }
        }

        $reading_duration = $exercise->part->duration;

        if ($user->disabilities()->count() > 0) {
            $reading_duration = $reading_duration*(4/3);
        }

        $datasources = implode(', ', $datasources_ar);

        $part = $exercise->part; // Finally, an exercise has only one part.
        return view(
            'exercises.show',
            compact(
                'exercise',
                'questions',
                'datasources',
                'source',
                'listening_duration',
                'reading_duration',
                'part'
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
        $score = 0;
        $exercise = Exercise::findOrFail($id);
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

            if ($state) {
                $question->difficulty_rate = ((($question->difficulty_rate) * $question->trials_nb) + 1) / ($question->trials_nb+1);
            } else {
                $question->difficulty_rate = (($question->difficulty_rate) * $question->trials_nb) / ($question->trials_nb+1);
            }

            $question->trials_nb = $question->trials_nb + 1;
            $question->save();
        }

        $trial_entity->setAttribute('score', $score)->save();

        return redirect('/profile')->with('success', trans('messages.get-x-points', ['number' => $score]));
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
