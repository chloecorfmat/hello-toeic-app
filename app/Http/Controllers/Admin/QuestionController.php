<?php

namespace App\Http\Controllers\Admin;

use App\Document;
use App\Part;
use App\Proposal;
use App\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class QuestionController extends Controller
{

    public function __construct()
    {
        $this->middleware(['permission:question-add'])->only('create', 'store');
        $this->middleware(['permission:question-update'])->only('edit', 'update');
        $this->middleware(['permission:question-list'])->only('index');
        $this->middleware(['permission:question-show'])->only('show');

        // This route are currently not used.
        $this->middleware(['role:admin'])->only('destroy');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $questions = Question::all();
        return view('admin.questions.index', compact('questions'));
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

        return view('admin.questions.create', compact('parts', 'documents'));
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

        foreach ($datas['documents'] as $document_id) {
            $document = Document::find($document_id);
            $question->documents()->attach($document);
        }

        return redirect()->route('questions.index')->with('success', 'Question has been created.');
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

        // Get statistics
        $statistics = $question->getStatistics();

        return view('admin.questions.show', compact('question', 'statistics'));
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
        return view('admin.questions.edit', compact('datas'));
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
            'answer' => 'required'
        ]);

        $question = Question::find($id);
        $question->question = $request->get('question');

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

        $question->save();

        return redirect('/profile')->with('success', 'Question saved.');
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
