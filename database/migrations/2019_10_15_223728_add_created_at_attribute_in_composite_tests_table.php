<?php

use App\CompositeTest;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCreatedAtAttributeInCompositeTestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('composite_tests', function (Blueprint $table) {
            $table->datetime('created_at')->nullable();
        });


        $tests = CompositeTest::all();

        foreach ($tests as $test) {
            $test->created_at = $test->updated_at;
            $test->save();
        }

        Schema::table('composite_tests', function (Blueprint $table) {
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
        Schema::table('composite_tests', function (Blueprint $table) {
            //
        });
    }
}
