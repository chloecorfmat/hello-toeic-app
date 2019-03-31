<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCompositeTestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('composite_tests', function (Blueprint $table) {
            $table->increments('id');
            $table->string("name");
            $table->year("version");
            $table->unsignedInteger("test_part1")->nullable();
            $table->unsignedInteger("test_part2")->nullable();
            $table->unsignedInteger("test_part3")->nullable();
            $table->unsignedInteger("test_part4")->nullable();
            $table->unsignedInteger("test_part5")->nullable();
            $table->unsignedInteger("test_part6")->nullable();
            $table->unsignedInteger("test_part7")->nullable();

            $table->foreign('test_part1', 'fk_compositetests_tests_testpart1')
                ->references('id')->on('tests');
            $table->foreign('test_part2', 'fk_compositetests_tests_testpart2')
                ->references('id')->on('tests');
            $table->foreign('test_part3', 'fk_compositetests_tests_testpart3')
                ->references('id')->on('tests');
            $table->foreign('test_part4', 'fk_compositetests_tests_testpart4')
                ->references('id')->on('tests');
            $table->foreign('test_part5', 'fk_compositetests_tests_testpart5')
                ->references('id')->on('tests');
            $table->foreign('test_part6', 'fk_compositetests_tests_testpart6')
                ->references('id')->on('tests');
            $table->foreign('test_part7', 'fk_compositetests_tests_testpart7')
                ->references('id')->on('tests');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('composite_tests');
    }
}
