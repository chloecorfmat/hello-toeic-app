<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Part;
use App\Exercise;
use App\Question;
use App\Document;
use App\Services\ExerciseService;
use App\Services\StatsService;
use App\Trial;
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
        $exercise = Exercise::find($id);
        $questions = $exercise->questions;
        $part = $exercise->part;
        $stats_service = new StatsService();

        // Statistics.
        $min = -1;
        $max = 0;
        $scores = [];

        $trials = Trial::where('exercise_id', $id)->get();

        foreach ($trials as $trial){
            $score = $trial->score;

            if ($score < $min || $min === -1) {
                $min = $score;
            }

            if ($score > $max) {
                $max = $score;
            }

            $scores[] = $score;
        }

        $min = -1 ? 0 : $min;
        $statistics = [
            'min' => $min,
            'max' => $max,
            'average' => round($stats_service->average($scores), 2),
            'median' => round($stats_service->median($scores), 2),
            'standard_deviation' => round($stats_service->standard_deviation($scores), 2),
            'nb_trials' => count($scores),
        ];

        return view('admin.exercises.show', compact('exercise', 'questions', 'part', 'statistics'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $exercise = Exercise::find($id);
        return view('admin.exercises.edit', compact('exercise'));
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
        $exercise = Exercise::find($id);

        $exercise->name = $request->get('name');
        $exercise->visible = $request->get('visible');
        $exercise->updated_at = (new \DateTime());

        $exercise->save();

        return redirect()->route('exercises.index')->with('success', trans('exercises.updated'));
    }

    /**
     * Display a confirmation form before destroy model.
     *
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $exercise = Exercise::find($id);
        return view('admin.exercises.delete', compact('exercise'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $success = (new ExerciseService())->delete($id, $request->get('status') ? true : false);

        if ($success) {
            return redirect()->route('exercises.index')->with('success', trans('exercises.deleted'));
        }

        return redirect()->route('exercises.index')->with('error', trans('messages.error-occured'));
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
            return redirect()->route('parts.index')->with('warning', trans('exercises.import-part_constraint'));
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
        // TRUE if success, string with error message if not.
        $success = (new ExerciseService())->import($request);

        if ($success === TRUE) {
            return redirect()->route('exercises.index')->with('success', trans('exercises.imported'));
        }

        return redirect()->route('exercises.import', ['id' => $request->get('part')])->withErrors([$success]);
    }
}
