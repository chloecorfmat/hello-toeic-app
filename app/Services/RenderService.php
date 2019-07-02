<?php

namespace App\Services;

/**
 * From : https://gist.githubusercontent.com/jagneshchawla/3803671/raw/faa79cf90086d32b445c75cdfec53719a948b42b/audio%2520length%2520Mp3%2520class-%2520PHP
 * Class Mp3Service
 * @package App\Services
 */

class RenderService {

    public function inline($text, $questions, $exercise_nb) {
        $string = "<p>" . $text . "</p>";
        foreach ($questions as $key => $question) {
            if ($exercise_nb !== -1) {
                $name = "e" . $exercise_nb . "-q" . $question->id;
            } else {
                $name = $key;
            }
            $proposals = $question->proposals()->get();
            $build = "<select name='" . $name . "'>";
            $build .= "<option value=''>-</option>";

            foreach ($proposals as $proposal) {
                $build .= "<option value='";
                $build .= $proposal->id;
                $build .= "'>";
                $build .= $proposal->value;
                $build .= "</option>";
            }

            $build .= "</select>";

            $string = str_replace('---(' . $question->number . ')---', $build, $string);
        }

        return $string;
    }
}
