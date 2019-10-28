<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('subject');
            $table->text('message');
            $table->unsignedInteger('from');
            $table->unsignedInteger('to');
            $table->dateTime('datetime');
            $table->boolean('status')->defautl(0);
            $table->unsignedInteger('handle_by')->nullable();

            $table->foreign('from', 'fk_messages_users_from')
                ->references('id')->on('users');

            $table->foreign('to', 'fk_messages_roles_to')
                ->references('id')->on('roles');

            $table->foreign('handle_by', 'fk_messages_users_handleBy')
                ->references('id')->on('users');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('messages');
    }
}
