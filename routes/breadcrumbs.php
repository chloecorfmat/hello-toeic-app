<?php

Breadcrumbs::for('dashboard', function ($trail) {
    $trail->push('Dashboard', route('profile'));
});

/** ADMIN PAGES for admin users */
Breadcrumbs::for('permissions.index', function ($trail) {
    $trail->parent('dashboard');
    $trail->push('Permissions', route('permissions.index'));
});

Breadcrumbs::for('feature-flipping.index', function ($trail) {
    $trail->parent('dashboard');
    $trail->push('Feature flipping', route('feature-flipping.index'));
});

Breadcrumbs::for('config.index', function ($trail) {
    $trail->parent('dashboard');
    $trail->push('Configuration', route('config.index'));
});


/** ADMIN PAGES for teacher users */
Breadcrumbs::for('exercises.index', function ($trail) {
    $trail->parent('dashboard');
    $trail->push('Exercises', route('exercises.index'));
});

Breadcrumbs::for('exercises.delete', function ($trail, $exercise) {
    $trail->parent('exercises.index');
    $trail->push('Delete ' . $exercise->name, route('exercises.delete'));
});

Breadcrumbs::for('students.index', function ($trail) {
    $trail->parent('dashboard');
    $trail->push('Students', route('students.index'));
});

Breadcrumbs::for('students.show', function ($trail, $student) {
    $trail->parent('students.index');
    $trail->push($student->name, route('students.show', $student->id));
});

Breadcrumbs::for('users.import', function ($trail) {
    $trail->parent('students.index');
    $trail->push('Import users', route('users.import'));
});

Breadcrumbs::for('groups.index', function ($trail) {
    $trail->parent('dashboard');
    $trail->push('Groups', route('groups.index'));
});

Breadcrumbs::for('groups.create', function ($trail) {
    $trail->parent('groups.index');
    $trail->push('Create', route('groups.create'));
});

Breadcrumbs::for('groups.show', function ($trail, $group) {
    $trail->parent('groups.index');
    $trail->push($group->name, route('groups.show', $group));
});

/** PAGES for all users */
Breadcrumbs::for('student.exercises.index', function ($trail) {
    $trail->parent('dashboard');
    $trail->push('Exercises', route('student.exercises.index'));
});

Breadcrumbs::for('student.exercises.show', function ($trail, $exercise) {
    $trail->parent('student.exercises.index');
    $trail->push($exercise->name, route('exercises.show', $exercise->id));
});
