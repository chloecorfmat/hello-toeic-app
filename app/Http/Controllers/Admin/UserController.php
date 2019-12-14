<?php

namespace App\Http\Controllers\Admin;

use App\Disability;
use App\Group;
use App\Http\Controllers\Controller;
use App\Mail\UserAccountCreated;
use App\Setting;
use App\User;
use DaveJamesMiller\Breadcrumbs\Facades\Breadcrumbs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Constructor.
     */
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware(['permission:users-manage'])->except('show');
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

        $common_data['active_trail'] = 'teacher-users';

        $common_data['header'] = [
            'title' => trans('users.list'),
            'breadcrumb' => Breadcrumbs::generate('users.index'),
            'theme' => 'colored-background',
        ];

        return view(
            'admin.users.index',
            compact(
                'users',
                'is_admin',
                'common_data'
            )
        );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $is_admin = auth()->user()->hasRole('admin');

        $common_data['active_trail'] = 'teacher-users';
        $common_data['header'] = [
            'title' => trans('users.add'),
            'breadcrumb' => Breadcrumbs::generate('users.create'),
            'theme' => 'colored-background',
        ];

        return view(
            'admin.users.create',
            compact(
                'is_admin',
                'common_data'
            )
        );
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
                'api_token' => Str::random(60),
                'passed' => $request->get('passed'),
                'promo' => $request->get('course') ? intval(substr($request->get('course'), -4)) : NULL,
            ]);

            $role = $request->get('role');

            switch($role) {
                case 'admin':
                    $user->assignRole('admin');
                    $user->assignRole('teacher');
                    $user->assignRole('student');
                    break;
                case 'teacher':
                    $user->assignRole('teacher');
                    $user->assignRole('student');
                    break;
                default:
                    $user->assignRole('student');
                    break;
            }

            if (($user->promo != NULL) && (strpos($user->email, '@enssat.fr') !== false)) {
                $pos = strpos($user->email, '@enssat.fr');
                $login = substr($user->email, 0, $pos);
                $url = 'https://intranet.enssat.fr/bindocs/trombi/' . $user->promo  . '/' . $user->promo  . '_' . $login . '.jpg';
                $user->picture = $url;
                $user->save();
            }

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

        $common_data['active_trail'] = 'teacher-users';
        $common_data['header'] = [
            'title' => trans('common.details') . ': ' . $user->name,
            'breadcrumb' => Breadcrumbs::generate('users.show', $user),
            'theme' => 'colored-background',
        ];

        return view(
            'admin.users.show',
            compact(
                'user',
                'common_data'
            )
        );
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

        if (is_null($user)) {
            abort(404);
        }

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

        $common_data['active_trail'] = 'teacher-users';
        $common_data['header'] = [
            'title' => trans('users.edit-this', ['name' => $user->name]),
            'breadcrumb' => Breadcrumbs::generate('users.edit', $user),
            'theme' => 'colored-background',
        ];

        return view(
            'admin.users.edit',
            compact(
                'user',
                'is_student',
                'groups',
                'current_groups',
                'common_data'
            )
        );
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

        if (is_null($user)) {
            abort(404);
        }

        $existEmail = User::where('email', $request->get('email'))
            ->where('id', '<>', $id)
            ->count();
        $existMatricule = User::where('matricule', $request->get('matricule'))
            ->where('id', '<>', $id)
            ->count();

        if (!$existEmail && !$existMatricule) {
            $user->name = $request->get('name');
            $user->matricule = $request->get('matricule');

            $email = $request->get('email');
            $user->email = $email;

            $user->course = $request->get('course');
            $user->passed = $request->get('passed');

            $promo = $request->get('course') ? intval(substr($request->get('course'), -4)) : NULL;
            $user->promo = $promo;

            if (($promo != NULL) && (strpos($email, '@enssat.fr') !== false)) {
                $pos = strpos($email, '@enssat.fr');
                $login = substr($email, 0, $pos);
                $url = 'https://intranet.enssat.fr/bindocs/trombi/' . $promo  . '/' . $promo  . '_' . $login . '.jpg';
                $user->picture = $url;
            } else {
                $user->picture = NULL;
            }

            $user->groups()->detach();
            $user->groups()->attach($request->get('groups'));

            // Manage disability.
            if ($request->get('disabilities')) {
                if ($user->disabilities()->count() === 0) {
                    $date = (new \DateTime())->format('y-m-d');
                    Disability::create([
                        'user_id' => $user->id,
                        'start_date' => $date,
                    ]);
                }
            } else {
                if ($user->disabilities()->count() > 0) {
                    $disabilities = $user->disabilities()->get();

                    foreach ($disabilities as $disability) {
                        $disability->delete();
                    }
                }
            }

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

        if (is_null($user)) {
            abort(404);
        }

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

        if (is_null($user)) {
            abort(404);
        }

        $common_data['active_trail'] = 'teacher-users';
        $common_data['header'] = [
            'title' => trans('users.delete-this', ['name' => $user->name]),
            'breadcrumb' => Breadcrumbs::generate('users.delete', $user),
            'theme' => 'colored-background',
        ];

        return view(
            'admin.users.delete',
            compact(
                'user',
                'common_data'
            )
        );
    }

    public function import() {
        $common_data['active_trail'] = 'teacher-users';
        $common_data['header'] = [
            'title' => trans('users.import_title'),
            'breadcrumb' => Breadcrumbs::generate('users.import'),
            'theme' => 'colored-background',
        ];

        return view('admin.users.import', compact('common_data'));
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
                $matricule = $data[5];

                $existEmail = User::where('email', $email)->count();
                $existMatricule = User::where('matricule', $matricule)->count();

                if (!$existEmail && !$existMatricule) {
                    $user = User::create([
                        'name' => $data[0],
                        'matricule' => $data[5],
                        'email' => $email,
                        'course' => $data[3] . $data[2],
                        'promo' => $data[2],
                        'password' => Hash::make(str_replace("\n", "", $data[5])),
                        'api_token' => Str::random(60),
                    ]);

                    $user->assignRole($role);

                    if ($role === 'teacher') {
                        $user->assignRole('student');
                    }

                    if (($user->promo != NULL) && ($request->get('suffix_mail') === "@enssat.fr")) {
                        $login = $data[1];
                        $url = 'https://intranet.enssat.fr/bindocs/trombi/' . $user->promo  . '/' . $user->promo  . '_' . $login . '.jpg';
                        $user->picture = $url;
                    }

                    $user->save();

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

    public function blocked() {
        $users = User::where('status', 0)
            ->where('consent_at' , NULL)
            ->get();

        $common_data['active_trail'] = 'teacher-users';
        $common_data['header'] = [
            'title' => trans('users.blocked'),
            'breadcrumb' => Breadcrumbs::generate('users.blocked'),
            'theme' => 'colored-background',
        ];

        return view(
            'admin.users.blocked',
            compact(
                'users',
                'common_data'
            )
        );
    }

    public function activate(Request $request, $id) {
        $user = User::find($id);
        if (!$user->status) {
            $user->status = 1;
            $user->save();

            return redirect()->route('users.edit', [$id])->with('success', trans('users.account-activate'));
        }

        return redirect()->route('users.edit', [$id]);
    }

    public function v2($page = 1)
    {
        $is_admin = auth()->user()->hasRole('admin');
        $current_user = json_encode(\Auth::user());
        $current_page = is_int(intval($page)) ? intval($page) : 1;

        $common_data['active_trail'] = 'teacher-users';
        $common_data['header'] = [
            'title' => trans('users.list'),
            'subtitle' => '('. User::all()->count() .' ' . trans('app.results') .')',
            'breadcrumb' => Breadcrumbs::generate('users.index'),
            'theme' => 'colored-background',
        ];

        return view(
            'admin.users.v2',
            compact(
                'is_admin',
                'current_user',
                'current_page',
                'common_data'
            )
        );
    }
}
