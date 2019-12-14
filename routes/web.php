<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::macro('setGroupNamespace', function ($namespace) {
    // Get last groupStack data and hard change the namespace value
    $lastGroupStack = array_pop($this->groupStack);
    if ($lastGroupStack !== null) {
        array_set($lastGroupStack, 'namespace', $namespace);
        $this->groupStack[] = $lastGroupStack;
    }
    return $this;
});

Auth::routes(['register' => false]);

Route::get('/', 'HomeController@home');
Route::get('/home', 'HomeController@home');

Route::get('logout', '\App\Http\Controllers\Auth\LoginController@logout');

Route::group(['middleware' => ['auth', 'allowed.account']], function () {
    Route::setGroupNamespace('App\Http\Controllers\Admin');
    Route::resource('admin/permissions', 'PermissionController');


    Route::get('teacher/users/blocked', 'UserController@blocked')
        ->name('users.blocked');
    Route::get('teacher/users/activate/{id}', 'UserController@activate')
        ->name('users.activate');

    Route::get('teacher/v2/users/{page?}', 'UserController@v2')
        ->name('users.import');
    Route::get('teacher/users/import', 'UserController@import')
        ->name('users.import');
    Route::post('teacher/users/storeImport', 'UserController@storeImport')
        ->name('users.storeImport');
    Route::get('teacher/users/delete/{id?}', 'UserController@delete')
        ->name('users.delete');
    Route::resource('teacher/users', 'UserController');

    Route::get('teacher/questions/delete/{id?}', 'QuestionController@delete')
        ->name('questions.delete');
    Route::resource('teacher/questions', 'QuestionController');

    Route::resource('teacher/documents', 'DocumentController');
    Route::resource('teacher/students', 'StudentController');
    Route::resource('teacher/composite-tests', 'CompositeTestController');

    Route::get('teacher/parts/delete/{id?}', 'PartController@delete')
        ->name('parts.delete');
    Route::resource('teacher/parts', 'PartController');

    Route::get('teacher/groups/assign', 'GroupController@assign')
        ->name('groups.assign');
    Route::post('teacher/groups/storeAssign', 'GroupController@storeAssign')
        ->name('groups.storeAssign');
    Route::get('teacher/groups/unassign/{group}/{student}', 'GroupController@unassign')
        ->name('groups.unassign');
    Route::get('teacher/groups/import', 'GroupController@import')
        ->name('groups.import');
    Route::post('teacher/groups/storeImport', 'GroupController@storeImport')
        ->name('groups.storeImport');
    Route::get('teacher/groups/delete/{id?}', 'GroupController@delete')
        ->name('groups.delete');

    Route::resource('teacher/groups', 'GroupController');

    Route::get('teacher/explanations/delete/{id?}', 'ExplanationController@delete')
        ->name('explanations.delete');
    Route::resource('teacher/explanations', 'ExplanationController');

    Route::get('teacher/lessons/delete/{id?}', 'LessonController@delete')
        ->name('lessons.delete');
    Route::get('teacher/lessons/{id?}/stats', 'LessonController@stats')
        ->name('lessons.stats');
    Route::resource('teacher/lessons', 'LessonController');

    Route::resource('teacher/exercises/examples', 'ExampleController');

    Route::get('teacher/exercises/import/{id?}', 'ExerciseController@import')
        ->name('exercises.import');
    Route::post('teacher/exercises/storeImport', 'ExerciseController@storeImport')
        ->name('exercises.storeImport');
    Route::get('teacher/exercises/delete/{id?}', 'ExerciseController@delete')
        ->name('exercises.delete');
    Route::resource('teacher/exercises', 'ExerciseController');

    Route::get('/admin/feature-flipping', 'FeatureFlippingController@index')
        ->name('feature-flipping.index');
    Route::post('/admin/feature-flipping', 'FeatureFlippingController@store')
        ->name('feature-flipping.store');

    Route::get('/admin/config', 'ConfigController@index')
        ->name('config.index');
    Route::post('/admin/config', 'ConfigController@store')
        ->name('config.store');

    Route::get('/admin/wordings', 'WordingController@index')
        ->name('wordings.index');
    Route::post('/admin/wordings', 'WordingController@store')
        ->name('wordings.store');

    Route::get('teacher/results', 'ResultController@index')
        ->name('results.index');
    Route::get('teacher/results/composite-tests', 'ResultController@compositeTests')
        ->name('results.composite-tests');
    Route::get('teacher/results/exercises', 'ResultController@exercises')
        ->name('results.exercises');
    Route::get('teacher/results/games', 'ResultController@games')
        ->name('results.games');

    Route::get('teacher/messages/handle/{id?}', 'MessageController@handle')
        ->name('messages.handle');
    Route::resource('teacher/messages', 'MessageController');
});

