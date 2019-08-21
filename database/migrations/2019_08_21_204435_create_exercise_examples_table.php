<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExerciseExamplesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('exercise_examples', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('image');
        });

        Schema::table('exercises', function (Blueprint $table) {
            $table->unsignedInteger('example_id')->nullable();

            $table->foreign('example_id', 'fk_exercises_examples_exampleid')
                ->references('id')->on('exercise_examples');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('exercise_examples');
    }
}
