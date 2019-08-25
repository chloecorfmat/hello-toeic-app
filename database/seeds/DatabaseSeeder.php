<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        //$this->call('RoleTableSeeder');
        //$this->call('PermissionTableSeeder');
        //$this->call('PartTableSeeder');
        //$this->call('DocumentTableSeeder');
        //$this->call('QuestionTableSeeder');

        //$this->call('SettingTableSeeder');
        $this->call('LanguageLinesTableSeeder');
        //$this->call('LevelTableSeeder');


        // DONT TRY TO RUN BEFORE db:seed : composer dump-autoload.
    }
}
