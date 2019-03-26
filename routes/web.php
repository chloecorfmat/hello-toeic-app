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

Route::get('/', 'HomeController@home');

Auth::routes(['register' => false]);

Route::get('/profile', 'HomeController@index')->name('profile');
Route::get('/train', 'HomeController@train')->name('train');

Route::group(['middleware' => ['auth']], function () {
    Route::setGroupNamespace('App\Http\Controllers\Admin');
    Route::resource('admin/permissions', 'PermissionController');
    Route::resource('admin/questions', 'QuestionController');
    Route::resource('admin/documents', 'DocumentController');
    Route::resource('admin/tests', 'TestController');
    Route::resource('admin/students', 'StudentController');

    Route::get('admin/tests/exercise/{type_id}/create', 'TestController@exerciseCreate')
        ->name('tests.exercise.create');
    Route::get('admin/tests/exercise/import', 'TestController@exerciseImport')
        ->name('tests.exercise.import');
    Route::post('admin/tests/exercise/store', 'TestController@exerciseStore')
        ->name('tests.exercise.store');
    Route::post('admin/tests/exercise/import/store', 'TestController@exerciseImportStore')
        ->name('tests.exercise.importStore');
});


// Display tests & exercises.
Route::resource('tests', 'TestController', [
    // Renamed routes due to Admin/TestController.
    'names' => [
        'index' => 'student.tests.index',
        'create' => 'student.tests.create',
        'store' => 'student.tests.store',
        'show' => 'student.tests.show',
        'edit' => 'student.tests.edit',
        'update' => 'student.tests.update',
        'destroy' => 'student.tests.destroy',
    ]
]);
Route::get('/exercises/{id?}', 'TestController@exercises')->name('tests.exercises');
Route::resource('trials', 'TrialController');


Route::group(['middleware' => ['auth']], function () {
    Route::get('games/play', 'GameController@play')->name('games.play');
    Route::get('games', 'GameController@index')->name('games');
    Route::post('games/continue', 'GameController@continue')->name('games.continue');
});

