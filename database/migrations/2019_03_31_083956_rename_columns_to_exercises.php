<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RenameColumnsToExercises extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('composite_tests', function (Blueprint $table) {
            $table->renameColumn('test_part1', 'exercise_part1');
            $table->renameColumn('test_part2', 'exercise_part2');
            $table->renameColumn('test_part3', 'exercise_part3');
            $table->renameColumn('test_part4', 'exercise_part4');
            $table->renameColumn('test_part5', 'exercise_part5');
            $table->renameColumn('test_part6', 'exercise_part6');
            $table->renameColumn('test_part7', 'exercise_part7');
        });

        Schema::table('trials', function (Blueprint $table) {
            $table->renameColumn('test_id', 'exercise_id');
        });

        Schema::rename('test_question', 'exercise_question');
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
