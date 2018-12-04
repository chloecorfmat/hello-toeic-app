<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCorrectionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('corrections', function (Blueprint $table) {
            $table->increments('id');
            $table->boolean('state');
            $table->unsignedInteger('trial_id');
            $table->unsignedInteger('question_id');
            $table->unsignedInteger('proposal_id')->nullable();

            $table->foreign('trial_id', 'fk_corrections_trials_trialid')
                ->references('id')->on('trials');
            $table->foreign('question_id', 'fk_corrections_questions_questionid')
                ->references('id')->on('questions');
            $table->foreign('proposal_id', 'fk_corrections_proposals_proposalid')
                ->references('id')->on('proposals');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('corrections');
    }
}
