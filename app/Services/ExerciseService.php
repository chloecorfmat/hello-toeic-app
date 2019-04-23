<?php

namespace App\Services;

use App\Document;

/**
 * From : https://gist.githubusercontent.com/jagneshchawla/3803671/raw/faa79cf90086d32b445c75cdfec53719a948b42b/audio%2520length%2520Mp3%2520class-%2520PHP
 * Class Mp3Service
 * @package App\Services
 */

class ExerciseService {
    public function __construct()
    {
    }

    public function import($request) {
        $answers = [];
        $questions = [];
        $texts = [];
        $files = [];
        $audios = [];

        // Regexp to use.
        // ^(?<name>.*)_(?P<number_start>\d+)[~-]?(?P<number_end>\d*)%?(?P<doc_number>\d*)(?P<extension>.\w+)$

        // Manage answers.
        $this->manageAnswers($request, $answers);

        $this->buildTempQuestionsAndTextsArray($request, $questions, $texts);

        $this->manageDocuments($request, $files, 'documents', 'image');
        $this->manageDocuments($request, $audios, 'audios', 'audio');

        // @TODO 1 : Create exercise + link part.
        // @TODO 2 : Create question + link part + link exercise.
        // @TODO 3 : Create proposals + link question.
        // @TODO 4 : Initialize good answer.
        // @TODO 5 : Link documents (audios + files + texts) to question.

        $t = null; //@TODO : Remove this line.

        return true;
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

    // @TODO : build 1 array with questions + proposals AND 1 array with texts (similar to audios for example).
    protected function buildTempQuestionsAndTextsArray($request, &$questions, &$texts) {

    }

    protected function manageDocuments($request, &$documents, $field, $type) {
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

                            $document = Document::create([
                                'name' => $new_file,
                                'type' => $type,
                                'url' => './documents/' . $repository_name . '/' . $new_file,
                            ]);

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
