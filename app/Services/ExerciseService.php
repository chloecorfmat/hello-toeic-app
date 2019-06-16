<?php

namespace App\Services;

use App\CompositeTest;
use App\CompositeTrial;
use App\Correction;
use App\Document;
use App\Exercise;
use App\Part;
use App\Proposal;
use App\Question;
use App\Trial;
use Illuminate\Support\Facades\DB;

/**
 * Class ExerciseService
 * @package App\Services
 */

class ExerciseService {
    public function __construct()
    {
    }

    /**
     * Import file to create new exercise.
     * @param $request
     * @return bool
     */
    public function import($request) {
        $matching = [
            'A',
            'B',
            'C',
            'D',
        ];

        $answers = [];
        $questions = [];
        $texts = [];
        $files = [];
        $audios = [];

        $questions_object = [];

        $part = Part::find($request->get('part'));

        // Regexp to use.
        // ^(?<name>.*)_(?P<number_start>\d+)[~-]?(?P<number_end>\d*)%?(?P<doc_number>\d*)(?P<extension>.\w+)$

        // Manage answers.
        $this->manageAnswers($request, $answers);

        if ($request->questions) {
            $this->buildTempQuestionsAndTextsArray($request, $questions, $texts);
        }

        if ($request->documents) {
            $this->manageDocuments($request, $files, 'documents', 'image');
        }

        if ($request->audios) {
            $this->manageDocuments($request, $audios, 'audios', 'audio');
        }

        $exercice = Exercise::create(
            [
                'name' => $request->get('name'),
                'part_id' => $part->id,
            ]
        );

        foreach ($questions as $question) {
            $q = Question::create([
                'version' => $part->version,
                'question' => $question['question'],
                'number' => $question['number'],
            ]);

            $questions_object[$question['number']] = $q;

            $exercice->questions()->attach($q, ['number' => $question['number']]);
            $q->parts()->attach($part);

            foreach ($question['answers'] as $answer) {
                $p = $q->proposals()->create([
                    'value' => $answer['answer'],
                ]);

                if ($answer['index'] === $answers[$question['number']]) {
                    $q->answer()->associate($p)->save();
                }
            }
        }

        if (empty($questions) && $part->nb_questions !== 0) {
            if (!empty($audios)) {
                $keys = array_keys($audios);
                $min = min($keys);
                $max = max($keys);
            } elseif (!empty($files)) {
                $keys = array_keys($files);
                $min = min($keys);
                $max = max($keys);
            } else {
                $min = 1;
                $max = $part->nb_questions;
            }

            for ($i = $min; $i <= $max; $i++) {
                $q = Question::create([
                    'version' => $part->version,
                    'question' => '',
                    'number' => $i,
                ]);

                for ($j = 0; $j < $part->nb_answers; $j++) {
                    $p = $q->proposals()->create(['value' => 'Answer']);
                    if ($j === array_search($answers[$i], $matching)) {
                        $q->answer()->associate($p)->save();
                    }
                }

                $questions_object[$i] = $q;
                $exercice->questions()->attach($q, ['number' => $i]);
                $q->parts()->attach($part);
            }
        }


        // Link documents (audios + files + texts) to question.
        foreach ($texts as $text) {
            $d = Document::create([
                'name' => '',
                'type' => 'text',
                'content' => $text['content'],
            ]);

            foreach ($text['number'] as $number) {
                $questions_object[$number]->documents()->attach($d);
            }
        }

        foreach ($files as $number => $data) {
            $question = $questions_object[$number];

            foreach ($data as $file) {
                $question->documents()->attach($file);
            }
        }

        foreach ($audios as $number => $data) {
            $question = $questions_object[$number];

            foreach ($data as $audio) {
                $question->documents()->attach($audio);
            }
        }

        return TRUE;
    }

    protected function manageAnswers($request, &$answers) {
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
    }

