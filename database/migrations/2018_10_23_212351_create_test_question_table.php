<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTestQuestionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('test_question', function (Blueprint $table) {
            $table->unsignedInteger('test_id');
            $table->unsignedInteger('question_id');
            $table->unsignedInteger('number');

            $table->primary(['test_id', 'question_id']);
            $table->foreign('test_id', 'fk_testquestion_tests_testid')
                ->references('id')->on('tests');
            $table->foreign('question_id', 'fk_testquestion_questions_questionid')
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
        Schema::dropIfExists('test_question');
    }
}
