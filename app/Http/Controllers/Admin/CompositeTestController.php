<?php

namespace App\Http\Controllers\Admin;

use App\CompositeTest;
use App\Exercise;
use App\Http\Controllers\Controller;
use App\Services\FlashService;
use DaveJamesMiller\Breadcrumbs\Facades\Breadcrumbs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class CompositeTestController extends Controller
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
        $compositeTests = CompositeTest::orderBy('created_at', 'desc')->get();
        $tests = [];

        foreach ($compositeTests as $test) {
            $t['name'] = $test->name;
            $t['id'] = $test->id;
            $t['version'] = $test->version;
            $t['visible'] = $test->visible;
            $t['exercise_part1'] = Exercise::find($test->exercise_part1);
            $t['exercise_part2'] = Exercise::find($test->exercise_part2);
            $t['exercise_part3'] = Exercise::find($test->exercise_part3);
            $t['exercise_part4'] = Exercise::find($test->exercise_part4);
            $t['exercise_part5'] = Exercise::find($test->exercise_part5);
            $t['exercise_part6'] = Exercise::find($test->exercise_part6);
            $t['exercise_part7'] = Exercise::find($test->exercise_part7);

            $tests[] = $t;
        }

        $before_last_login = Auth::user()->before_last_login_at;
        $newTests = CompositeTest::select('id')->where('created_at', '>', $before_last_login)->pluck('id')->toArray();


        $common_data['active_trail'] = 'teacher-exercises';
        $common_data['header'] = [
            'title' => trans('composite-tests.list'),
            'breadcrumb' => Breadcrumbs::generate('composite-tests.index'),
            'theme' => 'colored-background',
        ];
        $common_data['flashs'] = FlashService::getMessages();

        return view('admin.composite-tests.index', compact('tests', 'newTests', 'common_data'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $exercises = Exercise::all();

        $common_data['active_trail'] = 'teacher-exercises';
        $common_data['header'] = [
            'title' => trans('composite-tests.add'),
            'breadcrumb' => Breadcrumbs::generate('composite-tests.create'),
            'theme' => 'colored-background',
        ];
        $common_data['flashs'] = FlashService::getMessages();

        return view('admin.composite-tests.create', compact('exercises', 'common_data'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $compositeTest = [
            'name' => addslashes($request->get('name')),
            'version' => addslashes($request->get('version')),
            'visible' => addslashes($request->get('visible')),
            'updated_at' => (new \DateTime()),
            'created_at' => (new \DateTime()),
        ];

        if (!is_null($request->get('reading_duration'))) {
            $compositeTest["reading_duration"] = addslashes($request->get('reading_duration'));
        }

        $last_ex_type = null;
        for($i = 1; $i < 8; $i++) {
            $var = 'exercise_part' . $i;
            $exercise = Exercise::find(addslashes($request->get($var)));

            if (!is_null($exercise)) {
                if ($last_ex_type == 'reading' && $exercise->part->type == 'listening') {
                    return redirect()->route('composite-tests.create')->withErrors([trans('composite-tests.exercises-order')]);
                }
                $last_ex_type = $exercise->part->type;

                $compositeTest[$var] = $exercise->id;
            }
        }

        CompositeTest::create($compositeTest);

        return redirect()->route('composite-tests.index')->with('success', trans('composite-tests.added'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $test = CompositeTest::find($id);

        if (is_null($test)) {
            abort(404);
        }

        $exercises = Exercise::all();

        $common_data['active_trail'] = 'teacher-exercises';
        $common_data['header'] = [
            'title' => trans('common.edit'),
            'breadcrumb' => Breadcrumbs::generate('composite-tests.edit', $test),
            'theme' => 'colored-background',
        ];
        $common_data['flashs'] = FlashService::getMessages();

        return view('admin.composite-tests.edit', compact('test', 'exercises', 'common_data'));
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
        $composite_test = CompositeTest::find($id);

        if (is_null($composite_test)) {
            abort(404);
        }

        $composite_test->name = $request->get('name');
        $composite_test->version = $request->get('version');
        $composite_test->visible = $request->get('visible');
        $composite_test->updated_at = (new \DateTime());

        if (!is_null($request->get('reading_duration'))) {
            $composite_test->reading_duration = addslashes($request->get('reading_duration'));
        } else {
            $composite_test->reading_duration = null;
        }

        $last_ex_type = null;
        for($i = 1; $i < 8; $i++) {
            $var = 'exercise_part' . $i;
            $exercise = Exercise::find(addslashes($request->get($var)));

            if (!is_null($exercise)) {
                if ($last_ex_type == 'reading' && $exercise->part->type == 'listening') {
                    return redirect()->route('composite-tests.edit', ['id' => $id])->withErrors([trans('composite-tests.exercises-order')]);
                }
                $last_ex_type = $exercise->part->type;
                $composite_test->$var = $exercise->id;
            } else {
                $composite_test->$var = null;
            }
        }

        $composite_test->save();

        return redirect()->route('composite-tests.index')->with('success', trans('composite-tests.updated'));
    }
}
