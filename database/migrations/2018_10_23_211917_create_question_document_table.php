<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateQuestionDocumentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('question_document', function (Blueprint $table) {
            $table->unsignedInteger('question_id');
            $table->unsignedInteger('document_id');

            $table->primary(['question_id', 'document_id']);
            $table->foreign('question_id', 'fk_questiondocument_questions_questionid')
                ->references('id')->on('questions');
            $table->foreign('document_id', 'fk_questiondocument_documents_documentid')
                ->references('id')->on('documents');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('question_document');
    }
}
