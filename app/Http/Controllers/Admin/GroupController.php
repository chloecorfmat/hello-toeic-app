<?php

namespace App\Http\Controllers\Admin;

use App\Group;
use App\Http\Controllers\Controller;
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
            $group = Group::create([
                'name' => $data['name'],
                'start_date' => $data['start'],
                'end_date' => $data['end'],
                'teacher' => $data['teacher']
            ]);

            $group->users()->attach($data['students']);

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
}
