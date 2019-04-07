<?php

namespace App\Http\Controllers;

use App\Services\Mp3Service;
use Illuminate\Http\Request;
use App\CompositeTest;
use App\Exercise;

class CompositeTestController extends Controller
{
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

        $questions = [];
        $source = '';
        $datasources_ar = [];
        $listening_duration = 0;

        $test = CompositeTest::find($id);

        if (is_null($test)) {
            abort(404);
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

                $questions[$exercise]['part'] = $ex->part;
                $questions[$exercise]['questions'] = $qs;
            }
        }

        $datas = [
            'test' => $test,
            'questions' => $questions,
        ];


        return view('composite-tests.show', compact('datas', 'datasources', 'source', 'listening_duration'));
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
