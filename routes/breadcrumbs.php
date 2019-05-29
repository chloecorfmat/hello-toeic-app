<?php

Breadcrumbs::for('exercises', function ($trail) {
    $trail->push('Exercises', route('exercises.index'));
});


Breadcrumbs::for('profile', function ($trail) {
    $trail->parent('exercises');
    $trail->push('Profile', route('profile'));
});
