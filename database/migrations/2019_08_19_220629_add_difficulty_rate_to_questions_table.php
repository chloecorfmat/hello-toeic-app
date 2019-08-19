<?php

use App\Correction;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Laravel\Telescope\Telescope;

class AddDifficultyRateToQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('questions', function (Blueprint $table) {
            $table->unsignedDecimal('difficulty_rate')->default(0.0);
            $table->unsignedInteger('trials_nb')->default(0);
        });

        $corrections = Correction::all();

        Telescope::stopRecording();

        foreach ($corrections as $key => $correction) {
            $question = $correction->question;

            if ($correction->state) {
                $question->difficulty_rate = ((($question->difficulty_rate) * $question->trials_nb) + 1) / ($question->trials_nb+1);
            } else {
                $question->difficulty_rate = (($question->difficulty_rate) * $question->trials_nb) / ($question->trials_nb+1);
            }

            $question->trials_nb = $question->trials_nb + 1;
            $question->save();

            echo($key . "\r\n");
        }

        Telescope::startRecording();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('questions', function (Blueprint $table) {
            //
        });
    }
}
