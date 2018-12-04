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
        $permissions_admin = [
            'dashboard-own-see',
            'dashboard-students-see',
            'document-add',
            'document-show',
            'document-list',
            'document-update',
            'profile-own-update',
            'profile-students-update',
            'profile-teachers-update',
            'question-add',
            'question-show',
            'question-list',
            'question-update',
            'test-add',
            'test-execute',
            'test-list',
            'trial-show',
        ];

        $permissions_teacher = [
            'dashboard-own-see',
            'dashboard-students-see',
            'document-add',
            'document-show',
            'document-list',
            'document-update',
            'profile-own-update',
            'profile-students-update',
            'question-add',
            'question-show',
            'question-list',
            'question-update',
            'test-add',
            'test-execute',
            'test-list',
            'trial-show',
        ];

        $permissions_student = [
            'dashboard-own-see',
            'profile-own-update',
            'test-execute',
            'test-list',
            'trial-show',
        ];

        $admin = Role::findByName('admin');
        $teacher = Role::findByName('teacher');
        $student = Role::findByName('student');

        foreach ($permissions_admin as $permission) {
            Permission::create(['name' => $permission]);
            $admin->givePermissionTo($permission);

            if (in_array($permission, $permissions_teacher)) {
                $teacher->givePermissionTo($permission);
            }

            if (in_array($permission, $permissions_student)) {
                $student->givePermissionTo($permission);
            }
        }
    }
}
