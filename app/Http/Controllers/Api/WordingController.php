<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\TranslationLoader\LanguageLine;

class WordingController extends Controller
{
    public function index(Request $request) {
        $wordings = LanguageLine::orderBy('group', 'asc')
            ->orderBy('key', 'asc')
            ->get();
        return response()->json($wordings);
    }
}
