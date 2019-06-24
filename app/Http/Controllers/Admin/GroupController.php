<?php

namespace App\Http\Controllers\Admin;

use App\Group;
use App\Http\Controllers\Controller;
use App\Services\StringService;
use App\User;
use Illuminate\Http\Request;


class GroupController extends Controller
{
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

        return view('admin.groups.index', compact('groups', 'teachers'));
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
        return view('admin.groups.create', compact('teachers', 'students'));
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
            $exist = count(Group::where('machine_name', (new StringService($data['name']))->normalize())->get());

            if ($exist > 0) {
                return redirect()->route('groups.create')->withErrors(['A group with this name already exists.']);
            }

            $group = Group::create([
                'name' => $data['name'],
                'start_date' => $data['start'],
                'end_date' => $data['end'],
                'teacher' => $data['teacher'],
                'machine_name' => (new StringService($data['name']))->normalize(),
            ]);

            if (isset($data['students'])) {
                $group->users()->attach($data['students']);
            }

            return redirect()->route('groups.index')->with('success', 'Group has been created.');
        } else {
            return redirect()->route('groups.index')->with('error', 'Start date is after end date.');
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
        $teacher = User::find($group->teacher);

        $students = $group->users()->get();

        return view('admin.groups.show', compact('group', 'teacher', 'students'));
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

    public function assign() {
        return view('admin.groups.assign');
    }

    public function storeAssign(Request $request) {
        $group_warning = "Following groups do not exist : ";
        $student_warning = "Following students do not exist : ";

        $group_message = "";
        $student_message = "";


        $handle = file($request->file('data')->path());
        if (sizeof($handle) === 1) {
            $handle = explode("\r", $handle[0]);
        }

        $group = null;
        $students = null;

        foreach ($handle as $line) {
            if (intval($line) === 0) {
                if (!is_null($students) && !is_null($group)) {
                    $group->users()->attach($students);
                    $group->save();
                }

                if (str_replace("\n", "", $line) !== "") {
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
            ->with('success', 'Groups have been imported.')
            ->with('warning', $message);
    }
}
