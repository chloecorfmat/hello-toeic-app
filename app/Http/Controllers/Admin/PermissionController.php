<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{

    /**
     * Constructor.
     */
    public function __construct()
    {
        $this->middleware(['permission:permissions-manage']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $roles = Role::orderBy('id', 'DESC')->paginate(15);
        $perms = Permission::orderBy('id','DESC')->paginate(15);
        $sync = [];
        foreach ($perms as $perm) {
            $sync[$perm['name']] = [];
            foreach ($roles as $role) {
                if ($role->hasPermissionTo($perm['name'])) {
                    $sync[$perm['name']][] = $role['name'];
                }
            }
        }

        $datas = [
            'roles' => $roles,
            'permissions' => $perms,
            'sync' => $sync,
        ];

        return view('admin.permissions.index',compact('datas'))
            ->with('i', ($request->input('page', 1) - 1) * 5);
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
        $roles = Role::orderBy('id', 'DESC')->paginate(15);
        $permissions = Permission::orderBy('id','DESC')->paginate(15);

        foreach ($permissions as $permission) {
            $values = $request->get($permission->name);

            foreach ($roles as $role) {
                if (is_array($values) && in_array($role->id, $values)) {
                    $role->givePermissionTo($permission->name);
                } else {
                    $role->revokePermissionTo($permission->name);
                }
            }
        }

        return redirect()->route('permissions.index')->with('success', trans('permissions.updated'));
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
}
