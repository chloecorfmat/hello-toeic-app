<?php

Breadcrumbs::for('exercises', function ($trail) {
    $trail->push('Exercises', route('exercises.index'));
});


Breadcrumbs::for('dashboard', function ($trail) {
    $trail->push('Dashboard', route('profile'));
});
