<?php

namespace App\Http\Controllers\Admin;

use App\Group;
use App\Http\Controllers\Controller;
use App\Services\FlashService;
use App\Services\StringService;
use App\User;
use DaveJamesMiller\Breadcrumbs\Facades\Breadcrumbs;
use Illuminate\Http\Request;
use Webpatser\Sanitize\Sanitize;


class GroupController extends Controller
{
    /**
     * Constructor.
     */
    public function __construct()
    {
        $this->middleware(['permission:groups-manage']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $groups = Group::orderBy('start_date')->get();
        $teachers = [];


        foreach ($groups as $group) {
            if (!isset($teachers[$group->teacher])) {
                $teachers[$group->teacher] = User::find($group->teacher);
            }
        }

        $common_data['active_trail'] = 'teacher-users';
        $common_data['header'] = [
            'title' => trans('groups.list'),
            'breadcrumb' => Breadcrumbs::generate('groups.index'),
            'theme' => 'colored-background',
        ];
        $common_data['flashs'] = FlashService::getMessages();

        return view('admin.groups.index', compact('groups', 'teachers', 'common_data'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $teachers = User::whereHas("roles", function($q){ $q->where("name", "teacher"); })->get();
        $students = User::whereHas("roles", function($q){ $q->where("name", "student"); })->get();

        $common_data['active_trail'] = 'teacher-users';
        $common_data['header'] = [
            'title' => trans('groups.add'),
            'breadcrumb' => Breadcrumbs::generate('groups.create'),
            'theme' => 'colored-background',
        ];
        $common_data['flashs'] = FlashService::getMessages();

        return view('admin.groups.create', compact('teachers', 'students', 'common_data'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();

        $start_date = new \DateTime($data['start']);
        $end_date = new \DateTime($data['end']);
        $diff = $start_date->diff($end_date);

        if (!$diff->invert) {
            $exist = count(Group::where('machine_name', Sanitize::string($data['name']))->get());

            if ($exist > 0) {
                return redirect()->route('groups.create')->withErrors([trans('groups.unique_constraint')]);
            }

            $group = Group::create([
                'name' => $data['name'],
                'start_date' => $data['start'],
                'end_date' => $data['end'],
                'teacher' => $data['teacher'],
                'machine_name' => Sanitize::string($data['name']),
            ]);

            if (isset($data['students'])) {
                $group->users()->attach($data['students']);
            }

            return redirect()->route('groups.index')->with('success', trans('groups.added'));
        } else {
            return redirect()->route('groups.index')->with('error', trans('form.start-end-date_constraint'));
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $group = Group::find($id);

        if (is_null($group)) {
            abort(404);
        }

        $teacher = User::find($group->teacher);

        $students = $group->users()->get();

        $common_data['active_trail'] = 'teacher-users';
        $common_data['header'] = [
            'title' => trans('common.details') . ': ' . $group->name,
            'breadcrumb' => Breadcrumbs::generate('groups.show', $group),
            'theme' => 'colored-background',
        ];
        $common_data['flashs'] = FlashService::getMessages();

        return view('admin.groups.show', compact('group', 'teacher', 'students', 'common_data'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $group = Group::find($id);

        if (is_null($group)) {
            abort(404);
        }

        $teachers = User::whereHas("roles", function($q){ $q->where("name", "teacher"); })->get();

        $common_data['active_trail'] = 'teacher-users';
        $common_data['header'] = [
            'title' => trans('groups.edit-this', ['name' => $group->name]),
            'breadcrumb' => Breadcrumbs::generate('groups.edit', $group),
            'theme' => 'colored-background',
        ];
        $common_data['flashs'] = FlashService::getMessages();

        return view('admin.groups.edit', compact('group', 'teachers', 'common_data'));
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
        $data = $request->all();
        $group = Group::find($id);

        $start_date = new \DateTime($data['start']);
        $end_date = new \DateTime($data['end']);
        $diff = $start_date->diff($end_date);

        if (!$diff->invert) {
            $group->name = $data['name'];
            $group->start_date = $data['start'];
            $group->end_date = $data['end'];
            $group->teacher = $data['teacher'];
            $group->save();

            return redirect()->route('groups.edit', [$id])->with('success', trans('groups.updated'));
        } else {
            return redirect()->route('groups.edit', [$id])->withErrors([trans('form.start-end-date_constraint')]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $group = Group::find($id);

        if (is_null($group)) {
            abort(404);
        }

        if ($group->lessons()->count() > 0) {
            $lessons = $group->lessons()->get();

            foreach ($lessons as $lesson) {
                $lesson->delete();
            }
        }

        if ($group->users()->count() > 0) {
            $users = $group->users()->get();
            $group->users()->detach($users);
            $group->save();
        }

        $group->delete();

        return redirect()->route('groups.index')->with('success', trans('groups.deleted'));
    }

    /**
     * Display a confirmation form before destroy model.
     *
     * @return \Illuminate\Http\Response
     */
    public function delete($id) {
        $group = Group::find($id);

        if (is_null($group)) {
            abort(404);
        }

        $common_data['active_trail'] = 'teacher-users';
        $common_data['header'] = [
            'title' => trans('groups.delete-this', ['name' => $group->name]),
            'breadcrumb' => Breadcrumbs::generate('groups.delete'),
            'theme' => 'colored-background',
        ];
        $common_data['flashs'] = FlashService::getMessages();

        return view('admin.groups.delete', compact('group', 'common_data'));
    }

    public function assign() {
        $common_data['active_trail'] = 'teacher-users';
        $common_data['header'] = [
            'title' => trans('groups.assign_title'),
            'breadcrumb' => Breadcrumbs::generate('groups.assign'),
            'theme' => 'colored-background',
        ];
        $common_data['flashs'] = FlashService::getMessages();

        return view('admin.groups.assign', compact('common_data'));
    }

    public function storeAssign(Request $request) {
        $group_warning = trans('messages.these-groups-not-exist');
        $student_warning = trans('messages.these-students-not-exist');

        $group_message = "";
        $student_message = "";

        $handle = file($request->file('data')->path());
        if (sizeof($handle) === 1) {
            $handle = explode("\r", $handle[0]);
        }

        $group = null;
        $students = null;

        foreach ($handle as $line) {
            $line = str_replace("\n", "", $line);
            if (!is_numeric($line)) {
                if (!is_null($students) && !is_null($group)) {
                    $group->users()->attach($students);
                    $group->save();

                    $group = null;
                    $students = null;
                }

                if ($line !== "") {
                    $group = Group::where('machine_name', str_replace("\n", "", $line))->get()->first();
                    $students = null;

                    if (is_null($group)) {
                        if ($group_message !== "") {
                            $group_message .= ', ' . str_replace("\n", "", $line);
                        } else {
                            $group_message = $group_warning . str_replace("\n", "", $line);
                        }
                    }
                }

            } else {
                if (!is_null($group)) {
                    $student = User::where('matricule', str_replace("\n", "", $line))->get()->first();
                    if (!is_null($student) && count($student->groups()->where('group_id', $group->id)->get()) === 0) {
                        $students[] = $student->id;
                    } else {
                        if (is_null($student)) {
                            if ($student_message !== "") {
                                $student_message .= ', ' . str_replace("\n", "", $line);
                            } else {
                                $student_message = $student_warning . str_replace("\n", "", $line);
                            }
                        }
                    }
                }
            }
        }

        if (!is_null($group) && !is_null($students)) {
            $group->users()->attach($students);
            $group->save();
        }

        $message = "";

        if ($group_message !== "") {
            $message = "<p>" . $group_message . "</p>";
        }

        if ($student_message !== "") {
            if ($message !== "") {
                $message .= "<br />";
            }

            $message .= "<p>" . $student_message . "</p>";
        }

        return redirect()->route('groups.index')
            ->with('success', trans('groups.imported'))
            ->with('warning', $message);
    }

    public function unassign($group, $student) {
        $g_model = Group::find($group);
        $s_model = User::find($student);

        if (!is_null($s_model)) {
            $s_groups = $s_model->groups()->get();

            foreach ($s_groups as $s_group) {
                if ($s_group->id == $group) {
                    $g_model->users()->detach($student);

                    return redirect()
                        ->route('groups.show', ['id' => $group])
                        ->with('success', trans('messages.student-deleted-from-groups', [
                            'student' => $s_model->name,
                            'group' => $g_model->name,
                        ]));
                }
            }
        }

        return redirect()
            ->route('groups.show', ['id' => $group])
            ->with('error', trans('messages.error-occured'));
    }

    public function import() {
        $common_data['active_trail'] = 'teacher-users';
        $common_data['header'] = [
            'title' => trans('groups.import_title'),
            'breadcrumb' => Breadcrumbs::generate('groups.import'),
            'theme' => 'colored-background',
        ];
        $common_data['flashs'] = FlashService::getMessages();

        return view('admin.groups.import', compact('common_data'));
    }

    public function storeImport(Request $request) {
        $errors = [];
        $groups = [];
        $handle = file($request->file('data')->path());
        if (sizeof($handle) === 1) {
            $handle = explode("\r", $handle[0]);
        }

        $i = 0;

        while($i < sizeof($handle)) {
            $line = str_replace("\n", "", $handle[$i]);
            $line_nb = $i+1;
            if (!empty($line)) {
                $data = explode("\t", $line);

                $teacher = User::where('name', $data[1])->get()->first();
                $is_teacher = $teacher ? $teacher->hasRole('teacher') : false;

                if ($is_teacher) {
                    $machine_name = Sanitize::string($data[0]);

                    $exist = count(Group::where('machine_name', Sanitize::string($data[0]))->get());

                    if ($exist > 0) {
                        $errors[] = '(l.' . $line_nb . ') : Group "' . $data[0] . '" already exists.';
                    } else {
                        $start_date = \DateTime::createFromFormat('d/m/Y', $data[2]);
                        $end_date = \DateTime::createFromFormat('d/m/Y', $data[3]);

                        $diff = $start_date->diff($end_date);

                        if ($diff->invert) {
                            $errors[] = trans('messages.line-number', ['number' => $line_nb]) . ' : ' . trans('form.start-end-date_constraint');
                        } else {

                            $imported = FALSE;

                            foreach ($groups as $group) {
                                if ($machine_name === $group['machine_name']) {
                                    $imported = TRUE;
                                }
                            }

                            if (!$imported) {
                                $groups[] = [
                                    'name' => addslashes($data[0]),
                                    'start_date' => $start_date,
                                    'end_date' => $end_date,
                                    'teacher' => $teacher->id,
                                    'machine_name' => $machine_name,
                                ];
                            } else {
                                $errors[] = trans('messages.line-number', ['number' => $line_nb]) . ' : ' . trans('groups.imported-in-this-file', ['group' => $data[0]]);
                            }
                        }

                    }
                } else {
                    $errors[] = trans('messages.line-number', ['number' => $line_nb]) . ' : ' . trans('messages.user-not-teacher', ['user' => addslashes($data[1])]);
                }
            }
            $i++;
        }

        if (empty($errors)) {
            foreach ($groups as $group) {
                Group::create([
                    'name' => $group['name'],
                    'start_date' => $group['start_date'],
                    'end_date' => $group['end_date'],
                    'teacher' => $group['teacher'],
                    'machine_name' => $group['machine_name'],
                ]);
            }

            return redirect()->route('groups.index')->with('success', trans('groups.added'));
        } else {
            return redirect()->route('groups.import')->withErrors($errors);
        }

    }
}
