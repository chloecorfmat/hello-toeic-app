<?php

Breadcrumbs::for('dashboard', function ($trail) {
    $trail->push((new \App\Services\RenderService())->t('wording.app.dashboard'), route('profile'));
});

/** ADMIN PAGES for admin users */
Breadcrumbs::for('permissions.index', function ($trail) {
    $trail->parent('dashboard');
    $trail->push((new \App\Services\RenderService())->t('wording.app.permissions'), route('permissions.index'));
});

Breadcrumbs::for('feature-flipping.index', function ($trail) {
    $trail->parent('dashboard');
    $trail->push((new \App\Services\RenderService())->t('wording.app.feature-flipping'), route('feature-flipping.index'));
});

Breadcrumbs::for('config.index', function ($trail) {
    $trail->parent('dashboard');
    $trail->push((new \App\Services\RenderService())->t('wording.app.configuration'), route('config.index'));
});

Breadcrumbs::for('wordings.index', function ($trail) {
    $trail->parent('dashboard');
    $trail->push((new \App\Services\RenderService())->t('wording.wordings.index.title'), route('wordings.index'));
});

Breadcrumbs::for('users.index', function ($trail) {
    $trail->parent('dashboard');
    $trail->push((new \App\Services\RenderService())->t('wording.app.users-list'), route('users.index'));
});

Breadcrumbs::for('users.create', function ($trail) {
    $trail->parent('users.index');
    $trail->push((new \App\Services\RenderService())->t('wording.default.create'), route('users.create'));
});

Breadcrumbs::for('users.show', function ($trail, $user) {
    $trail->parent('users.index');
    $trail->push($user->name, route('users.show', $user->id));
});

Breadcrumbs::for('users.edit', function ($trail, $user) {
    $trail->parent('users.show', $user);
    $trail->push((new \App\Services\RenderService())->t('wording.default.edit'), route('users.edit', $user->id));
});

Breadcrumbs::for('users.delete', function ($trail, $user) {
    $trail->parent('dashboard');
    $trail->push((new \App\Services\RenderService())->t('wording.default.delete'), route('users.delete'));
});


/** ADMIN PAGES for teacher users */
Breadcrumbs::for('exercises.index', function ($trail) {
    $trail->parent('dashboard');
    $trail->push((new \App\Services\RenderService())->t('wording.app.exercises'), route('exercises.index'));
});

Breadcrumbs::for('exercises.delete', function ($trail, $exercise) {
    $trail->parent('exercises.index');
    $trail->push((new \App\Services\RenderService())->t('wording.default.delete'), route('exercises.delete'));
});

Breadcrumbs::for('exercises.edit', function ($trail, $exercise) {
    $trail->parent('exercises.index');
    $trail->push((new \App\Services\RenderService())->t('wording.default.edit'), route('exercises.edit', $exercise->id));
});

Breadcrumbs::for('questions.index', function ($trail) {
    $trail->parent('dashboard');
    $trail->push((new \App\Services\RenderService())->t('wording.app.questions-list'), route('questions.index'));
});

Breadcrumbs::for('questions.create', function ($trail) {
    $trail->parent('questions.index');
    $trail->push((new \App\Services\RenderService())->t('wording.default.create'), route('questions.create'));
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
    $trail->push((new \App\Services\RenderService())->t('wording.default.edit'), route('questions.edit', $question->id));
});

Breadcrumbs::for('questions.delete', function ($trail, $question) {
    $trail->parent('questions.index');
    $trail->push((new \App\Services\RenderService())->t('wording.default.delete'), route('questions.delete'));
});

Breadcrumbs::for('exercises.import', function ($trail, $part) {
    $trail->parent('parts.show', $part);
    $trail->push((new \App\Services\RenderService())->t('wording.default.create'), route('exercises.import'));
});

Breadcrumbs::for('students.index', function ($trail) {
    $trail->parent('dashboard');
    $trail->push((new \App\Services\RenderService())->t('wording.app.students-list'), route('students.index'));
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
    $trail->push((new \App\Services\RenderService())->t('wording.app.groups-list'), route('groups.index'));
});

Breadcrumbs::for('groups.create', function ($trail) {
    $trail->parent('groups.index');
    $trail->push((new \App\Services\RenderService())->t('wording.default.create'), route('groups.create'));
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
    $trail->push((new \App\Services\RenderService())->t('wording.app.documents-list'), route('documents.index'));
});

Breadcrumbs::for('documents.create', function ($trail) {
    $trail->parent('documents.index');
    $trail->push((new \App\Services\RenderService())->t('wording.default.create'), route('documents.create'));
});

Breadcrumbs::for('documents.show', function ($trail, $document) {
    $trail->parent('documents.index');
    $name = !empty($document->name) ? $document->name : (new \App\Services\RenderService())->t('wording.documents.unamed');
    $trail->push($name, route('documents.show', $document->id));
});

Breadcrumbs::for('documents.edit', function ($trail, $document) {
    $trail->parent('documents.show', $document);
    $trail->push((new \App\Services\RenderService())->t('wording.default.edit'), route('documents.edit', $document->id));
});

Breadcrumbs::for('composite-tests.index', function ($trail) {
    $trail->parent('dashboard');
    $trail->push((new \App\Services\RenderService())->t('wording.app.composite-tests'), route('composite-tests.index'));
});

Breadcrumbs::for('composite-tests.create', function ($trail) {
    $trail->parent('composite-tests.index');
    $trail->push((new \App\Services\RenderService())->t('wording.default.create'), route('composite-tests.create'));
});

