<?php

namespace App\Http\Controllers\admin;

use App\Document;
use App\Part;
use App\Proposal;
use App\Question;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Test;
use Illuminate\Support\Facades\DB;

class TestController extends Controller
{
    public function __construct()
    {
        $this->middleware(['permission:test-add'])->only('index', 'create', 'store', 'exerciseCreate', 'exerciseStore');

        // This route are currently not used.
        $this->middleware(['role:admin'])->only('destroy', 'show', 'edit', 'update');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tests = Test::where('part_id', '=', 1)->get();
        return view('tests.index', compact('tests'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $parts = [2, 3, 4, 5, 6, 7, 8];
        $tests = [];

        foreach ($parts as $part) {
            $tests[$part-1] = Test::where('part_id', $part)->get();
        }

        return view('admin.tests.create', compact('tests'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $number = 1;
        $test = Test::create([
            'name' => $request->get('name'),
            'version' => $request->get('version'),
            'part_id' => 1,
        ]);

        foreach ($request->all() as $key => $test_id) {
            $pattern = '/^part_*/';
            if (preg_match($pattern, $key)) {
                $questions = Test::find($test_id)->questions()->get();

                foreach($questions as $question) {
                    $test->questions()->attach($question, ['number' => $number]);
                    $number++;
                }
            }
        }

        return redirect()->route('tests.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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

    public function exerciseCreate($type_id) {
        $datas = [];

        switch ($type_id) {
            case 1:
                $datas['type'] = 'question';
                $datas['number'] = 6;
                $datas['description'] = "L'exercice 1 comporte 6 questions.";

                $datas['datas'] =  DB::table('questions')
                    ->join('question_part', 'questions.id', '=', 'question_id')
                    ->where('part_id', '=', 2)
                    ->select('questions.*')
                    ->get();
                break;
            case 2:
                $datas['type'] = 'question';
                $datas['number'] = 25;
                $datas['description'] = "L'exercice 2 comporte 25 questions.";

                $datas['datas'] =  DB::table('questions')
                    ->join('question_part', 'questions.id', '=', 'question_id')
                    ->where('part_id', '=', 3)
                    ->select('questions.*')
                    ->get();
                break;
            case 3:
                $part_id = 4;
                $question_counter = 3;

                $datas['type'] = 'document';
                $datas['number'] = 13;
                $datas['description'] = "L'exercice 3 comporte 39 questions utilisant au total 13 documents.";
                $datas['datas'] = DB::table('documents')
                    ->select('documents.id', 'documents.name', DB::raw('count(documents.id) as counter'))
                    ->join('question_document', 'question_document.document_id', '=', 'documents.id')
                    ->join('questions', 'questions.id', '=', 'question_document.question_id')
                    ->join('question_part', 'question_part.question_id', '=', 'questions.id')
                    ->where('question_part.part_id', '=', $part_id)
                    ->groupBy('documents.id')
                    ->having('counter', '>', $question_counter)
                    ->orderBy('documents.id', 'desc')
                    ->get();
                break;
            case 4:
                $part_id = 5;
                $question_counter = 3;

                $datas['type'] = 'document';
                $datas['number'] = 10;
                $datas['description'] = "L'exercice 4 comporte 30 questions utilisant au total 10 documents.";
                $datas['datas'] = DB::table('documents')
                    ->select('documents.id', 'documents.name', DB::raw('count(documents.id) as counter'))
                    ->join('question_document', 'question_document.document_id', '=', 'documents.id')
                    ->join('questions', 'questions.id', '=', 'question_document.question_id')
                    ->join('question_part', 'question_part.question_id', '=', 'questions.id')
                    ->where('question_part.part_id', '=', $part_id)
                    ->groupBy('documents.id')
                    ->having('counter', '>', $question_counter)
                    ->orderBy('documents.id', 'desc')
                    ->get();
                break;
            case 5:
                $datas['type'] = 'question';
                $datas['number'] = 30;
                $datas['description'] = "L'exercice 5 comporte 30 questions.";
                $datas['datas'] =  DB::table('questions')
                    ->join('question_part', 'questions.id', '=', 'question_id')
                    ->where('part_id', '=', 6)
                    ->select('questions.*')
                    ->get();
                break;
            case 6:
                $datas['type'] = 'question';
                $datas['number'] = 29;
                $datas['description'] = "L'exercice 6 comporte 29 questions.";
                $datas['datas'] =  DB::table('questions')
                    ->join('question_part', 'questions.id', '=', 'question_id')
                    ->where('part_id', '=', 7)
                    ->select('questions.*')
                    ->get();
                break;
            case 7:
                $datas['type'] = 'question';
                $datas['number'] = 25;
                $datas['description'] = "L'exercice 7 comporte 25 questions.";
                $datas['datas'] =  DB::table('questions')
                    ->join('question_part', 'questions.id', '=', 'question_id')
                    ->where('part_id', '=', 8)
                    ->select('questions.*')
                    ->get();
                break;
            default:
        }

        return view('admin.tests.exercise.create', compact('type_id', 'test_id', 'datas'));
    }

    public function exerciseStore(Request $request) {
        $number = 1;

        $byQuestions = [2, 3, 6, 7, 8];
        $byDocuments = [4, 5];

        $exercise = Test::create([
            'name' => $request->get('name'),
            'version' => $request->get('version'),
            'part_id' => $request->get('part'),
        ]);

        if (in_array($request->get('part'), $byQuestions)) {
            foreach ($request->all() as $key => $value) {
                $pattern = '/^question_*/';
                if (preg_match($pattern, $key)) {
                    $question = Question::find($value);
                    $exercise->questions()->attach($question, ['number' => $number]);
                    $number++;
                }
            }
        }

        if (in_array($request->get('part'), $byDocuments)) {
            foreach ($request->all() as $key => $value) {
                $pattern = '/^document_*/';
                if (preg_match($pattern, $key)) {
                    $questions = DB::table('question_document')
                        ->select('question_id')
                        ->where('document_id', '=', $value)
                        ->get();

                    foreach ($questions as $q) {
                        $question = Question::find($q->question_id);
                        $exercise->questions()->attach($question, ['number' => $number]);
                        $number++;
                    }
                }
            }
        }

        return redirect()->route('tests.index');
    }

    public function exerciseImport() {
        return view('admin.tests.exercise.import');
    }

    public function exerciseImportStore(Request $request) {
        $test = null;
        $matching = [
            'A',
            'B',
            'C',
            'D',
        ];

        if ($request->file('answers')) {
            $handle = fopen($request->file('answers')->path(), "r");

            $datas = fread($handle, filesize($request->file('answers')->path()));
            $d = str_replace("\r\n", '', $datas);
            $d = str_replace(" ", '', $d);
            $d = str_replace("(", '', $d);

            $datas = explode(')', $d);

            $answers = [];
            foreach ($datas as $answer) {
                if (preg_match(
                        '/(?P<number>\d+)\.(?P<letter>[ABCD])/',
                        $answer,
                        $data_answer
                    ) != FALSE) {
                    $answers[$data_answer['number']] = $data_answer['letter'];
                }
            }

            fclose($handle);
        }

        switch ($request->get('part')) {
            case 2:
                if ($request->file('documents')->getClientMimeType() === 'application/zip') {
                    $zip = new \ZipArchive();
                    $file = $request->file('documents');

                    if($zip->open($file->getRealPath(), \ZipArchive::CREATE) == TRUE) {
                        $zip->extractTo('./storage/documents');
                        $repository_name = str_replace('.zip', '', $file->getClientOriginalName());

                        if ($repository = opendir('./storage/documents/' . $repository_name)) {
                            while(false !== ($current_file = readdir($repository)))
                            {
                                if (preg_match(
                                        '/'.$repository_name. '_(?P<number>\d+)\.*/',
                                        $current_file,
                                        $data_file
                                    ) != FALSE) {

                                    if (is_null($test)) {
                                        $test = Test::create([
                                            'name' => $request->get('name'),
                                            'version' => $request->get('version'),
                                            'part_id' => $request->get('part'),
                                        ]);
                                    }

                                    $question = Question::create([
                                        'version' => $request->get('version'),
                                        'question' => '',
                                        'number' => $data_file['number'],
                                    ]);

                                    $part = Part::find($request->get('part'));
                                    $question->parts()->attach($part);

                                    for ($i = 0; $i < 4; $i++) {
                                        $p = $question->proposals()->create(['value' => 'Answer']);


                                        if ($i === array_search($answers[$data_file['number']], $matching)) {
                                            $question->answer()->associate($p)->save();
                                        }
                                    }

                                    $document = Document::create([
                                        'name' => $current_file,
                                        'type' => 'image',
                                        'url' => './documents/' . $repository_name . '/' . $current_file,
                                    ]);

                                    $question->documents()->sync($document);
                                    $test->questions()->attach($question, ['number' => $data_file['number']]);
                                }

                                // @TODO : manage audio file.
                            }
                        }
                    }
                }
                break;
            case 3:
                break;
            case 4:
                break;
            case 5:
                break;
            case 6:
                $number = '';
                $handle = fopen($request->file('questions')->path(), "r");

                $datas = fread($handle, filesize($request->file('questions')->path()));
                $datas = str_replace("\r\n", ' ', $datas);

                $datas = explode("(", $datas);
                $final = [];

                foreach ($datas as $data) {
                    $t = null;

                    $t = preg_match(
                        '/(?<answer>([A-D])\) (.+)) (?<next>(\d+\. .*))/',
                        $data,
                        $m
                    );

                    if (preg_match(
                            '/(?<answer>([A-D])\) (.+)) (?<next>(\d+\. .*))/',
                            $data,
                            $m
                        ) != FALSE) {
                        $final[] = $m['answer'];
                        $final[] = $m['next'];
                    } else {
                        $final[] = $data;
                    }
                }

                $datas = $final;

                foreach ($datas as $d) {
                    if (is_null($test)) {
                        $test = Test::create([
                            'name' => $request->get('name'),
                            'version' => $request->get('version'),
                            'part_id' => $request->get('part'),
                        ]);
                    }

                    if (preg_match(
                            '/(?P<number>\d+)\. (?P<question>.+)/',
                            $d,
                            $data_question
                        ) != FALSE) {
                        $number = $data_question['number'];
                        $question = Question::create([
                            'version' => $request->get('version'),
                            'question' => $data_question['question'],
                            'number' => $number,
                        ]);

                        $question_index = 1;
                        $test->questions()->attach($question, ['number' => $question_index++]);

                        $part = Part::find($request->get('part'));
                        $question->parts()->attach($part);
                    }

                    if (preg_match(
                            '/(?P<index>[A-D])\) (?P<answer>.+)/',
                            $d,
                            $data_answer
                        ) != FALSE) {

                        $proposal = $question->proposals()->create([
                            'value' => $data_answer['answer'],
                        ]);

                        if ($data_answer['index'] === $answers[$number]) {
                            $question->answer()->associate($proposal)->save();
                        }
                    }
                }

                fclose($handle);
                break;
            case 7:
                break;
            case 8:
                break;
            default:
                return redirect()->route('tests.index')->with('error', 'You cannot import a complete test.');
                break;
        }

        /****/
        return redirect()->route('tests.index')->with('success', 'Created test.');
    }
}
