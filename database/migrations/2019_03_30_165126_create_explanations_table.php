<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExplanationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('explanations', function (Blueprint $table) {
            $table->increments('id');
            $table->string("title");
            $table->longText("explanation");
        });

        Schema::table('questions', function (Blueprint $table) {
            $table->unsignedInteger('explanation_id')->nullable();

            $table->foreign('explanation_id', 'fk_questions_explanations_explanationid')
                ->references('id')->on('explanations');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('explanations');
    }
}
