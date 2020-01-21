<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Setting;
use Illuminate\Http\Request;

class WordingController extends Controller
{
    public function index(Request $request) {
        $wordings = LanguageLine::orderBy('group', 'asc')
            ->orderBy('key', 'asc')
            ->get();
        return response()->json($wordings);
    }
}
