<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTrialsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('trials', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('score');
            $table->dateTime('datetime');
            $table->unsignedInteger('test_id');
            $table->unsignedInteger('user_id');

            $table->foreign('test_id', 'fk_trials_tests_testid')
                ->references('id')->on('tests');
            $table->foreign('user_id', 'fk_trials_users_userid')
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
        Schema::dropIfExists('trials');
    }
}
