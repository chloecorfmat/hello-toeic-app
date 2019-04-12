<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware(['role:teacher|admin']);
    }

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
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        //
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

    public function import() {
        return view('admin.users.import');
    }

    public function storeImport(Request $request) {
        $handle = fopen($request->file('file')->path(), "r");

        $datas = fread($handle, filesize($request->file('file')->path()));
        $lines = explode(PHP_EOL, $datas);
        unset($lines[0]);
        $role = $request->get('role');

        foreach ($lines as $line) {
            if (!empty($line)) {
                $data = explode("\t", $line);

                $email = $data[1] . $request->get('suffix_mail');

                $existEmail = User::where('email', $email)->count();
                $existMatricule = User::where('matricule', $data[5])->count();

                if (!$existEmail && !$existMatricule) {
                    $user = User::create([
                        'name' => $data[0],
                        'matricule' => $data[5],
                        'email' => $email,
                        'course' => $data[3] . $data[2],
                        'password' => Hash::make($data[5]),
                    ]);

                    $user->assignRole($role);
                } else {
                    $warnings[] = '<strong class="important">' . $data[0] . '</strong> already exists (' . $email . ').';
                }
            }
        }

        if (empty($warnings)) {
            return redirect()->route('students.index')->with('success', 'Users have been created.');
        } else {
            $temp = '';

            foreach ($warnings as $warning) {
                $temp .= '<li class="list-item">' . $warning . '</li>';
            }

            $message = '<div class="alert-answer">' .
                '<ul>' . $temp .'</ul>' .
                '</div>';

            return redirect()->route('students.index')->with('warning', $message);
        }

    }
}
