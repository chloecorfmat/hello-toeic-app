<?php

use App\Group;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddColumnMachinenameToGroupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('groups', function (Blueprint $table) {
            $table->string('machine_name');
        });

        $groups = Group::all();

        foreach ($groups as $group) {
            $group->machine_name = strtolower(trim($group->name));
            $group->save();
        }

        Schema::table('groups', function (Blueprint $table) {
            $table->unique('machine_name');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('groups', function (Blueprint $table) {
            //
        });
    }
}
