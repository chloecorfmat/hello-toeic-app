<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LocalizationController extends Controller
{
    /**
     * LocalizationController constructor.
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function getLang() {
        return \App::getLocale();
    }

    public function setLang(Request $request, $lang){
        \Session::put('lang', $lang);
        \App::setLocale($lang);
        setcookie('lang', $lang, 0, '/');
        return redirect()->back();
    }
}
