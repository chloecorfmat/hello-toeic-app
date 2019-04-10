<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
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
            return view('users.show', compact('user'));
        }

        abort(403);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

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

                return redirect()->route('student.users.show', ['id' => $id])->with('success', 'Password has been updated.');
            }

            return redirect()->route('student.users.show', ['id' => $id])->with('error', 'Passwords have to be equals and respect format.');
        }

        abort(403);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
