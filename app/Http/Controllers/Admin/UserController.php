<?php

namespace App\Http\Controllers\Admin;

use App\Group;
use App\Http\Controllers\Controller;
use App\Mail\UserAccountCreated;
use App\Setting;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Spatie\Permission\Models\Role;

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
        $is_admin = auth()->user()->hasRole('admin');
        if ($is_admin) {
            $users = User::all();
        } else {
            // Get all students.
            $users = User::whereHas("roles", function($q){ $q->whereIn("name", ["student", "teacher"]); })->get();
        }

        return view('admin.users.index', compact('users', 'is_admin'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $is_admin = auth()->user()->hasRole('admin');
        return view('admin.users.create', compact('is_admin'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $existEmail = User::where('email', $request->get('email'))->count();
        $existMatricule = User::where('matricule', $request->get('matricule'))->count();

        if (!$existEmail && !$existMatricule) {
            $user = User::create([
                'name' => $request->get('name'),
                'matricule' => $request->get('matricule'),
                'email' => $request->get('email'),
                'course' => $request->get('course'),
                'password' => Hash::make($request->get('matricule')),
                'passed' => $request->get('passed'),
            ]);

            $user->assignRole($request->get('role'));

            if (Setting::where('key', 'ff.email')->first()->value == true) {
                //Mail::to($user)->send(new UserAccountCreated($user));
            }

            return redirect()->route('users.index')->with('success', trans('users.added'));
        }

        return redirect()->route('users.create')->withErrors([trans('users.unique_constraint')]);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::find($id);

        if (is_null($user)) {
            abort(404);
        }

        if ($user->hasRole('student')) {
            return redirect()->route('students.show', ['id' => $id]);
        }
        return view('admin.users.show', compact('user'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $current_is_admin = auth()->user()->hasRole('admin');
        $user = User::find($id);

        if (!$current_is_admin && !$user->hasRole('student') ) {
            abort(403);
        }

        $groups = [];
        $current_groups = [];
        $is_student = $user->hasRole('student');

        if ($is_student) {
            $groups = Group::all();
            $currents = $user->groups()->get();

            foreach ($currents as $group) {
                $current_groups[] = $group->id;
            }
        }
        return view('admin.users.edit', compact('user', 'is_student', 'groups', 'current_groups'));
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
        $user = User::find($id);

        $existEmail = User::where('email', $request->get('email'))
            ->where('id', '<>', $id)
            ->count();
        $existMatricule = User::where('matricule', $request->get('matricule'))
            ->where('id', '<>', $id)
            ->count();

        if (!$existEmail && !$existMatricule) {
            $user->name = $request->get('name');
            $user->matricule = $request->get('matricule');
            $user->email = $request->get('email');
            $user->course = $request->get('course');
            $user->passed = $request->get('passed');

            $user->groups()->detach();
            $user->groups()->attach($request->get('groups'));

            $user->save();

            return redirect()->route('users.edit', [$id])->with('success', trans('users.updated'));
        }

        return redirect()->route('users.edit', [$id])->withErrors([trans('users.unique_constraints')]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::find($id);
        $composite_trials = $user->composite_trials()->get();
        $trials = $user->trials()->get();
        $games = $user->games()->get();

        foreach ($trials as $trial) {
            $trial->composite_trial_id = null;
            $trial->corrections()->delete();
            $trial->save();
            $trial->delete();
        }

        foreach ($composite_trials as $composite_trial) {
            $composite_trial->delete();
        }

        foreach ($games as $game) {
            $game->delete();
        }

        $user->delete();

        if (auth()->user()->hasRole('admin')) {
            return redirect()->route('users.index')->with('success', trans('users.deleted'));
        }

        return redirect()->route('students.index')->with('success', trans('students.deleted'));
    }

    /**
     * Display a confirmation form before destroy model.
     *
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $user = User::find($id);
        return view('admin.users.delete', compact('user'));
    }

    public function import() {
        return view('admin.users.import');
    }

    public function storeImport(Request $request) {
        $lines = file($request->file('file')->path());
        if (sizeof($lines) === 1) {
            $lines = explode("\r", $lines[0]);
        }

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
                        'password' => Hash::make(str_replace("\n", "", $data[5])),
                    ]);

                    $user->assignRole($role);

                    if (Setting::where('key', 'ff.email')->first()->value == true) {
                        //Mail::to($user)->send(new UserAccountCreated($user));
                    }

                } else {
                    $warnings[] = '<strong class="important">' . $data[0] . '</strong> ' . trans('common.already-exists') . ' (' . $email . ').';
                }
            }
        }

        if (empty($warnings)) {
            return redirect()->route('students.index')->with('success', trans('users.imported'));
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
