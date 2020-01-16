<?php

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
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

Route::group(['middleware' => ['auth:api']], function () {
    Route::setGroupNamespace('App\Http\Controllers\Api');

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('users/{page?}', 'UserController@users');
    Route::get('translations', 'ApiController@translations');

    Route::get('configs', 'ConfigController@index');
    Route::get('features', 'FeatureFlippingController@index');
    Route::get('permissions', 'PermissionController@index');
});