    protected function buildTempQuestionsAndTextsArray($request, &$questions, &$texts) {
        $questions = [];
        $question_string = '';
        $content_string = "";
        $number = '';

        $handle = file($request->file('questions')->path());
        if (sizeof($handle) === 1) {
            $handle = explode("\r", $handle[0]);
        }

        $i = 0;

        while($i < sizeof($handle))
        {
            $line = preg_replace('/[^\w-_+=!()$€*%@&£:;,?"\'\\. ]/', '', $handle[$i]);

            if (!empty($line)) {
                if (preg_match(
                        '/^(?P<number>\d+)\.( (?P<question>.*))?/',
                        $line,
                        $data_question
                    ) != FALSE)
                {

                    if (!empty($question_data)) {
                        $questions[] = $question_data;
                    }

                    // Beginning of the question.

                    if (!empty($text)) {
                        $text['number'][] = $data_question['number'];
                    }

                    if (isset($data_question['question'])) {
                        $line = str_replace("\r\n", ' ', $data_question['question']);
                        $line = str_replace("\r", ' ', $line);
                    }

                    $question_string .= ' ' . $line;

                    $i++;
                    if ($i < sizeof($handle)) {
                        $line = $handle[$i];
                    } else {
                        break;
                    }

                    // Get all the question.
                    while(preg_match(
                            '/^\((?P<index>[A-D])\) (?P<answer>.+)/',
                            $line,
                            $data_answer
                        ) == FALSE) {
                        $line = str_replace("\r\n", ' ', $line);
                        $line = str_replace("\r", ' ', $line);
                        $question_string .= '' . $line;

                        $i++;
                        if ($i < sizeof($handle)) {
                            $line = $handle[$i];
                        } else {
                            break;
                        }
                    }

                    $question_data = [];
                    $question_data['number'] = $data_question['number'];
                    $question_data['question'] = $question_string;

                    preg_match(
                        '/^\((?P<index>[A-D])\) (?P<answer>.+)/',
                        $line,
                        $data_answer
                    );
                    $line = str_replace("\r\n", ' ', $data_answer['answer']);
                    $line = str_replace("\r", ' ', $line);

                    $answer['answer'] = $line;
                    $answer['index'] = $data_answer['index'];

                    $question_data['answers'][] = $answer;
                }
                elseif (preg_match(
                        '/^\((?P<index>[A-D])\) (?P<answer>.+)/',
                        $line,
                        $data_answer
                    ) != FALSE)
                {
                    if (!empty($question_string)) {
                        $question_data['question'] = trim($question_string);
                        $question_string = '';
                    }
                    $line = str_replace("\r\n", ' ', $data_answer['answer']);
                    $line = str_replace("\r", ' ', $line);

                    $answer['answer'] = $line;
                    $answer['index'] = $data_answer['index'];

                    $question_data['answers'][] = $answer;
                }
                else {
                    // Documents.

                    if (!empty($question_data)) {
                        $questions[] = $question_data;
                    }

                    if (!empty($text)) {
                        $texts[] = $text;
                    }

                    $text = [];
                    $content_string = "";
                    $line = str_replace("\r\n", '<br/>', $line);
                    $line = str_replace("\r", '<br/>', $line);
                    $content_string .= trim($line);

                    $i++;
                    if ($i < sizeof($handle)) {
                        $line = $handle[$i];
                    } else {
                        break;
                    }

                    // Get all the document.
                    while(preg_match(
                            '/^(?P<number>\d+)\.( (?P<question>.*))?/',
                            $line,
                            $data_question
                        ) == FALSE) {
                        $line = str_replace("\r\n", '<br/>', $line);
                        $line = str_replace("\r", '<br/>', $line);
                        $content_string .= trim($line);
                        $i++;
                        if ($i < sizeof($handle)) {
                            $line = $handle[$i];
                        } else {
                            break;
                        }
                    }

                    preg_match(
                        '/^(?P<number>\d+)\.( (?P<question>.*))?/',
                        $line,
                        $data_question
                    );
                    $question_data = [];
                    $question_data['number'] = $data_question['number'];
                    if (isset($data_question['question'])) {
                        $line = str_replace("\r\n", ' ', $data_question['question']);
                        $line = str_replace("\r", ' ', $line);
                    }

                    $question_data['question'] = $line;
                    $text['content'] = $content_string;
                    $text['number'][] = $data_question['number'];

                    // Manage question.
                    $line = str_replace("\r\n", ' ', $line);
                    $line = str_replace("\r", ' ', $line);
                    $question_string .= ' ' . $line;
                }
            }

            $i++;
        }

        if (!empty($question_data)) {
            $questions[] = $question_data;
        }

        if (!empty($text)) {
            $texts[] = $text;
        }
    }

