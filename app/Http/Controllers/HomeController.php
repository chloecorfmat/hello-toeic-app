<?php

namespace App\Http\Controllers;

use App\Trial;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware(['permission:test-execute'])->only('train');
    }

    /**
     * Show the user profile dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function home() {
        return redirect()->route('profile');
    }

    /**
     * Show the user profile dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = \Auth::user();

        if ($user->hasPermissionTo('dashboard-students-see')) {
            $trials = Trial::orderBy('datetime', 'DESC')
                ->get();
        } else {
            // Get all tests passed.
            $trials = Trial::where('user_id', '=', $user->id)
                ->orderBy('datetime', 'DESC')
                ->get();
        }

        $datas = [
            'user' => $user,
            'trials' => $trials,
        ];

        return view('profile', compact('datas'));
    }

    /**
     * Show the different possibilities to train the user.
     *
     * @return \Illuminate\Http\Response
     */
    public function train() {
        return view('train');
    }
}
