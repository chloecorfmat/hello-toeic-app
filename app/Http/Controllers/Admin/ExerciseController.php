<?php

namespace App\Http\Controllers\Admin;

use App\Example;
use App\Http\Controllers\Controller;
use App\Part;
use App\Exercise;
use App\Question;
use App\Document;
use App\Services\ExerciseService;
use App\Services\StatsService;
use App\Setting;
use App\Trial;
use DaveJamesMiller\Breadcrumbs\Facades\Breadcrumbs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ExerciseController extends Controller
{
    /**
     * Constructor.
     */
    public function __construct()
    {
        $this->middleware(['permission:exercises-manage']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $exercises = Exercise::orderBy('created_at', 'desc')->get();

        $before_last_login = Auth::user()->before_last_login_at;
        $newExercises = Exercise::select('id')->where('created_at', '>', $before_last_login)->pluck('id')->toArray();

        $common_data['active_trail'] = 'teacher-exercises';
        $common_data['header'] = [
            'title' => trans('exercises.list'),
            'breadcrumb' => Breadcrumbs::generate('exercises.index'),
            'theme' => 'colored-background',
        ];

        return view('admin.exercises.index', compact('exercises', 'newExercises', 'common_data'));
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

        $questions = $exercise->questions;
        $part = $exercise->part;
        $stats_service = new StatsService();

        // Statistics.
        $min = -1;
        $max = 0;
        $scores = [];

        $constant_scores = [
            'low' => Setting::where('key', 'config.score.low')->first()->value,
            'intermediate' => Setting::where('key', 'config.score.intermediate')->first()->value
        ];


        $trials = Trial::where('exercise_id', $id)
            ->orderBy('datetime', 'DESC')
            ->get();

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

        $min = ($min == -1) ? 0 : $min;
        $statistics = [
            'min' => $min,
            'max' => $max,
            'average' => round($stats_service->average($scores), 2),
            'median' => round($stats_service->median($scores), 2),
            'standard_deviation' => round($stats_service->standard_deviation($scores), 2),
            'nb_trials' => count($scores),
        ];

        $common_data['active_trail'] = 'teacher-exercises';
        $common_data['header'] = [
            'title' => trans('common.details') . ': ' . $exercise->name,
            'theme' => 'colored-background',
        ];

        return view(
            'admin.exercises.show',
            compact(
                'exercise',
                'questions',
                'part',
                'statistics',
                'trials',
                'constant_scores',
                'common_data'
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
        $exercise = Exercise::find($id);

        if (is_null($exercise)) {
            abort(404);
        }

        $examples = Example::all();
        $common_data['active_trail'] = 'teacher-exercises';
        $common_data['header'] = [
            'title' => trans('common.edit'),
            'breadcrumb' => Breadcrumbs::generate('exercises.edit', $exercise),
            'theme' => 'colored-background',
        ];

        return view('admin.exercises.edit', compact('exercise', 'examples', 'common_data'));
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

        if (is_null($exercise)) {
            abort(404);
        }

        $exercise->name = $request->get('name');
        $exercise->visible = $request->get('visible');
        $exercise->updated_at = (new \DateTime());
        $exercise->example_id = $request->get('example') ?? NULL;

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

        if (is_null($exercise)) {
            abort(404);
        }

        $common_data['active_trail'] = 'teacher-exercises';
        $common_data['header'] = [
            'title' => trans('common.delete') . ': ' . $exercise->name,
            'breadcrumb' => Breadcrumbs::generate('exercises.delete', $exercise),
            'theme' => 'colored-background',
        ];

        return view('admin.exercises.delete', compact('exercise', 'common_data'));
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
            $examples = Example::all();

            $common_data['active_trail'] = 'teacher-exercises';
            $common_data['header'] = [
                'title' => trans('exercises.import_title') . ': ' . $part->name . ' (' . $part->version . ')',
                'breadcrumb' => Breadcrumbs::generate('exercises.import', $part),
                'theme' => 'colored-background',
            ];

            return view('admin.exercises.import', compact('part', 'examples', 'common_data'));
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
