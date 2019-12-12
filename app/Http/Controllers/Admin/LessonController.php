<?php

namespace App\Http\Controllers\Admin;

use App\CompositeTest;
use App\CompositeTrial;
use App\Exercise;
use App\Group;
use App\Lesson;
use App\Services\StatsService;
use App\Setting;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class LessonController extends Controller
{
    /**
     * Constructor.
     */
    public function __construct()
    {
        $this->middleware(['permission:lessons-manage']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $lessons = Lesson::orderBy('start_datetime')->get();
        $common_data['active_trail'] = 'teacher-users';
        return view('admin.lessons.index', compact('lessons', 'common_data'));
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
        $common_data['active_trail'] = 'teacher-users';
        return view('admin.lessons.create', compact('groups', 'tests', 'common_data'));
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

        if (is_null($lesson)) {
            abort(404);
        }

        $composite_test = $lesson->composite_test()->get()->first();

        $exercises = [];
        $exercises_ids = [];

        for ($i = 1; $i < 8; $i++) {
            $function = 'exercisePart' . $i;
            $exercise = $composite_test->$function()->get()->first();

            if (!is_null($exercise)) {
                $exercises[$exercise->id] = $exercise->part()->get()->first()->nb_questions * 5;
                $exercises_ids[$i] = $exercise->id;
            }
        }

        $students = Group::find($lesson->group_id)->users()->get();

        $results = [];

        // Statistics.
        $min = -1;
        $max = 0;
        $s_number = 0;
        $scores = [];

        foreach ($students as $student) {
            $composite_trial = CompositeTrial::where('user_id', $student->id)
                ->where('datetime', '>', $lesson->start_datetime)
                ->where('datetime', '<', $lesson->end_datetime)
                ->where('composite_test_id', $lesson->composite_test_id)
                ->first();

            if (!is_null($composite_trial)) {
                $score = $composite_trial->score;
                $scores[] = $score;

                $ex_scores = [];
                $trials = $composite_trial->trials()->get();

                foreach ($trials as $trial) {
                    $id = array_search($trial->exercise_id, $exercises_ids);
                    $ex_scores[$id] = $trial->score;
                }

                $results[] = [
                    'name' => $student->name,
                    'datetime' => $composite_trial->datetime,
                    'score' => $composite_trial->score,
                    'exercises' => $ex_scores,
                ];

                if ($min < 0 || $score < $min) {
                    $min = $score;
                }

                if ($score > $max) {
                    $max = $score;
                }

                $s_number++;

            } else {
                $results[] = [
                    'name' => $student->name,
                    'datetime' => '-',
                    'score' => trans('common.not-passed'),
                    'exercises' => []
                ];
            }
        }

        $min = ($min === -1) ? 0 : $min;
        $statistics = [
            'min' => $min,
            'max' => $max,
            'average' => round((new StatsService())->average($scores), 2),
            'median' => round((new StatsService())->median($scores), 2),
            'standard_deviation' => round((new StatsService())->standard_deviation($scores), 2),
            'students_number' => count($students),
            'students_passed' => $s_number,
        ];

        $common_data['active_trail'] = 'teacher-users';
        return view(
            'admin.lessons.show',
            compact(
                'lesson',
                'results',
                'exercises',
                'exercises_ids',
                'statistics',
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
        $lesson = Lesson::find($id);

        if (is_null($lesson)) {
            abort(404);
        }

        $groups = Group::orderBy('name')->get();
        $tests = CompositeTest::orderBy('name')->get();
        $common_data['active_trail'] = 'teacher-users';
        return view(
            'admin.lessons.edit',
            compact(
                'lesson',
                'groups',
                'tests',
                'common_data'
            )
        );
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

            if (is_null($lesson)) {
                abort(404);
            }

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

        if (is_null($lesson)) {
            abort(404);
        }

        $common_data['active_trail'] = 'teacher-users';
        return view(
            'admin.lessons.delete',
            compact(
                'lesson',
                'common_data'
            )
        );
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

        if (is_null($lesson)) {
            abort(404);
        }

        $lesson->delete();
        return redirect()->route('lessons.index')->with('success', trans('lessons.deleted'));
    }

    /**
     * Display statistics for the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function stats($id) {
        $levels = [
            'low' => Setting::where('key', 'config.score.low')->first()->value,
            'intermediate' => Setting::where('key', 'config.score.intermediate')->first()->value
        ];

        $lesson = Lesson::find($id);

        if (is_null($lesson)) {
            abort(404);
        }

        $composite_test = $lesson->composite_test()->first();

        $exercises = [];

        /**
        SELECT SUM(trials.score) AS score, trials.exercise_id, parts.nb_questions*5 as max_score  FROM trials
        INNER JOIN exercises
        INNER JOIN parts
        INNER JOIN composite_trials
        INNER JOIN users
        INNER JOIN user_group
         *
        WHERE trials.composite_trial_id = composite_trials.id --> OK
        AND composite_trials.user_id = users.id --> OK
         *
        AND composite_trials.datetime > "2018-06-07 00:00:00"
        AND composite_trials.datetime < "2019-11-11 00:00:00"
         *
        AND users.id = user_group.user_id --> OK
         *
        AND user_group.group_id = 1 --> OK
        AND composite_trials.composite_test_id = 5 --> OK
         *
        AND trials.exercise_id = exercises.id --> OK
        AND exercises.part_id = parts.id --> OK
         *
        GROUP BY trials.exercise_id
         */

        $score_by_exercises = DB::table('trials')
            ->join('exercises', 'exercises.id', '=', 'trials.exercise_id')
            ->join('parts', 'parts.id', '=', 'exercises.part_id')
            ->join('composite_trials', 'composite_trials.id', '=', 'trials.composite_trial_id')
            ->join('users', 'users.id', '=', 'composite_trials.user_id')
            ->join('user_group', 'user_group.user_id', '=', 'users.id')

            ->where('user_group.group_id', '=', $lesson->group_id)
            ->where('composite_trials.composite_test_id', '=', $lesson->composite_test_id)
            ->where('composite_trials.datetime', '>', $lesson->start_datetime)
            ->where('composite_trials.datetime', '<', $lesson->end_datetime)

            ->groupBy('trials.exercise_id', 'parts.nb_questions', 'exercises.name')

            ->select(DB::raw('SUM(trials.score) as score'), 'trials.exercise_id', DB::raw('parts.nb_questions*5 as max_score'), DB::raw('COUNT(users.id) as users_nb'), 'exercises.name')
            ->get();

        foreach ($score_by_exercises as $exercise) {

            /**
            SELECT SUM(corrections.state) as score, questions.id as question, exercises.id as exercise
            FROM corrections
            INNER JOIN trials on trials.id = corrections.trial_id
            INNER JOIN questions on questions.id = corrections.question_id
            INNER JOIN exercise_question on questions.id = exercise_question.question_id
            INNER JOIN exercises
            INNER JOIN composite_trials
            INNER JOIN users
            INNER JOIN user_group
            WHERE trials.composite_trial_id = composite_trials.id
            AND composite_trials.user_id = users.id
            AND composite_trials.datetime > "2018-06-07 00:00:00"
            AND composite_trials.datetime < "2019-11-11 00:00:00"
            AND users.id = user_group.user_id
            AND user_group.group_id = 1
            AND composite_trials.composite_test_id = 5
            AND trials.exercise_id = exercises.id
            AND exercise_question.exercise_id = 48

            GROUP BY questions.id, exercises.id
             */

            $questions = DB::table('corrections')
                ->join('trials', 'trials.id', '=', 'corrections.trial_id')
                ->join('questions', 'questions.id', '=', 'corrections.question_id')
                ->join('exercise_question', 'exercise_question.question_id', '=', 'questions.id')
                ->join('exercises', 'exercises.id', '=', 'exercise_question.exercise_id')
                ->join('composite_trials', 'composite_trials.id', '=', 'trials.composite_trial_id')
                ->join('users', 'users.id', '=', 'composite_trials.user_id')
                ->join('user_group', 'user_group.user_id', '=', 'users.id')

                ->where('composite_trials.datetime', '>', "2018-06-07 00:00:00")
                ->where('composite_trials.datetime', '<', "2019-11-11 00:00:00")
                ->where('user_group.group_id', '=', $lesson->group_id)
                ->where('composite_trials.composite_test_id', '=', $lesson->composite_test_id)
                ->where('exercise_question.exercise_id', '=', $exercise->exercise_id)
                ->where('trials.exercise_id', '=', $exercise->exercise_id)

                ->groupBy('questions.id', 'exercises.id', 'questions.number')
                ->orderBy('number')

                ->select(DB::raw('SUM(corrections.state) as score'), 'questions.id as question', 'exercises.id as exercise', 'questions.number as number')
                ->get();

            $e = [
                'name' => $exercise->name,
                'id' => $exercise->exercise_id,
                'questions' => $questions,
            ];

            $exercises[$exercise->exercise_id] = $e;
        }

        $common_data['active_trail'] = 'teacher-users';
        return view(
            'admin.lessons.stats',
            compact(
                'score_by_exercises',
                'exercises',
                'composite_test',
                'lesson',
                'levels',
                'common_data'
            )
        );
    }
}
