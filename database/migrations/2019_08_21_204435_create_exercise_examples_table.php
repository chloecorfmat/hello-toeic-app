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
        Schema::enableForeignKeyConstraints();

        Schema::create('examples', function (Blueprint $table) {
            $table->engine = 'InnoDB'; // Needed to add foreign keys.

            $table->bigIncrements('id');
            $table->string('name');
            $table->string('image');
        });

        Schema::table('exercises', function (Blueprint $table) {
            $table->unsignedBigInteger('example_id')->nullable();
            $table->foreign('example_id')->references('id')->on('examples');

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
