<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCompositeTrialsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('composite_trials', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('score');
            $table->datetime('datetime');
            $table->unsignedInteger('composite_test_id');

            $table->foreign('composite_test_id', 'fk_compositetrials_compositetests_compositetestid')
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
        Schema::dropIfExists('composite_trials');
    }
}
