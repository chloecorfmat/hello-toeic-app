<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function users($page)
    {
        $current_user = \Auth::user();

        $skip = ($page-1)*30;
        $users = User::skip($skip)->take(30)->get();
        $users_nb = User::all()->count();
        return response()->json([
            'current_user' => $current_user,
            'users' => $users,
            'users_nb' => $users_nb,
        ]);
    }
}
