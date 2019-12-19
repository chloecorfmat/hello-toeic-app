<?php

namespace App\Http\Controllers;

use App\Services\FlashService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = Auth::user();

        if ($user->id == $id) {
            $common_data['flashs'] = FlashService::getMessages();
            return view('users.show', compact('user'));
        }

        abort(403);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = Auth::user();

        if ($user->id == $id) {
            $passwords = $request->all();

            $notEmpty = $passwords['password'] !== '';
            $match = $passwords['password'] === $passwords['password_repeat'];
            $regexp = preg_match('((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16})', $passwords['password']);

            if ($notEmpty && $match && $regexp) {
                $user->password = bcrypt($passwords['password']);
                $user->save();

                return redirect()->route('student.users.show', ['id' => $id])->with('success', trans('messages.password-updated'));
            }

            return redirect()->route('student.users.show', ['id' => $id])->with('error', trans('form.password-constraints'));
        }

        abort(403);
    }
}
