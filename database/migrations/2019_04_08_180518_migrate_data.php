<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use App\Exercise;
use App\Trial;
use App\CompositeTest;
use App\CompositeTrial;
use App\Correction;
use App\Part;

class MigrateData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $exercises = Exercise::where('part_id', 1)->get();
        $composite_trial = null;

        foreach ($exercises as $exercise) {
            // Manage composite_tests.
            $exs = [];
            $questions = $exercise->questions;

            foreach ($questions as $question) {
                $exs_relative = $question->exercises;

                foreach($exs_relative as $ex_relative) {
                    if (($ex_relative->part->id !== 1) && (!in_array($ex_relative->id, $exs))) {
                        $exs[] = $ex_relative->id;
                    }
                }
            }

            $composite_test = CompositeTest::create([
                'name' => $exercise->name,
                'version' => '2017', // We know at this time : there are only 2017' tests.
                'exercise_part1' => $exs[0],
                'exercise_part2' => $exs[1],
                'exercise_part3' => $exs[2],
                'exercise_part4' => $exs[3],
                'exercise_part5' => $exs[4],
                'exercise_part6' => $exs[5],
                'exercise_part7' => $exs[6],
            ]);

            // Manage trials.
            $trials = Trial::where('exercise_id', $exercise->id)->get();

            foreach($trials as $trial) {
                $composite_trial = CompositeTrial::create([
                    'datetime' => $trial->datetime,
                    'user_id' => $trial->user->id,
                    'composite_test_id' => $composite_test->id,
                    'score' => $trial->score,
                ]);

                foreach ($exs as $ex) {

                    $qs = Exercise::find($ex)->questions;

                    $temp_score = 0;
                    $t = Trial::create([
                        'datetime' => $trial->datetime,
                        'score' => 0,
                        'exercise_id' => $ex,
                        'user_id' => $trial->user->id,
                        'composite_trial_id' => $composite_trial->id,
                    ]);

                    foreach ($qs as $q) {
                        $correction = Correction::where('trial_id', $trial->id)
                            ->where('question_id', $q->id)->first();

                        if (!is_null($correction)) {
                            $correction->trial_id = $t->id;
                            $correction->save();

                            $temp_score = $correction->state ? $temp_score+5 : $temp_score;
                        }
                    }

                    $t->score = $temp_score;
                    $t->save();
                }

                // Delete old trial.
                $trial->delete();
            }


            $questions = $exercise->questions;

            foreach ($questions as $question) {
                $exercise->questions()->detach($question);
            }
            $exercise->save();
            $exercise->delete();
        }

        $part = Part::find(1);
        $part->delete();
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
