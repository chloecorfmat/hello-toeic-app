<?php

namespace App\Http\Controllers;

use App\CompositeTrial;
use App\Correction;
use App\Lesson;
use App\Setting;
use App\Trial;
use Illuminate\Http\Request;
use App\CompositeTest;
use App\Exercise;
use Illuminate\Support\Facades\Auth;
use wapmorgan\Mp3Info\Mp3Info;

class CompositeTestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $compositeTests = CompositeTest::where('visible', '1')->get();
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

        return view('composite-tests.index', compact('tests'));
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
        $exercises = [
            'exercise_part1',
            'exercise_part2',
            'exercise_part3',
            'exercise_part4',
            'exercise_part5',
            'exercise_part6',
            'exercise_part7',
        ];

        $user = Auth::user();

        $questions = [];
        $source = '';
        $datasources_ar = [];
        $listening_duration = 0;

        $test = CompositeTest::find($id);

        if (is_null($test)) {
            abort(404);
        }

        if (is_null($user)) {
            abort(403);
        }


        // Check if user can see the test.
        if (
            !$test->visible &&
            !$user->hasRole('teacher')

        ) {
            $datetime = (new \DateTime())->format('Y-m-d H:i:s');
            $groups = $user->groups()->get();
            $gids = [];

            foreach ($groups as $group) {
                $gids[] = $group->id;
            }

            $lessons = Lesson::whereIn('group_id', $gids)
                ->where('start_datetime', '<=', $datetime)
                ->where('end_datetime', '>=', $datetime)
                ->where('composite_test_id', $test->id)
                ->count();

            if ($lessons == 0) {
                // User cannot access to this test.
                abort(403);
            }
        }


        foreach ($exercises as $exercise) {
            $ex = Exercise::find($test->$exercise);

            if (!is_null($ex)) {
                $qs = $ex->questions()->orderBy('number')->get();

                foreach ($qs as $question) {
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
                $datasources = implode(', ', $datasources_ar);

                $questions[$exercise]['exercise'] = $ex;
                $questions[$exercise]['part'] = $ex->part;
                $questions[$exercise]['questions'] = $qs;
            }
        }

        if (!is_null($test->reading_timer)) {
            $reading_duration = $test->reading_timer;
        } else {
            $reading_duration = Setting::where('key', 'config.default.reading.duration')->first()->value;
        }

        $datas = [
            'test' => $test,
            'questions' => $questions,
        ];


        return view('composite-tests.show', compact('datas', 'datasources', 'source', 'listening_duration', 'reading_duration'));
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
        $keys_ex = [
            'exercise_part1',
            'exercise_part2',
            'exercise_part3',
            'exercise_part4',
            'exercise_part5',
            'exercise_part6',
            'exercise_part7',
        ];

        $user_answers = $request->all();
        $composite_test = CompositeTest::findOrfail($id);
        $user_id = \Auth::user()->id;

        // Create composite trial.
        $composite_trial = CompositeTrial::create([
            'score' => 0,
            'datetime' => now(),
            'user_id' => $user_id,
            'composite_test_id' => $id,
        ]);

        $composite_score = 0;

        foreach ($keys_ex as $key) {
            $ex_id = $composite_test->$key;
            $exercise = Exercise::find($ex_id);

            if (!is_null($exercise)) {
                // Create trials.
                $trial = Trial::create([
                    'score' => 0,
                    'datetime' => now(),
                    'exercise_id' => $ex_id,
                    'user_id' => $user_id,
                    'composite_trial_id' => $composite_trial->id,
                ]);

                $questions = $exercise->questions()->orderBy('number')->get();
                $score = 0;

                foreach ($questions as $question) {
                    $answer = $question->answer->id;
                    if (
                        isset($user_answers['e' . $ex_id . '-q' . $question->id]) &&
                        $answer == $user_answers['e' . $ex_id . '-q' . $question->id]
                    ) {
                        $state = 1;
                        $score = $score + 5;
                        $composite_score = $composite_score + 5;
                    } else {
                        $state = 0;
                    }

                    Correction::create([
                        'question_id' => $question->id,
                        'proposal_id' => $user_answers['e' . $ex_id . '-q' . $question->id] ?? null,
                        'trial_id' => $trial->id,
                        'state' => $state,
                    ]);
                }

                $trial->setAttribute('score', $score)->save();
            }
        }

        $composite_trial->setAttribute('score', $composite_score)->save();
        return redirect('/profile')->with('success', trans('messages.get-x-points', ['number' => $composite_score]));
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
