<?php

use App\Trial;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class FixBugDueToMissingAnswer extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $trials = Trial::where('exercise_id', 425)->get();

        foreach ($trials as $trial) {
            $score = $trial->corrections()->where('state', 1)->count()*5;

            $trial->score = $score;
            $trial->save();

            $compositeTrial = $trial->compositeTrial()->first();

            if (isset($compositeTrial) && !is_null($compositeTrial)) {
                $subtrials = Trial::where('composite_trial_id', $compositeTrial->id)->get();
                $compositeScore = 0;

                foreach($subtrials as $subtrial) {
                    $compositeScore += $subtrial->score;
                }

                $compositeTrial->score = $compositeScore;
                $compositeTrial->save();
            }
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

    }
}
