<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBadgesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('badges', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('badge_type_id');
            $table->unsignedBigInteger('level_id');
            $table->string('image');
            $table->unsignedInteger('nb_repetitions');
            $table->string('param'); // For first data, it could be an integer... but prepare the future.

            $table->foreign('badge_type_id', 'fk_badges_badgetypes_badgetypeid')
                ->references('id')->on('badge_types');

            $table->foreign('level_id', 'fk_badges_level_levelid')
                ->references('id')->on('levels');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('badges');
    }
}
