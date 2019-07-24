<?php

namespace App\Http\Controllers\Admin;

use App\CompositeTest;
use App\CompositeTrial;
use App\Group;
use App\Lesson;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class LessonController extends Controller
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
        $lessons = Lesson::orderBy('start_datetime')->get();
        return view('admin.lessons.index', compact('lessons'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $groups = Group::orderBy('name')->get();
        $tests = CompositeTest::orderBy('name')->get();
        return view('admin.lessons.create', compact('groups', 'tests'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $start = new \DateTime($request->get('start'));
        $end = new \DateTime($request->get('end'));

        $interval = $start->diff($end);

        if (!$interval->invert) {
            Lesson::create([
                'name' => $request->get('name'),
                'start_datetime' => $request->get('start'),
                'end_datetime' => $request->get('end'),
                'group_id' => $request->get('group'),
                'composite_test_id' => $request->get('test'),
            ]);

            return redirect()->route('lessons.index')->with('success', trans('lessons.added'));
        } else {
            return redirect()->route('lessons.create')->withErrors([trans('form.start-end-date_constraint')]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $lesson = Lesson::find($id);
        $students = Group::find($lesson->group_id)->users()->get();

        $results = [];

        foreach ($students as $student) {
            $composite_trial = CompositeTrial::where('user_id', $student->id)
                ->where('datetime', '>', $lesson->start_datetime)
                ->where('datetime', '<', $lesson->end_datetime)
                ->where('composite_test_id', $lesson->composite_test_id)
                ->first();

            if (!is_null($composite_trial)) {
                $results[] = [
                    'name' => $student->name,
                    'datetime' => $composite_trial->datetime,
                    'score' => $composite_trial->score,
                ];
            } else {
                $results[] = [
                    'name' => $student->name,
                    'datetime' => '-',
                    'score' => trans('common.not-passed'),
                ];
            }
        }

        return view('admin.lessons.show', compact('lesson', 'results'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $lesson = Lesson::find($id);
        $groups = Group::orderBy('name')->get();
        $tests = CompositeTest::orderBy('name')->get();
        return view('admin.lessons.edit', compact('lesson', 'groups', 'tests'));
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

        $start = new \DateTime($request->get('start'));
        $end = new \DateTime($request->get('end'));

        $interval = $start->diff($end);

        if (!$interval->invert) {

            $lesson = Lesson::find($id);
            $lesson->name = $request->get('name');
            $lesson->start_datetime = $request->get('start');
            $lesson->end_datetime = $request->get('end');
            $lesson->group_id = $request->get('group');
            $lesson->composite_test_id = $request->get('test');

            $lesson->save();

            return redirect()->route('lessons.index')->with('success', trans('lessons.updated'));
        } else {
            return redirect()->route('lessons.edit', ['id' => $id])->withErrors([trans('form.start-end-date_constraint')]);
        }
    }

    /**
     * Display a confirmation form before destroy model.
     *
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $lesson = Lesson::find($id);
        return view('admin.lessons.delete', compact('lesson'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $lesson = Lesson::find($id);
        $lesson->delete();
        return redirect()->route('lessons.index')->with('success', trans('lessons.deleted'));
    }
}
