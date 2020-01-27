<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\FlashService;
use DaveJamesMiller\Breadcrumbs\Facades\Breadcrumbs;
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
        $this->middleware(['role:admin']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $roles = Role::orderBy('id', 'DESC')->get();
        $perms = Permission::orderBy('id','DESC')->get();
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

        $common_data['active_trail'] = 'admin';
        $common_data['header'] = [
            'title' => trans('permissions.manage'),
            'breadcrumb' => Breadcrumbs::generate('permissions.index'),
            'theme' => 'colored-background',
        ];
        $common_data['flashs'] = FlashService::getMessages();

        return view('admin.permissions.index',compact('datas', 'common_data'))
            ->with('i', ($request->input('page', 1) - 1) * 5);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $roles = Role::orderBy('id', 'DESC')->get();
        $permissions = Permission::orderBy('id','DESC')->get();

        foreach ($permissions as $permission) {
            $values = $request->get($permission->name);

            foreach ($roles as $role) {
                if (is_array($values) && in_array(intval($role->id)-1, $values)) {
                    $role->givePermissionTo($permission->name);
                } else {
                    $role->revokePermissionTo($permission->name);
                }
            }
        }

        return redirect()->route('permissions.index')->with('success', trans('permissions.updated'));
    }
}
