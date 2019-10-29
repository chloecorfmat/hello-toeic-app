<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function users(Request $request, $page = 1)
    {
        $current_user = \Auth::user();
        $query = User::query();

        if (!empty($request->get('search') && $request->get('search') !== "undefined")) {
            $search = $request->get('search');
            $query->where('name', 'LIKE', '%' . $search . '%');
        }

        if (!empty($request->get('sortBy')) && !empty($request->get('orderBy'))) {
            $query->orderBy($request->get('sortBy'), $request->get('orderBy'));
        }

        $skip = ($page-1)*30;
        if (!is_null($query)) {
            $users_nb = $query->count();
            $users = $query->skip($skip)->take(30)->get();

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
