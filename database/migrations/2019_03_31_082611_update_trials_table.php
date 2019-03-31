<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateTrialsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('trials', function($table)
        {
            $table->unsignedInteger('composite_trial_id')->nullable();

            $table->foreign('composite_trial_id', 'fk_trials_compositetrials_compositetrialid')
                ->references('id')->on('composite_trials');
        });
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
