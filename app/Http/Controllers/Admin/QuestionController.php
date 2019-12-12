<?php

namespace App\Http\Controllers\Admin;

use App\Correction;
use App\Document;
use App\Explanation;
use App\Game;
use App\Part;
use App\Proposal;
use App\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class QuestionController extends Controller
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
        $questions = Question::paginate(20);
        $common_data['active_trail'] = 'teacher-exercises';
        return view(
            'admin.questions.index',
            [
                'questions' => $questions,
                'common_data' => $common_data
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $parts = Part::all();
        $documents = Document::all();

        $common_data['active_trail'] = 'teacher-exercises';
        return view(
            'admin.questions.create',
            compact(
                'parts',
                'documents',
                'common_data'
            )
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'question' => 'required|max:255',
            'proposals.0' => 'required',
            'proposals.1' => 'required',
            'proposals.2' => 'required',
            'proposals.3' => 'required_if:answer, ==, 3',
            'answer' => 'required'
        ]);

        $datas = $request->all();

        $question = Question::create([
            'version' => $datas['version'],
            'question' => $datas['question'],
            'number' => $datas['number'] ?? null,
        ]);

        foreach ($datas['parts'] as $part_id) {
            $part = Part::find($part_id);
            $question->parts()->attach($part);
        }

        foreach ($datas['proposals'] as $key => $proposal_value) {
            if (!is_null($proposal_value)) {
                $proposal = $question->proposals()->create(['value' => $proposal_value]);

                if ($key == $datas['answer']) {
                    $question->answer()->associate($proposal)->save();
                }
            }
        }

        if (isset($datas['documents'])) {
            foreach ($datas['documents'] as $document_id) {
                $document = Document::find($document_id);
                $question->documents()->attach($document);
            }
        }

        return redirect()->route('questions.index')->with('success', trans('questions.added'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $question = Question::find($id);

        if (!is_null($question)) {
            // Get statistics
            $statistics = $question->getStatistics();

            // Get explanation
            $explanation = Explanation::find($question->explanation_id);

            // Exercises.
            $exercises = DB::table('exercises')
                ->join('exercise_question', 'exercise_question.exercise_id', '=', 'exercises.id')
                ->where('exercise_question.question_id', $id)
                ->get();

            $common_data['active_trail'] = 'teacher-exercises';
            return view(
                'admin.questions.show',
                compact(
                    'question',
                    'statistics',
                    'explanation',
                    'exercises',
                    'common_data'
                )
            );
        }

        abort(404);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $datas['question'] = Question::find($id);

        if (is_null($datas['question'])) {
            abort(404);
        }

        $explanations = Explanation::all();
        $common_data['active_trail'] = 'teacher-exercises';
        return view(
            'admin.questions.edit',
            compact(
                'datas',
                'explanations',
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
        $request->validate([
            'question' => 'required|max:255',
            'proposals.0' => 'required',
            'proposals.1' => 'required',
            'proposals.2' => 'required',
            'proposals.3' => 'required_if:answer, ==, 3',
            'answer' => 'required|numeric'
        ]);

        $question = Question::find($id);

        if (is_null($question)) {
            abort(404);
        }

        if ($request->get('question') == '#none') {
            $q = '';
        } else {
            $q = $request->get('question');
        }
        $question->question = $q;

        $old_proposals = $question->proposals()->get();
        $new_proposals = $request->get('proposals');

        for ($i = 0; $i < 4; $i++) {
            if (isset($new_proposals[$i])) {
                if (isset($old_proposals[$i])) {
                    $old_proposals[$i]->value = $new_proposals[$i];
                    $old_proposals[$i]->save();

                    if ($i == $request->get('answer')) {
                        $question->answer_id = $old_proposals[$i]->id;
                    }
                } else {
                    $proposal = $question->proposals()->create(['value' =>  $new_proposals[$i]]);

                    if ($i == $request->get('answer')) {
                        $question->answer_id = $proposal->id;
                    }
                }
            } else {
                // Empty values.
                if (isset($old_proposals[$i])) {
                    $old_proposals[$i]->update(['question_id' => null]);
                }
            }
        }

        // Manage explanation.
        $question->explanation_id = $request->get('explanation');

        $question->save();

        return redirect()->route('questions.index')->with('success', trans('questions.updated'));
    }

    /**
     * Display a confirmation form before destroy model.
     *
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $question = Question::find($id);

        if (is_null($question)) {
            abort(404);
        }

        $common_data['active_trail'] = 'teacher-exercises';
        return view(
            'admin.questions.delete',
            compact(
                'question',
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
        $errors = [];
        $delete = true;

        $question = Question::find($id);

        if (is_null($question)) {
            abort(404);
        }

        $count_games = Game::where('error_id', $id)->count();

        if ($count_games > 0) {
            $errors[] = trans('games.delete_games-constraint');
            $delete = false;
        }

        $count_corrections = Correction::where('question_id', $id)->count();

        if ($count_corrections > 0) {
            $errors[] = trans('games.delete_trials-constraint');
            $delete = false;
        }

        if ($delete) {
            $question->parts()->detach();
            $proposals = $question->proposals()->get();

            $question->answer()->dissociate();
            $question->save();

            foreach ($proposals as $proposal) {
                $proposal->question()->dissociate();
                $proposal->delete();
            }

            $question->delete();
            return redirect()->route('questions.index')->with('success', trans('questions.deleted'));
        }

        return redirect()->route('questions.index')->withErrors($errors);
    }
}
