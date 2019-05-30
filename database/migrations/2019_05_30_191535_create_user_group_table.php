<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserGroupTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_group', function (Blueprint $table) {
            $table->unsignedInteger('user_id');
            $table->unsignedInteger('group_id');

            $table->primary(['user_id', 'group_id']);

            $table->foreign('user_id', 'fk_usergroup_users_userid')
                ->references('id')->on('users');
            $table->foreign('group_id', 'fk_usergroup_groups_groupid')
                ->references('id')->on('groups');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_group');
    }
}
