<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLessonsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lessons', function (Blueprint $table) {
            $table->increments('id');
            $table->dateTime('start_datetime');
            $table->dateTime('end_datetime');
            $table->string('name', 255);
            $table->unsignedInteger('group_id');
            $table->unsignedInteger('composite_test_id');

            $table->foreign('group_id', 'fk_lessons_groups_group_id')
                ->references('id')->on('groups');
            $table->foreign('composite_test_id', 'fk_lessons_composite_tests_composite_test_id')
                ->references('id')->on('composite_tests');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lessons');
    }
}
