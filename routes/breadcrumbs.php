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

Breadcrumbs::for('exercises.import', function ($trail, $part) {
    $trail->parent('parts.show', $part);
    $trail->push('Add exercise', route('exercises.import'));
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

Breadcrumbs::for('documents.index', function ($trail) {
    $trail->parent('dashboard');
    $trail->push('Documents', route('documents.index'));
});

Breadcrumbs::for('documents.create', function ($trail) {
    $trail->parent('documents.index');
    $trail->push('Create', route('documents.create'));
});

Breadcrumbs::for('documents.show', function ($trail, $document) {
    $trail->parent('documents.index');
    $trail->push($document->name, route('documents.show', $document->id));
});

Breadcrumbs::for('documents.edit', function ($trail, $document) {
    $trail->parent('documents.show', $document);
    $trail->push('Edit', route('documents.edit', $document->id));
});

Breadcrumbs::for('composite-tests.index', function ($trail) {
    $trail->parent('dashboard');
    $trail->push('Composite tests', route('composite-tests.index'));
});

Breadcrumbs::for('composite-tests.create', function ($trail) {
    $trail->parent('composite-tests.index');
    $trail->push('Create', route('composite-tests.create'));
});

Breadcrumbs::for('parts.index', function ($trail) {
    $trail->parent('dashboard');
    $trail->push('Parts', route('parts.index'));
});

Breadcrumbs::for('parts.create', function ($trail) {
    $trail->parent('parts.index');
    $trail->push('Create', route('parts.create'));
});

Breadcrumbs::for('parts.show', function ($trail, $part) {
    $trail->parent('parts.index');
    $trail->push($part->name, route('parts.show', $part->id));
});

Breadcrumbs::for('parts.edit', function ($trail, $part) {
    $trail->parent('parts.show', $part);
    $trail->push('Modifier', route('parts.edit', $part->id));
});


/** PAGES for all users */
Breadcrumbs::for('student.exercises.index', function ($trail) {
    $trail->parent('dashboard');
    $trail->push('Exercises', route('student.exercises.index'));
});

Breadcrumbs::for('student.exercises.show', function ($trail, $exercise) {
    $trail->parent('student.exercises.index');
    $trail->push($exercise->name, route('student.exercises.show', $exercise->id));
});

Breadcrumbs::for('student.composite-tests.index', function ($trail) {
    $trail->parent('dashboard');
    $trail->push('Composite tests', route('student.composite-tests.index'));
});

Breadcrumbs::for('student.composite-tests.show', function ($trail, $compositeTest) {
    $trail->parent('student.composite-tests.index');
    $trail->push($compositeTest->name, route('student.composite-tests.show', $compositeTest->id));
});

Breadcrumbs::for('games', function ($trail) {
    $trail->parent('dashboard');
    $trail->push('Challenges', route('games'));
});

Breadcrumbs::for('games.continue', function ($trail) {
    $trail->parent('games');
    $trail->push('Play', route('games.continue'));
});
