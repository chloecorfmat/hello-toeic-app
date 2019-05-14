<?php

namespace App\Services;

use App\Document;
use App\Exercise;
use App\Part;
use App\Question;

/**
 * Class ExerciseService
 * @package App\Services
 */

class ExerciseService {
    public function __construct()
    {
    }

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
            for ($i = 1; $i <= $part->nb_questions; $i++) {
                $q = Question::create([
                    'version' => $part->version,
                    'question' => '',
                    'number' => $i,
                ]);

                for ($j = 0; $j < 4; $j++) {
                    $p = $q->proposals()->create(['value' => 'Answer']);
                    if ($i === array_search($answers[$i], $matching)) {
                        $q->answer()->associate($p)->save();
                    }
                }

                $questions_object[$i] = $q;
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
        $handle = fopen($request->file('questions')->path(), "r");

        while(!feof($handle))
        {
            $line = fgets($handle);
            if (preg_match(
                    '/^(?P<number>\d+)\.( (?P<question>.*))?/',
                    $line,
                    $data_question
                ) != FALSE) {

                if (!empty($question_data)) {
                    $questions[] = $question_data;
                }

                // Beginning of the question.

                if (!empty($text)) {
                    $text['number'][] = $data_question['number'];
                }

                if (isset($data_question['question'])) {
                    $line = str_replace("\r\n", ' ', $data_question['question']);
                }

                $question_string .= ' ' . $line;

                $line = fgets($handle);

                // Get all the question.
                while(preg_match(
                        '/^\((?P<index>[A-D])\) (?P<answer>.+)/',
                        $line,
                        $data_answer
                    ) == FALSE) {
                    $line = str_replace("\r\n", ' ', $line);
                    $question_string .= '' . $line;
                    $line = fgets($handle);
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

                $answer['answer'] = $line;
                $answer['index'] = $data_answer['index'];

                $question_data['answers'][] = $answer;
            } elseif (preg_match(
                    '/^\((?P<index>[A-D])\) (?P<answer>.+)/',
                    $line,
                    $data_answer
                ) != FALSE) {
                if (!empty($question_string)) {
                    $question_data['question'] = trim($question_string);
                    $question_string = '';
                }
                $line = str_replace("\r\n", ' ', $data_answer['answer']);

                $answer['answer'] = $line;
                $answer['index'] = $data_answer['index'];

                $question_data['answers'][] = $answer;
            } else {
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
                $content_string .= trim($line);

                $line = fgets($handle);
                // Get all the document.
                while(preg_match(
                        '/^(?P<number>\d+)\.( (?P<question>.*))?/',
                        $line,
                        $data_question
                    ) == FALSE) {
                    $line = str_replace("\r\n", '<br/>', $line);
                    $content_string .= trim($line);
                    $line = fgets($handle);
                }

                preg_match(
                    '/^(?P<number>\d+)\.( (?P<question>.*))?/',
                    $line,
                    $data_question
                );
                $question_data['number'] = $data_question['number'];
                if (isset($data_question['question'])) {
                    $line = str_replace("\r\n", ' ', $data_question['question']);
                }

                $question_data['question'] = $line;
                $text['content'] = $content_string;
                $text['number'][] = $data_question['number'];

                // Manage question.
                $line = str_replace("\r\n", ' ', $line);
                $question_string .= ' ' . $line;
            }
        }

        if (!empty($question_data)) {
            $questions[] = $question_data;
        }

        if (!empty($text)) {
            $texts[] = $text;
        }

        fclose($handle);
    }

    protected function manageDocuments($request, &$documents, $field, $type) {
        $already = [];

        if ($request->file($field)->getClientMimeType() === 'application/zip') {
            $zip = new \ZipArchive();
            $file = $request->file($field);

            if ($zip->open($file->getRealPath(), \ZipArchive::CREATE) == TRUE) {
                $zip->extractTo('./storage/documents');
                $repository_name = str_replace('.zip', '', $file->getClientOriginalName());

                if ($repository = opendir('./storage/documents/' . $repository_name)) {
                    while (false !== ($current_file = readdir($repository))) {
                        if (preg_match(
                                '/^(?<name>.*)_(?P<number_start>\d+)[~-]?(?P<number_end>\d*)%?(?P<doc_number>\d*)(?P<extension>.\w+)$/',
                                $current_file,
                                $data_file
                            ) != FALSE) {

                            $new_file = $repository_name
                                . '_'
                                . $data_file['number_start']
                                . '-'
                                . $data_file['number_end'];

                            if (!empty($data_file['doc_number'])) {
                                $new_file .= '%' . $data_file['doc_number'];
                            }

                            $new_file .= $data_file['extension'];

                            rename('./storage/documents/' . $repository_name . '/' . $current_file, './storage/documents/' . $repository_name . '/' . $new_file);

                            if (!in_array('./documents/' . $repository_name . '/' . $new_file, $already)) {
                                $document = Document::create([
                                    'name' => $new_file,
                                    'type' => $type,
                                    'url' => './documents/' . $repository_name . '/' . $new_file,
                                ]);

                                $already[] = './documents/' . $repository_name . '/' . $new_file;

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
            }
        }
    }
}
