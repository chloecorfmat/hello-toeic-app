<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserBadgeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_badge', function (Blueprint $table) {
            $table->unsignedInteger('user_id');
            $table->unsignedBigInteger('badge_id');
            $table->dateTime('datetime');

            $table->primary(['user_id', 'badge_id']);

            $table->foreign('user_id', 'fk_userbadge_users_userid')
                ->references('id')->on('users');

            $table->foreign('badge_id', 'fk_userbadge_badges_badgeid')
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
        Schema::dropIfExists('user_badge');
    }
}
