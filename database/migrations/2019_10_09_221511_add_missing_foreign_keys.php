<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddMissingForeignKeys extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('user_badge_type_progression', function(Blueprint $table) {
            $table->foreign('user_id', 'fk_userbadgetype_users_userid')
                ->references('id')->on('users');

            $table->foreign('badge_type_id', 'fk_userbadge_badgetypes_badgetypeid')
                ->references('id')->on('badges');
        });

        Schema::table('user_badge', function(Blueprint $table) {
            $table->foreign('user_id', 'fk_userbadge_users_userid')
                ->references('id')->on('users');

            $table->foreign('badge_id', 'fk_userbadge_badges_badgeid')
                ->references('id')->on('badges');
        });

        Schema::table('badges', function(Blueprint $table) {
            $table->foreign('badge_type_id', 'fk_badges_badgetypes_badgetypeid')
                ->references('id')->on('badge_types');

            $table->foreign('level_id', 'fk_badges_level_levelid')
                ->references('id')->on('levels');
        });

        Schema::table('lessons', function(Blueprint $table) {
            $table->foreign('group_id', 'fk_lessons_groups_group_id')
                ->references('id')->on('groups');
            $table->foreign('composite_test_id', 'fk_lessons_composite_tests_composite_test_id')
                ->references('id')->on('composite_tests');
        });

        Schema::table('user_group', function(Blueprint $table) {
            $table->foreign('user_id', 'fk_usergroup_users_userid')
                ->references('id')->on('users');
            $table->foreign('group_id', 'fk_usergroup_groups_groupid')
                ->references('id')->on('groups');
        });

        Schema::table('groups', function(Blueprint $table) {
            $table->foreign('teacher', 'fk_groups_users_teacher')
                ->references('id')->on('users');
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
