<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGamesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('games', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('score');
            $table->dateTime('datetime');
            $table->unsignedInteger('user_id');
            $table->unsignedInteger('error_id')->nullable();

            $table->foreign('user_id', 'fk_games_users_userid')
                ->references('id')->on('users');
            $table->foreign('error_id', 'fk_games_questions_errorid')
                ->references('id')->on('questions');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('games');
    }
}