Breadcrumbs::for('composite-tests.edit', function ($trail, $composite_test) {
    $trail->parent('composite-tests.index');
    $trail->push((new \App\Services\RenderService())->t('wording.default.edit'), route('composite-tests.edit', $composite_test->id));
});

Breadcrumbs::for('parts.index', function ($trail) {
    $trail->parent('dashboard');
    $trail->push((new \App\Services\RenderService())->t('wording.app.parts-list'), route('parts.index'));
});

Breadcrumbs::for('parts.create', function ($trail) {
    $trail->parent('parts.index');
    $trail->push((new \App\Services\RenderService())->t('wording.default.create'), route('parts.create'));
});

Breadcrumbs::for('parts.show', function ($trail, $part) {
    $trail->parent('parts.index');
    $trail->push($part->name, route('parts.show', $part->id));
});

Breadcrumbs::for('parts.edit', function ($trail, $part) {
    $trail->parent('parts.show', $part);
    $trail->push((new \App\Services\RenderService())->t('wording.default.edit'), route('parts.edit', $part->id));
});

Breadcrumbs::for('parts.delete', function ($trail, $part) {
    $trail->parent('parts.index');
    $trail->push((new \App\Services\RenderService())->t('wording.default.delete'), route('parts.delete'));
});

Breadcrumbs::for('explanations.index', function ($trail) {
    $trail->parent('dashboard');
    $trail->push((new \App\Services\RenderService())->t('wording.app.explanations-list'), route('explanations.index'));
});

Breadcrumbs::for('explanations.create', function ($trail) {
    $trail->parent('explanations.index');
    $trail->push((new \App\Services\RenderService())->t('wording.default.create'), route('explanations.create'));
});

Breadcrumbs::for('explanations.show', function ($trail, $explanation) {
    $trail->parent('explanations.index');
    $trail->push($explanation->title, route('explanations.show', $explanation->id));
});

Breadcrumbs::for('explanations.edit', function ($trail, $explanation) {
    $trail->parent('explanations.show', $explanation);
    $trail->push((new \App\Services\RenderService())->t('wording.default.edit'), route('explanations.edit', $explanation->id));
});

Breadcrumbs::for('explanations.delete', function ($trail, $explanation) {
    $trail->parent('explanations.index');
    $trail->push((new \App\Services\RenderService())->t('wording.default.delete'), route('explanations.delete'));
});

Breadcrumbs::for('lessons.index', function ($trail) {
    $trail->parent('dashboard');
    $trail->push((new \App\Services\RenderService())->t('wording.app.lessons-list'), route('lessons.index'));
});

Breadcrumbs::for('lessons.create', function ($trail) {
    $trail->parent('lessons.index');
    $trail->push((new \App\Services\RenderService())->t('wording.default.create'), route('lessons.create'));
});

Breadcrumbs::for('lessons.show', function ($trail, $lesson) {
    $trail->parent('lessons.index');
    $trail->push($lesson->name, route('lessons.show', $lesson->id));
});

Breadcrumbs::for('lessons.edit', function ($trail, $lesson) {
    $trail->parent('lessons.show', $lesson);
    $trail->push((new \App\Services\RenderService())->t('wording.default.edit'), route('lessons.edit', $lesson->id));
});

Breadcrumbs::for('lessons.delete', function ($trail, $lesson) {
    $trail->parent('lessons.index');
    $trail->push((new \App\Services\RenderService())->t('wording.default.delete'), route('lessons.delete'));
});

Breadcrumbs::for('results.index', function ($trail) {
    $trail->parent('dashboard');
    $trail->push((new \App\Services\RenderService())->t('wording.app.results'), route('results.index'));
});

Breadcrumbs::for('results.composite-tests', function ($trail) {
    $trail->parent('results.index');
    $trail->push((new \App\Services\RenderService())->t('wording.app.composite-tests'), route('results.composite-tests'));
});

Breadcrumbs::for('results.exercises', function ($trail) {
    $trail->parent('results.index');
    $trail->push((new \App\Services\RenderService())->t('wording.app.exercises'), route('results.exercises'));
});

Breadcrumbs::for('results.games', function ($trail) {
    $trail->parent('results.index');
    $trail->push((new \App\Services\RenderService())->t('wording.app.challenges'), route('results.games'));
});


/** PAGES for all users */
Breadcrumbs::for('student.exercises.index', function ($trail) {
    $trail->parent('dashboard');
    $trail->push((new \App\Services\RenderService())->t('wording.app.exercises'), route('student.exercises.index'));
});

Breadcrumbs::for('student.exercises.show', function ($trail, $exercise) {
    $trail->parent('student.exercises.index');
    $trail->push($exercise->name, route('student.exercises.show', $exercise->id));
});

Breadcrumbs::for('student.composite-tests.index', function ($trail) {
    $trail->parent('dashboard');
    $trail->push((new \App\Services\RenderService())->t('wording.app.composite-tests'), route('student.composite-tests.index'));
});

Breadcrumbs::for('student.composite-tests.show', function ($trail, $compositeTest) {
    $trail->parent('student.composite-tests.index');
    $trail->push($compositeTest->name, route('student.composite-tests.show', $compositeTest->id));
});

Breadcrumbs::for('games', function ($trail) {
    $trail->parent('dashboard');
    $trail->push((new \App\Services\RenderService())->t('wording.app.challenges'), route('games'));
});

Breadcrumbs::for('games.continue', function ($trail) {
    $trail->parent('games');
    $trail->push((new \App\Services\RenderService())->t('wording.default.play'), route('games.continue'));
});
