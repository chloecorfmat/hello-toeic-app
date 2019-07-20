<?php

use Illuminate\Database\Seeder;
use App\Setting;

class SettingTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /**Setting::create([
            'key' => 'ff.email',
            'type' => 'feature_flipping',
            'value' => 'true',
            'name' => 'Send e-mails ?',
        ]);**/

        /**Setting::create([
            'key' => 'config.score.intermediate',
            'type' => 'config',
            'value' => '85',
            'name' => 'Score intermédiaire (%)',
        ]);

        Setting::create([
            'key' => 'config.score.low',
            'type' => 'config',
            'value' => '65',
            'name' => 'Score insuffisant (%)',
        ]);**/

        /**Setting::create([
            'key' => 'config.default.reading.duration',
            'type' => 'config',
            'value' => strval(75*60),
            'name' => 'Default timer (reading exercise)',
        ]);**/

        /**Setting::create([
            'key' => 'wording.wordings.index.explanation',
            'type' => 'wording',
            'value' => 'Wordings to display in interface.',
            'name' => '',
        ]);

        Setting::create([
            'key' => 'wording.wordings.index.title',
            'type' => 'wording',
            'value' => 'Wordings',
            'name' => '',
        ]);

        Setting::create([
            'key' => 'wording.wordings.index.success',
            'type' => 'wording',
            'value' => 'Wordings have been saved.',
            'name' => '',
        ]);**/

        /**Setting::create([
        'key' => 'wording.app.login',
        'type' => 'wording',
        'value' => 'Login',
        'name' => '',
        ]);

        Setting::create([
            'key' => 'wording.app.logout',
            'type' => 'wording',
            'value' => 'Logout',
            'name' => '',
        ]);

        Setting::create([
            'key' => 'wording.app.training',
            'type' => 'wording',
            'value' => 'Training',
            'name' => '',
        ]);

        Setting::create([
            'key' => 'wording.app.composite-tests',
            'type' => 'wording',
            'value' => 'Composite tests',
            'name' => '',
        ]);

        Setting::create([
            'key' => 'wording.app.exercises',
            'type' => 'wording',
            'value' => 'Exercises',
            'name' => '',
        ]);

        Setting::create([
            'key' => 'wording.app.challenges',
            'type' => 'wording',
            'value' => 'Challenges',
            'name' => '',
        ]);

        Setting::create([
            'key' => 'wording.app.admin',
            'type' => 'wording',
            'value' => 'Administration',
            'name' => '',
        ]);

        Setting::create([
            'key' => 'wording.app.manage',
            'type' => 'wording',
            'value' => 'Manage',
            'name' => '',
        ]);

        Setting::create([
            'key' => 'wording.app.results',
            'type' => 'wording',
            'value' => 'Results',
            'name' => '',
        ]);

        Setting::create([
            'key' => 'wording.app.users-list',
            'type' => 'wording',
            'value' => 'Users list',
            'name' => '',
        ]);

        Setting::create([
            'key' => 'wording.app.students-list',
            'type' => 'wording',
            'value' => 'Students list',
            'name' => '',
        ]);

        Setting::create([
            'key' => 'wording.app.groups-list',
            'type' => 'wording',
            'value' => 'Groups list',
            'name' => '',
        ]);

        Setting::create([
            'key' => 'wording.app.lessons-list',
            'type' => 'wording',
            'value' => 'Lessons list',
            'name' => '',
        ]);

        Setting::create([
            'key' => 'wording.app.documents-list',
            'type' => 'wording',
            'value' => 'Documents list',
            'name' => '',
        ]);

        Setting::create([
            'key' => 'wording.app.questions-list',
            'type' => 'wording',
            'value' => 'Questions list',
            'name' => '',
        ]);

        Setting::create([
            'key' => 'wording.app.exercises-list',
            'type' => 'wording',
            'value' => 'Exercises list',
            'name' => '',
        ]);

        Setting::create([
            'key' => 'wording.app.composite-tests-list',
            'type' => 'wording',
            'value' => 'Composite tests list',
            'name' => '',
        ]);

        Setting::create([
            'key' => 'wording.app.parts-list',
            'type' => 'wording',
            'value' => 'Parts list',
            'name' => '',
        ]);

        Setting::create([
            'key' => 'wording.app.explanations-list',
            'type' => 'wording',
            'value' => 'Explanations list',
            'name' => '',
        ]);

        Setting::create([
            'key' => 'wording.app.games-list',
            'type' => 'wording',
            'value' => 'Games list',
            'name' => '',
        ]);

        Setting::create([
            'key' => 'wording.app.permissions',
            'type' => 'wording',
            'value' => 'Results',
            'name' => 'Permissions',
        ]);

        Setting::create([
            'key' => 'wording.app.feature-flipping',
            'type' => 'wording',
            'value' => 'Feature flipping',
            'name' => '',
        ]);

        Setting::create([
            'key' => 'wording.app.configuration',
            'type' => 'wording',
            'value' => 'Configuration',
            'name' => '',
        ]);

        Setting::create([
            'key' => 'wording.default.create',
            'type' => 'wording',
            'value' => 'Create',
            'name' => '',
        ]);

        Setting::create([
            'key' => 'wording.default.edit',
            'type' => 'wording',
            'value' => 'Edit',
            'name' => '',
        ]);

        Setting::create([
            'key' => 'wording.default.delete',
            'type' => 'wording',
            'value' => 'Delete',
            'name' => '',
        ]);

        Setting::create([
            'key' => 'wording.app.dashboard',
            'type' => 'wording',
            'value' => 'Dashboard',
            'name' => '',
        ]);

        Setting::create([
            'key' => 'wording.documents.unamed',
            'type' => 'wording',
            'value' => 'Unamed document',
            'name' => '',
        ]);

        Setting::create([
            'key' => 'wording.default.play',
            'type' => 'wording',
            'value' => 'Play',
            'name' => '',
        ]);**/

        // HERE !


    }
}
