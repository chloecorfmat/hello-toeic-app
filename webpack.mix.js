const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

/**mix.scripts([
    'resources/js/appo.js',
    'resources/js/charts.js',
    'resources/js/lists.js',
    'resources/js/listOverride.js',
    'resources/js/imageZoom.js'
], 'resources/js/all.js');**/


mix.js('resources/js/app.js', 'public/js')
   //.js('resources/js/all.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css');


