<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Part;
use App\Exercise;
use App\Question;
use App\Document;
use Illuminate\Http\Request;

class ExerciseController extends Controller
{
    public function __construct()
    {
        //$this->middleware(['role:teacher']);
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

    /**
     * Import the specified resource to storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function import($id = null)
    {
        if (is_null($id)) {
            return redirect()->route('parts.index')->with('warning', 'You need to link an exercise to a part.');
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
        $matching = [
            'A',
            'B',
            'C',
            'D',
        ];
        $exercise = null;

        // Manage answers.
        if ($request->file('answers')) {
            $handle = fopen($request->file('answers')->path(), "r");

            $datas = fread($handle, filesize($request->file('answers')->path()));
            $d = str_replace("\r\n", '', $datas);
            $d = str_replace("\n", '', $d);
            $d = str_replace("\r", '', $d);
            $d = str_replace(" ", '', $d);
            $d = str_replace("(", '', $d);

            $datas = explode(')', $d);

            $answers = [];
            if (sizeof($datas) === 1) {
                $datas_array = str_split($datas[0], 1);
                foreach ($datas_array as $key => $answer) {
                    $answers[$key+1] = $answer;
                }
            } else {
                foreach ($datas as $answer) {
                    if (preg_match(
                            '/(?P<number>\d+)\.(?P<letter>[ABCD])/',
                            $answer,
                            $data_answer
                        ) != FALSE) {
                        $answers[$data_answer['number']] = $data_answer['letter'];
                    }
                }
            }

            fclose($handle);
        }

        $part = Part::find($request->get('part'));

        // For example : Type 1 (2017 & 2018)
        if ($part->type === 'listening' && !$part->questions && $part->files && !$part->texts) {
            $questions = [];
            if ($request->file('documents')->getClientMimeType() === 'application/zip') {
                $zip = new \ZipArchive();
                $file = $request->file('documents');

                if($zip->open($file->getRealPath(), \ZipArchive::CREATE) == TRUE) {
                    $zip->extractTo('./storage/documents');
                    $repository_name = str_replace('.zip', '', $file->getClientOriginalName());

                    if ($repository = opendir('./storage/documents/' . $repository_name)) {
                        while(false !== ($current_file = readdir($repository))) {
                            if (preg_match(
                                    '/' . $repository_name . '_(?P<number>\d+)\.*/',
                                    $current_file,
                                    $data_file
                                ) != FALSE) {

                                if (is_null($exercise)) {
                                    $exercise = Exercise::create([
                                        'name' => $request->get('name'),
                                        'part_id' => $request->get('part'),
                                    ]);
                                }

                                $question = Question::create([
                                    'version' => $part->version,
                                    'question' => '',
                                    'number' => $data_file['number'],
                                ]);

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

                                $question->documents()->attach($document);
                                $exercise->questions()->attach($question, ['number' => $data_file['number']]);

                                $questions[$data_file['number']] = $question;
                            }
                        }
                    }

                    if ($request->file('audios')->getClientMimeType() === 'application/zip') {
                        $zip = new \ZipArchive();
                        $file = $request->file('audios');

                        if ($zip->open($file->getRealPath(), \ZipArchive::CREATE) == TRUE) {
                            $zip->extractTo('./storage/documents');
                            $repository_name = str_replace('.zip', '', $file->getClientOriginalName());

                            if ($repository = opendir('./storage/documents/' . $repository_name)) {
                                while (false !== ($current_file = readdir($repository))) {
                                    if (preg_match(
                                            '/(?P<number_start>\d+)~(?P<number_end>\d+)(?P<extension>.(\w+))/',
                                            $current_file,
                                            $data_file
                                        ) != FALSE) {

                                        $new_file = $repository_name
                                            . '_'
                                            . $data_file['number_start']
                                            . '-'
                                            . $data_file['number_end']
                                            . $data_file['extension'];

                                        rename('./storage/documents/' . $repository_name . '/' . $current_file, './storage/documents/' . $repository_name . '/' . $new_file);

                                        $document = Document::create([
                                            'name' => $new_file,
                                            'type' => 'audio',
                                            'url' => './documents/' . $repository_name . '/' . $new_file,
                                        ]);

                                        for ($i = intval($data_file['number_start']); $i <= intval($data_file['number_end']); $i++) {
                                            $questions[$i]->documents()->attach($document);
                                        }
                                    }

                                    if (preg_match(
                                            '/.*\.(?P<number>\d+)(?P<extension>.(\w+))/',
                                            $current_file,
                                            $data_file
                                        ) != FALSE) {

                                        $new_file = $repository_name . '_' . $data_file['number'] . $data_file['extension'];
                                        rename('./storage/documents/' . $repository_name . '/' .$current_file, './storage/documents/' . $repository_name . '/' .$new_file);

                                        $document = Document::create([
                                            'name' => $new_file,
                                            'type' => 'audio',
                                            'url' => './documents/' . $repository_name . '/' . $new_file,
                                        ]);

                                        $num = intval($data_file["number"]);
                                        $q = $questions[$num];
                                        $q->documents()->attach($document);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        // For example : Type 2 (2017 & 2018)
        if ($part->type === 'listening' && !$part->questions && !$part->files && !$part->texts) {
            if ($request->file('audios')->getClientMimeType() === 'application/zip') {
                $zip = new \ZipArchive();
                $file = $request->file('audios');

                if($zip->open($file->getRealPath(), \ZipArchive::CREATE) == TRUE) {
                    $zip->extractTo('./storage/documents');
                    $repository_name = str_replace('.zip', '', $file->getClientOriginalName());

                    if ($repository = opendir('./storage/documents/' . $repository_name)) {
                        while(false !== ($current_file = readdir($repository))) {
                            if (preg_match(
                                    '/(?P<number_start>\d+)~(?P<number_end>\d+)(?P<extension>.(\w+))/',
                                    $current_file,
                                    $data_file
                                ) != FALSE) {
                                $new_file = $repository_name . '_' . $data_file['number_start'] . '~' . $data_file['number_end'] . $data_file['extension'];
                                rename("./storage/documents/" . $repository_name . "/" . $current_file, "./storage/documents/" . $repository_name . "/" . $new_file);

                                if (is_null($exercise)) {
                                    $exercise = Exercise::create([
                                        'name' => $request->get('name'),
                                        'part_id' => $part('part'),
                                    ]);
                                }

                                $document = Document::create([
                                    'name' => $new_file,
                                    'type' => 'audio',
                                    'url' => './documents/' . $repository_name . '/' . $new_file,
                                ]);

                                $min = intval($data_file['number_start']);
                                $max = intval($data_file['number_end']);
                                for ($n = $min; $n <= $max; $n++) {
                                    $question = Question::create([
                                        'version' => $part->id,
                                        'question' => '',
                                        'number' => $n,
                                    ]);

                                    $question->parts()->attach($part);

                                    for ($i = 0; $i < 3; $i++) {
                                        $p = $question->proposals()->create(['value' => 'Answer']);


                                        if ($i === array_search($answers[$n], $matching)) {
                                            $question->answer()->associate($p)->save();
                                        }
                                    }

                                    $question->documents()->attach($document);
                                    $exercise->questions()->attach($question, ['number' => $n]);
                                }
                            } else if (preg_match(
                                    '/(?P<number>\d+)(?P<extension>.(\w+))$/',
                                    $current_file,
                                    $data_file
                                ) != FALSE) {

                                if (isset($answers[$data_file['number']])) {
                                    $new_file = $repository_name . '_' . $data_file['number'] . $data_file['extension'];
                                    rename('./storage/documents/' . $repository_name . '/' . $current_file, './storage/documents/' . $repository_name . '/' . $new_file);

                                    if (is_null($exercise)) {
                                        $exercise = Exercise::create([
                                            'name' => $request->get('name'),
                                            'part_id' => $part->id,
                                        ]);
                                    }

                                    $question = Question::create([
                                        'version' => $part->version,
                                        'question' => '',
                                        'number' => $data_file['number'],
                                    ]);

                                    $question->parts()->attach($part);

                                    for ($i = 0; $i < 3; $i++) {
                                        $p = $question->proposals()->create(['value' => 'Answer']);


                                        if ($i === array_search($answers[$data_file['number']], $matching)) {
                                            $question->answer()->associate($p)->save();
                                        }
                                    }

                                    $document = Document::create([
                                        'name' => $new_file,
                                        'type' => 'audio',
                                        'url' => './documents/' . $repository_name . '/' . $new_file,
                                    ]);

                                    unset($answers[$data_file['number']]);

                                    $question->documents()->attach($document);
                                    $exercise->questions()->attach($question, ['number' => $data_file['number']]);
                                }
                            }
                        }
                    }
                }
            }
        }

        // For example : Type 3 & 4 (2017)
        if ($part->type === 'listening' && $part->questions && !$part->files && !$part->texts) {
            $number = '';
            $handle = fopen($request->file('questions')->path(), "r");

            $final = [];
            //$question = null;
            $question_string = '';
            $questions = [];

            /**
             * Import questions.
             */
            while(!feof($handle))
            {
                $line = fgets($handle);

                if (preg_match(
                        '/(?P<number>\d+)\. (?P<question>.+)/',
                        $line,
                        $data_question
                    ) != FALSE) {
                    // Beginning of the question.
                    $line = str_replace("\r\n", ' ', $line);
                    $question_string .= ' ' . $line;
                } elseif (preg_match(
                        '/\((?P<index>[A-D])\) (?P<answer>.+)/',
                        $line,
                        $data_question
                    ) != FALSE) {
                    if (!empty($question_string)) {
                        $final[] = trim($question_string);
                        $question_string = '';
                    }
                    $line = str_replace("\r\n", ' ', $line);
                    $final[] = trim($line);
                } else {
                    $line = str_replace("\r\n", ' ', $line);
                    $question_string .= '' . $line;
                }
            }
            fclose($handle);

            foreach ($final as $d) {
                if (is_null($exercise)) {
                    $exercise = Exercise::create([
                        'name' => $request->get('name'),
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
                        'version' => $part->version,
                        'question' => $data_question['question'],
                        'number' => $number,
                    ]);

                    $question_index = 1;
                    $exercise->questions()->attach($question, ['number' => $question_index++]);

                    $question->parts()->attach($part);
                    $questions[$number] = $question;
                }

                if (preg_match(
                        '/\((?P<index>[A-D])\) (?P<answer>.+)/',
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

            /**
             * Manage audios.
             */
            if ($request->file('audios')->getClientMimeType() === 'application/zip') {
                $zip = new \ZipArchive();
                $file = $request->file('audios');

                if ($zip->open($file->getRealPath(), \ZipArchive::CREATE) == TRUE) {
                    $zip->extractTo('./storage/documents');
                    $repository_name = str_replace('.zip', '', $file->getClientOriginalName());

                    if ($repository = opendir('./storage/documents/' . $repository_name)) {
                        while (false !== ($current_file = readdir($repository))) {
                            if (preg_match(
                                    '/(?P<number_start>\d+)~(?P<number_end>\d+)(?P<extension>.(\w+))/',
                                    $current_file,
                                    $data_file
                                ) != FALSE) {

                                $new_file = $repository_name
                                    . '_'
                                    . $data_file['number_start']
                                    . '-'
                                    . $data_file['number_end']
                                    . $data_file['extension'];

                                rename('./storage/documents/' . $repository_name . '/' . $current_file, './storage/documents/' . $repository_name . '/' . $new_file);

                                $document = Document::create([
                                    'name' => $new_file,
                                    'type' => 'audio',
                                    'url' => './documents/' . $repository_name . '/' . $new_file,
                                ]);

                                for ($i = intval($data_file['number_start']); $i <= intval($data_file['number_end']); $i++) {
                                    $questions[$i]->documents()->attach($document);
                                }
                            }
                        }
                    }
                }
            }
        }
        // For example : Type 5 (2017 & 2018)
        if ($part->type !== 'listening' && $part->questions && !$part->files && !$part->texts) {
            $number = '';
            $handle = fopen($request->file('questions')->path(), "r");

            $final = [];
            $question = null;

            $question_string = '';

            while(!feof($handle))
            {
                $line = fgets($handle);

                if (preg_match(
                        '/(?P<number>\d+)\. (?P<question>.+)/',
                        $line,
                        $data_question
                    ) != FALSE) {
                    // Beginning of the question.
                    $line = str_replace("\r\n", ' ', $line);
                    $question_string .= ' ' . $line;
                } elseif (preg_match(
                        '/\((?P<index>[A-D])\) (?P<answer>.+)/',
                        $line,
                        $data_question
                    ) != FALSE) {
                    if (!empty($question_string)) {
                        $final[] = trim($question_string);
                        $question_string = '';
                    }
                    $line = str_replace("\r\n", ' ', $line);
                    $final[] = trim($line);
                } else {
                    $line = str_replace("\r\n", ' ', $line);
                    $question_string .= '' . $line;
                }
            }

            fclose($handle);

            foreach ($final as $d) {
                if (is_null($exercise)) {
                    $exercise = Exercise::create([
                        'name' => $request->get('name'),
                        'part_id' => $part->id,
                    ]);
                }

                if (preg_match(
                        '/(?P<number>\d+)\. (?P<question>.+)/',
                        $d,
                        $data_question
                    ) != FALSE) {
                    $number = $data_question['number'];
                    $question = Question::create([
                        'version' => $part->version,
                        'question' => $data_question['question'],
                        'number' => $number,
                    ]);

                    $question_index = 1;
                    $exercise->questions()->attach($question, ['number' => $question_index++]);
                    $question->parts()->attach($part);
                }

                if (preg_match(
                        '/\((?P<index>[A-D])\) (?P<answer>.+)/',
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
        }

        // For example : Type 6 (2017 & 2018)
        if ($part->type !== 'listening' && $part->texts && !$part->files) {
            $number = '';
            $handle = fopen($request->file('questions')->path(), "r");

            $content_string = "";
            $document = null;
            $question = null;

            /**
             * Import questions.
             */
            while(!feof($handle))
            {
                $line = fgets($handle);

                if (preg_match(
                        '/^(?P<number>\d+)\.$/',
                        trim($line),
                        $data_question
                    ) != FALSE) {
                    // $line is a question.
                    $number = $data_question['number'];

                    if (is_null($exercise)) {
                        $exercise = Exercise::create([
                            'name' => $request->get('name'),
                            'part_id' => $part->id,
                        ]);
                    }

                    if (is_null($document)) {
                        // CREATE DOCUMENT.
                        $document = Document::create([
                            'name' => '',
                            'type' => 'text',
                            'content' => $content_string,
                        ]);

                        $content_string = '';
                    }

                    $question = Question::create([
                        'question' => '',
                        'version' => $part->version,
                        'number' => $data_question['number'],
                    ]);

                    $question_index = 1;
                    $exercise->questions()->attach($question, ['number' => $question_index++]);

                    $question->parts()->attach($part);

                    $question->documents()->attach($document);

                } elseif (preg_match(
                        '/\((?P<index>[A-D])\) (?P<answer>.+)/',
                        $line,
                        $data_answer
                    ) != FALSE) {
                    // $line is an answer.
                    $proposal = $question->proposals()->create([
                        'value' => $data_answer['answer'],
                    ]);

                    if ($data_answer['index'] === $answers[$number]) {
                        $question->answer()->associate($proposal)->save();
                    }
                } else {
                    // $line is a document part.
                    $document = null;
                    $line = str_replace("\r\n", '<br/>', $line);
                    $content_string .= trim($line);
                }
            }
            fclose($handle);
        }

        // For example : Type 7 (2017 & 2018)
        if ($part->type !== 'listening' && $part->questions && !$part->texts && $part->files) {
            $number = '';
            $handle = fopen($request->file('questions')->path(), "r");

            $final = [];
            //$question = null;
            $question_string = '';
            $questions = [];

            /**
             * Import questions.
             */
            while(!feof($handle))
            {
                $line = fgets($handle);

                if (preg_match(
                        '/(?P<number>\d+)\. (?P<question>.+)/',
                        $line,
                        $data_question
                    ) != FALSE) {
                    // Beginning of the question.
                    $line = str_replace("\r\n", ' ', $line);
                    $question_string .= ' ' . $line;
                } elseif (preg_match(
                        '/\((?P<index>[A-D])\) (?P<answer>.+)/',
                        $line,
                        $data_question
                    ) != FALSE) {
                    if (!empty($question_string)) {
                        $final[] = trim($question_string);
                        $question_string = '';
                    }
                    $line = str_replace("\r\n", ' ', $line);
                    $final[] = trim($line);
                } else {
                    $line = str_replace("\r\n", ' ', $line);
                    $question_string .= '' . $line;
                }
            }
            fclose($handle);

            foreach ($final as $d) {
                if (is_null($exercise)) {
                    $exercise = Exercise::create([
                        'name' => $request->get('name'),
                        'part_id' => $part->id,
                    ]);
                }

                if (preg_match(
                        '/(?P<number>\d+)\. (?P<question>.+)/',
                        $d,
                        $data_question
                    ) != FALSE) {
                    $number = $data_question['number'];
                    $question = Question::create([
                        'version' => $part->version,
                        'question' => $data_question['question'],
                        'number' => $number,
                    ]);

                    $question_index = 1;
                    $exercise->questions()->attach($question, ['number' => $question_index++]);

                    $question->parts()->attach($part);
                    $questions[$number] = $question;
                }

                if (preg_match(
                        '/\((?P<index>[A-D])\) (?P<answer>.+)/',
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

            /**
             * Manage documents.
             */
            if ($request->file('documents')->getClientMimeType() === 'application/zip') {
                $zip = new \ZipArchive();
                $file = $request->file('documents');

                if ($zip->open($file->getRealPath(), \ZipArchive::CREATE) == TRUE) {
                    $zip->extractTo('./storage/documents');
                    $repository_name = str_replace('.zip', '', $file->getClientOriginalName());

                    if ($repository = opendir('./storage/documents/' . $repository_name)) {
                        while (false !== ($current_file = readdir($repository))) {
                            if (preg_match(
                                    '/(?P<number_start>\d+)~(?P<number_end>\d+)(?P<extension>.(\w+))/',
                                    $current_file,
                                    $data_file
                                ) != FALSE) {

                                $new_file = $repository_name
                                    . '_'
                                    . $data_file['number_start']
                                    . '-'
                                    . $data_file['number_end']
                                    . $data_file['extension'];

                                rename('./storage/documents/' . $repository_name . '/' . $current_file, './storage/documents/' . $repository_name . '/' . $new_file);

                                $document = Document::create([
                                    'name' => $new_file,
                                    'type' => 'image',
                                    'url' => './documents/' . $repository_name . '/' . $new_file,
                                ]);

                                for ($i = intval($data_file['number_start']); $i <= intval($data_file['number_end']); $i++) {
                                    $questions[$i]->documents()->attach($document);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
