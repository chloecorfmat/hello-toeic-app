<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserBadgeTypeProgressionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_badge_type_progression', function (Blueprint $table) {
            $table->unsignedInteger('user_id');
            $table->unsignedBigInteger('badge_type_id');
            $table->unsignedInteger('nb_repetitions');

            $table->primary(['user_id', 'badge_type_id']);

            $table->foreign('user_id', 'fk_userbadgetype_users_userid')
                ->references('id')->on('users');

            $table->foreign('badge_type_id', 'fk_userbadge_badgetypes_badgetypeid')
                ->references('id')->on('badges');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_badge_type_progression');
    }
}
