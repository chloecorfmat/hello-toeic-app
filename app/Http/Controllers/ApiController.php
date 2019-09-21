<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function users(Request $request, $page = 1)
    {
        $current_user = \Auth::user();
        $query = null;

        if (!empty($request->get('search'))) {
            $search = $request->get('search');
            $query = User::where('name', 'LIKE', '%' . $search . '%');
        }

        $skip = ($page-1)*30;
        if (!is_null($query)) {
            $users = $query->skip($skip)->take(30)->get();
            $users_nb = $query->count();
        } else {
            $users = User::skip($skip)->take(30)->get();
            $users_nb = User::all()->count();
        }

        foreach ($users as $user) {
            $user->getRoleNames();
        }

        return response()->json([
            'current_user' => $current_user,
            'users' => $users,
            'users_nb' => $users_nb,
        ]);
    }
}
