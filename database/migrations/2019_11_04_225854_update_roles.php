<?php

use App\User;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateRoles extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $teachers = User::whereHas("roles", function($q){ $q->where("name", "teacher"); })->get();

        foreach ($teachers as $teacher) {
            if (!$teacher->hasRole('student')) {
                $teacher->assignRole('student');
            }
        }

        $admins = User::whereHas("roles", function($q){ $q->where("name", "admin"); })->get();

        foreach ($admins as $admin) {
            if (!$admin->hasRole('teacher')) {
                $admin->assignRole('teacher');
            }

            if (!$teacher->hasRole('student')) {
                $teacher->assignRole('student');
            }
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
