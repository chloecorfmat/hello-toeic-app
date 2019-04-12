<?php

use App\User;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class FusionLastnameFirstname extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $users = User::all();

        foreach ($users as $user) {
            $user->lastname = $user->lastname . ' ' . $user->firstname;
            $user->save();
        }

        Schema::table('users', function (Blueprint $table) {
            $table->renameColumn('lastname', 'name');
        });
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
