<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateQuestionPartTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('question_part', function (Blueprint $table) {
            $table->unsignedInteger('question_id');
            $table->unsignedInteger('part_id');

            $table->primary(['question_id', 'part_id']);

            $table->foreign('question_id', 'fk_questionpart_questions_questionid')
                ->references('id')->on('questions');
            $table->foreign('part_id', 'fk_questionpart_parts_partid')
                ->references('id')->on('parts');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('question_part');
    }
}
