<?php

namespace App\Services;

use App\Setting;

/**
 * Class RenderService
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

    public function t($key) {
        return Setting::where('type', 'wording')
            ->where('key', $key)->get()->first()->value;
    }
}
