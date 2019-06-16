<?php

use App\CompositeTest;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddUpdatedatColumnToCompositeTestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('composite_tests', function (Blueprint $table) {
            $table->dateTime('updated_at')->default('2019-01-01');
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
