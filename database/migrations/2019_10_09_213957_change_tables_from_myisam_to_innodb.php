<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeTablesFromMyisamToInnodb extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $dbSchemaManager = Schema::getConnection()->getDoctrineSchemaManager();
        $tables = $dbSchemaManager->listTableNames();
        foreach ($tables as $table) {
            DB::statement('ALTER TABLE ' . $table . ' ENGINE = InnoDB');
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('myisam_to_innodb', function (Blueprint $table) {
            //
        });
    }
}
