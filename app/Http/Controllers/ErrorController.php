<?php

namespace App\Http\Controllers;


use App\Services\FlashService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ErrorController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function blockedAccount(Request $request) {
        return view('errors.blocked-account')->withErrors(['Your account has been blocked.']);
    }
}