    protected function manageDocuments($request, &$documents, $field, $type) {
        $already = [];
        $uid = uniqid();

        if ($request->file($field)->getClientMimeType() === 'application/zip') {
            $zip = new \ZipArchive();
            $file = $request->file($field);

            if ($zip->open($file->getRealPath(), \ZipArchive::CREATE) == TRUE) {
                $zip->extractTo('./storage/documents');
                $repository_name = str_replace('.zip', '', $file->getClientOriginalName());

                mkdir('./storage/documents/' . $uid . '_'. $repository_name);

                if ($repository = opendir('./storage/documents/' . $repository_name)) {
                    while (false !== ($current_file = readdir($repository))) {
                        if (preg_match(
                                '/^(?<name>.*)_(?P<number_start>\d+)[~-]?(?P<number_end>\d*)%?(?P<doc_number>\d*)(?P<extension>.\w+)$/',
                                $current_file,
                                $data_file
                            ) != FALSE) {

                            $new_file_already = '';
                            $new_file = $repository_name
                                . '_'
                                . $data_file['number_start']
                                . '-'
                                . $data_file['number_end'];

                            if (!empty($data_file['doc_number'])) {
                                $new_file_already = $new_file . '%' . $data_file['doc_number'];
                                $new_file .= '__' . $data_file['doc_number'];
                            }

                            $new_file .= $data_file['extension'];

                            rename('./storage/documents/' . $repository_name . '/' . $current_file, './storage/documents/' . $uid . '_'. $repository_name . '/' . $new_file);

                            if (!in_array('./documents/' . $repository_name . '/' . $new_file, $already)) {
                                $document = Document::create([
                                    'name' => $new_file,
                                    'type' => $type,
                                    'url' => './documents/' . $uid . '_' . $repository_name . '/' . $new_file,
                                ]);

                                $already[] = './documents/' . $repository_name . '/' . $new_file_already;

                                if (empty(intval($data_file['number_end']))) {
                                    $data_file['number_end'] = $data_file['number_start'];
                                }
                                for ($i = intval($data_file['number_start']); $i <= intval($data_file['number_end']); $i++) {
                                    $documents[$i][] = $document;
                                }
                            }
                        }
                    }
                }

                if ($this->is_dir_empty('./storage/documents/' . $repository_name)) {
                    rmdir('./storage/documents/' . $repository_name);
                }
            }
        }
    }

    public function delete($id, $status) {
        $parts = [
            'exercise_part1',
            'exercise_part2',
            'exercise_part3',
            'exercise_part4',
            'exercise_part5',
            'exercise_part6',
            'exercise_part7',
        ];

        /**
         * Remove associated composite_tests.
         */
        $composite_tests = [];

        foreach ($parts as $part) {
            $ct = CompositeTest::where($part, $id)->get();
            if ($ct->count() != 0) {
                $composite_tests = array_merge($composite_tests, $ct->all());
            }
        }

        foreach ($composite_tests as $composite_test) {
            $composite_trials = CompositeTrial::where('composite_test_id', $composite_test->id)->get();

            foreach ($composite_trials as $composite_trial) {
                $trials = Trial::where('composite_trial_id', $composite_trial->id)->get();

                foreach ($trials as $trial) {
                    Correction::where('trial_id', $trial->id)->delete();
                }

                Trial::where('composite_trial_id', $composite_trial->id)->delete();
            }

            CompositeTrial::where('composite_test_id', $composite_test->id)->delete();
            CompositeTest::destroy($composite_test->id);
        }

        /**
         * Remove associated trials.
         */
        $trials = Trial::where('exercise_id', $id)->get();

        foreach ($trials as $trial) {
            Correction::where('trial_id', $trial->id)->delete();
            Trial::destroy($trial->id);
        }

        if ($status) {
            $dids = [];

            $questions = DB::table('questions')
                ->join('exercise_question', 'questions.id', '=', 'exercise_question.question_id')
                ->where('exercise_question.exercise_id', $id)
                ->get();

            foreach ($questions->all() as $q) {
                $question = Question::find($q->id);

                $question->answer_id = null;
                $question->save();

                Proposal::where('question_id', $q->id)->delete();

                // Manage documents.
                $documents = DB::table('documents')
                    ->join('question_document', 'question_document.document_id', '=', 'documents.id')
                    ->where('question_document.question_id', $q->id)
                    ->select('documents.id')
                    ->get();

                foreach ($documents as $d) {
                    $document = Document::find($d->id);
                    $question->documents()->detach($document->id);
                    $question->save();

                    if (!in_array($d->id, $dids)) {
                        $dids[] = $d->id;
                    }
                }


                $question->parts()->detach();
                $question->exercises()->detach();
                $question->save();

                Question::destroy($q->id);
            }

            Document::destroy($dids);
        } else {
            $exercise = Exercise::find($id);
            $exercise->questions()->detach();
            $exercise->save();
        }

        $success = Exercise::destroy($id);

        return $success;
    }

    private function is_dir_empty($dir) {
        $handle = opendir($dir);
        while (false !== ($entry = readdir($handle))) {
            if ($entry != "." && $entry != "..") {
                closedir($handle);
                return FALSE;
            }
        }
        closedir($handle);
        return TRUE;
    }
}
