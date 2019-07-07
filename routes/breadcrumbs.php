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

Breadcrumbs::for('users.index', function ($trail) {
    $trail->parent('dashboard');
    $trail->push('Utilisateurs', route('users.index'));
});

Breadcrumbs::for('users.create', function ($trail) {
    $trail->parent('users.index');
    $trail->push('Create', route('users.create'));
});

Breadcrumbs::for('users.show', function ($trail, $user) {
    $trail->parent('users.index');
    $trail->push($user->name, route('users.show', $user->id));
});

Breadcrumbs::for('users.edit', function ($trail, $user) {
    $trail->parent('users.show', $user);
    $trail->push('Modifier', route('users.edit', $user->id));
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

Breadcrumbs::for('exercises.edit', function ($trail, $exercise) {
    $trail->parent('exercises.index');
    $trail->push('Edit ' . $exercise->name, route('exercises.edit', $exercise->id));
});

Breadcrumbs::for('questions.index', function ($trail) {
    $trail->parent('dashboard');
    $trail->push('Questions', route('questions.index'));
});

Breadcrumbs::for('questions.create', function ($trail) {
    $trail->parent('questions.index');
    $trail->push('Create', route('questions.create'));
});

Breadcrumbs::for('questions.show', function ($trail, $question) {
    $trail->parent('questions.index');

    if (empty($question->question)) {
        $name = "#none (" . $question->id .")" ;
    } else {
        $name = $question->question;
    }

    $trail->push($name, route('questions.show', $question->id));
});

Breadcrumbs::for('questions.edit', function ($trail, $question) {
    $trail->parent('questions.show', $question);
    $trail->push('Modifier', route('questions.edit', $question->id));
});

Breadcrumbs::for('questions.delete', function ($trail, $question) {
    $trail->parent('questions.index');

    if (empty($question->question)) {
        $name = "#none (" . $question->id .")" ;
    } else {
        $name = $question->question;
    }

    $trail->push('Delete question: ' . $name, route('questions.delete'));
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

Breadcrumbs::for('groups.assign', function ($trail) {
    $trail->parent('groups.index');
    $trail->push('Assign students in groups', route('groups.assign'));
});

Breadcrumbs::for('groups.import', function ($trail) {
    $trail->parent('groups.index');
    $trail->push('Import groups', route('groups.import'));
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
    $name = !empty($document->name) ? $document->name : "Unamed document";
    $trail->push($name, route('documents.show', $document->id));
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

Breadcrumbs::for('composite-tests.edit', function ($trail, $composite_test) {
    $trail->parent('composite-tests.index');
    $trail->push('Edit', route('composite-tests.edit', $composite_test->id));
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

Breadcrumbs::for('parts.delete', function ($trail, $part) {
    $trail->parent('parts.index');
    $trail->push('Delete part: ' . $part->name, route('parts.delete'));
});

Breadcrumbs::for('explanations.index', function ($trail) {
    $trail->parent('dashboard');
    $trail->push('Explanations', route('explanations.index'));
});

Breadcrumbs::for('explanations.create', function ($trail) {
    $trail->parent('explanations.index');
    $trail->push('Create', route('explanations.create'));
});

Breadcrumbs::for('explanations.show', function ($trail, $explanation) {
    $trail->parent('explanations.index');
    $trail->push($explanation->title, route('explanations.show', $explanation->id));
});

Breadcrumbs::for('explanations.edit', function ($trail, $explanation) {
    $trail->parent('explanations.show', $explanation);
    $trail->push('Modifier', route('explanations.edit', $explanation->id));
});

Breadcrumbs::for('explanations.delete', function ($trail, $explanation) {
    $trail->parent('explanations.index');
    $trail->push('Delete explanation: ' . $explanation->title, route('explanations.delete'));
});

Breadcrumbs::for('lessons.index', function ($trail) {
    $trail->parent('dashboard');
    $trail->push('Lessons', route('lessons.index'));
});

Breadcrumbs::for('lessons.create', function ($trail) {
    $trail->parent('lessons.index');
    $trail->push('Create', route('lessons.create'));
});

Breadcrumbs::for('lessons.show', function ($trail, $lesson) {
    $trail->parent('lessons.index');
    $trail->push($lesson->name, route('lessons.show', $lesson->id));
});

Breadcrumbs::for('lessons.edit', function ($trail, $lesson) {
    $trail->parent('lessons.show', $lesson);
    $trail->push('Modifier', route('lessons.edit', $lesson->id));
});

Breadcrumbs::for('lessons.delete', function ($trail, $lesson) {
    $trail->parent('lessons.index');
    $trail->push('Delete lesson: ' . $lesson->name, route('lessons.delete'));
});

Breadcrumbs::for('results.index', function ($trail) {
    $trail->parent('dashboard');
    $trail->push('Résultats', route('results.index'));
});

Breadcrumbs::for('results.composite-tests', function ($trail) {
    $trail->parent('results.index');
    $trail->push('Composite tests', route('results.composite-tests'));
});

Breadcrumbs::for('results.exercises', function ($trail) {
    $trail->parent('results.index');
    $trail->push('Exercises', route('results.exercises'));
});

Breadcrumbs::for('results.games', function ($trail) {
    $trail->parent('results.index');
    $trail->push('Challenges', route('results.games'));
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