Route::group(['middleware' => ['auth', 'allowed.account']], function () {
    // Display tests & exercises.
    Route::resource('exercises', 'ExerciseController', [
        // Renamed routes due to Admin/ExerciseController.
        'names' => [
            'index' => 'student.exercises.index',
            'create' => 'student.exercises.create',
            'store' => 'student.exercises.store',
            'show' => 'student.exercises.show',
            'edit' => 'student.exercises.edit',
            'update' => 'student.exercises.update',
            'destroy' => 'student.exercises.destroy',
        ]
    ]);

    Route::resource('composite-tests', 'CompositeTestController', [
        // Renamed routes due to Admin/ExerciseController.
        'names' => [
            'index' => 'student.composite-tests.index',
            'create' => 'student.composite-tests.create',
            'store' => 'student.composite-tests.store',
            'show' => 'student.composite-tests.show',
            'edit' => 'student.composite-tests.edit',
            'update' => 'student.composite-tests.update',
            'destroy' => 'student.composite-tests.destroy',
        ]
    ]);

    Route::resource('trials', 'TrialController', [
        // Renamed routes due to Admin/ExerciseController.
        'names' => [
            'index' => 'student.trials.index',
            'create' => 'student.trials.create',
            'store' => 'student.trials.store',
            'show' => 'student.trials.show',
            'edit' => 'student.trials.edit',
            'update' => 'student.trials.update',
            'destroy' => 'student.trials.destroy',
        ]
    ]);

    Route::resource('composite-trials', 'CompositeTrialController', [
        // Renamed routes due to Admin/ExerciseController.
        'names' => [
            'index' => 'student.composite-trials.index',
            'create' => 'student.composite-trials.create',
            'store' => 'student.composite-trials.store',
            'show' => 'student.composite-trials.show',
            'edit' => 'student.composite-trials.edit',
            'update' => 'student.composite-trials.update',
            'destroy' => 'student.composite-trials.destroy',
        ]
    ]);

    Route::resource('users', 'UserController', [
        // Renamed routes due to Admin/ExerciseController.
        'names' => [
            'index' => 'student.users.index',
            'create' => 'student.users.create',
            'store' => 'student.users.store',
            'show' => 'student.users.show',
            'edit' => 'student.users.edit',
            'update' => 'student.users.update',
            'destroy' => 'student.users.destroy',
        ]
    ]);

    Route::get('games/play', 'GameController@play')->name('games.play');
    Route::get('games', 'GameController@index')->name('games');
    Route::post('games/continue', 'GameController@continue')->name('games.continue');

    // Route qui permet de connaître la langue active
    Route::get('locale', 'LocalizationController@getLang')->name('app.getlang');

    // Route qui permet de modifier la langue
    Route::get('locale/{lang}', 'LocalizationController@setLang')->name('app.setlang');

    Route::get('personal-data', 'GDPRController@personalData')->name('personalData');

    Route::get('/profile', 'HomeController@index')->name('profile');
    Route::get('/train', 'HomeController@train')->name('train');
    Route::get('/contact', 'HomeController@contact')->name('contact');
    Route::get('/teacher', 'HomeController@teacher')->name('teacher');
    Route::get('/admin', 'HomeController@admin')->name('admin');
});

Route::group(['middleware' => ['auth']], function () {
    Route::get('collect-consent', 'GDPRController@collectConsent')->name('collectConsent');
    Route::get('validate-consent', 'GDPRController@validateConsent')->name('validateConsent');
    Route::get('refuse-consent', 'GDPRController@refuseConsent')->name('refuseConsent');

    Route::get('blocked-account', 'ErrorController@blockedAccount')->name('blockedAccount');
});
