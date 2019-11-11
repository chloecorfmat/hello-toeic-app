<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $permissions = [
            'badges-manage',
            'users-manage',
            'tests-manage',
            'exercises-manage',
            'groups-manage',
            'lessons-manage',
            'parts-manage',
            'explanations-manage',
            'examples-manage',
            'permissions-manage',
            'features-manage',
            'configs-manage',
            'translations-manage',
            'results-see',
            'exercises-achieve',
            'tests-achieve',
            'games-achieve',
            'personal-data-export',
        ];

        $permissions_admin = [
            'permissions-manage',
            'features-manage',
            'configs-manage',
            'translations-manage',
            'users-manage',
        ];

        $permissions_teacher = [
            'badges-manage',
            'users-manage',
            'tests-manage',
            'exercises-manage',
            'groups-manage',
            'lessons-manage',
            'explanations-manage',
            'parts-manage',
            'examples-manage',
            'results-see',
            'personal-data-export',
        ];

        $permissions_student = [
            'exercises-achieve',
            'tests-achieve',
            'games-achieve',
            'personal-data-export',
        ];

        $admin = Role::findByName('admin');
        $teacher = Role::findByName('teacher');
        $student = Role::findByName('student');

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);

            if (in_array($permission, $permissions_admin)) {
                $admin->givePermissionTo($permission);
            }

            if (in_array($permission, $permissions_teacher)) {
                $teacher->givePermissionTo($permission);
            }

            if (in_array($permission, $permissions_student)) {
                $student->givePermissionTo($permission);
            }
        }
    }
}
