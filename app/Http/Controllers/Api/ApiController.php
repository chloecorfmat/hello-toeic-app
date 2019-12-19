<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\TranslationLoader\LanguageLine;

class ApiController extends Controller
{

    public function translations(Request $request) {
        $lang = $request->cookie('lang');
        $translations = [];
        $language_lines = LanguageLine::all();

        foreach ($language_lines as $language_line) {
            $key = $language_line->group . '_' . $language_line->key;

            foreach ($language_line->text as $l => $text) {
                if ($l === $lang) {
                    $translations[$key] = $text;
                }
            }
        }

        return response()->json($translations);
    }
}
