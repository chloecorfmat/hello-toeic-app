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


mix.scripts([
        'resources/js/app.js',
        'resources/js/charts.js',
        'resources/js/pagination.js'
    ], 'resources/js/all.js');
mix
   .js('resources/js/all.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css');
