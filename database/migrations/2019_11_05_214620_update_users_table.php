<?php

use App\User;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->integer('promo')->nullable();
            $table->string('picture')->nullable();
        });

        $users = User::all();

        foreach ($users as $user) {
            if (!is_null($user->course)) {
                $promo = intval(substr($user->course, -4));

                if (strpos($user->email, '@enssat.fr') !== false) {
                    $pos = strpos($user->email, '@enssat.fr');
                    $login = substr($user->email, 0, $pos);
                    $url = 'https://intranet.enssat.fr/bindocs/trombi/' . $promo . '/' . $promo . '_' . $login . '.jpg';
                    $user->picture = $url;
                }

                $user->promo = $promo;
                $user->save();
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
        //
    }
}
