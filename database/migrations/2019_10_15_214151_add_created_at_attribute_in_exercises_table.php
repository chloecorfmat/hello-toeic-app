<?php

use App\Exercise;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCreatedAtAttributeInExercisesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('exercises', function (Blueprint $table) {
            $table->datetime('created_at')->nullable();
        });

        $exercises = Exercise::all();

        foreach ($exercises as $exercise) {
            $exercise->created_at = $exercise->updated_at;
            $exercise->save();
        }

        Schema::table('exercises', function (Blueprint $table) {
            $table->datetime('created_at')->nullable(false)->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('exercises', function (Blueprint $table) {
            //
        });
    }
}
