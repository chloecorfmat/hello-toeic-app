<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    public function index(Request $request) {
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

        $t = null;
        return response()->json($sync);
    }
}
