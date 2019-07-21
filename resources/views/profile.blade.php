@extends('layouts.app')

@section('content')
    <div class="main-content">
        {{ Breadcrumbs::render('dashboard') }}

        <h1>{{__('app.dashboard')}}</h1>
        <!-- Results -->
        <div class="part-container">
            <div class="card-container">
                <div class="card">
                    <p class="card-text"><span class="card-number">{{ $stats['composite-trials'] }} </span>{{ __('composite-tests.done') }}</p>
                    <a href="{{ route('student.composite-trials.index') }}" class="card-link">{{ __('common.learn-more') }}</a>
                </div>

                <div class="card">
                    <p class="card-text"><span class="card-number">{{ $stats['trials'] }} </span>{{ __('exercises.done') }}</p>
                    <a href="{{ route('student.trials.index') }}" class="card-link">{{ __('common.learn-more') }}</a>
                </div>

                <div class="card">
                    <p class="card-text"><span class="card-number">{{ $stats['games'] }} </span>{{ __('games.done') }}</p>
                    <a href="{{ route('games') }}" class="card-link">{{ __('common.learn-more') }}</a>
                </div>
            </div>

            @if ($message = Session::get('success'))
                <div class="alert alert-success">
                    <p>{{ $message }}</p>
                </div>
            @endif

            @if (sizeof($lessons) > 0)
                <h2>{{ __('lessons.in-progress') }}</h2>
                <div class="table" id="profile-lessons">
                    <div class="table--filters">
                        <div class="field-container">
                            <label for="search">{{ __('common.search') }}</label>
                            <input type="text" id="search" name="search" class="search">
                        </div>
                    </div>

                    <div class="table-container is-visible">
                        <table>
                            <caption class="sr-only">{{ __('lessons.in-progress.list') }}</caption>
                            <thead>
                            <tr>
                                <th scope="col">
                                    <button class="sort" data-sort="name">
                                        {{ __('common.name') }} <i class="fas fa-arrows-alt-v"></i>
                                    </button>
                                </th>
                                <th scope="col">
                                    <button class="sort" data-sort="start">
                                        {{ __('common.datetime.start') }} <i class="fas fa-arrows-alt-v"></i>
                                    </button>
                                </th>
                                <th scope="col">
                                    <button class="sort" data-sort="end">
                                        {{ __('common.datetime.end') }}  <i class="fas fa-arrows-alt-v"></i>
                                    </button>
                                </th>
                                <th scope="col">
                                    <button class="sort" data-sort="test">
                                        {{ __('app.composite-test') }}  <i class="fas fa-arrows-alt-v"></i>
                                    </button>
                                </th>
                                <th scope="col">{{ __('common.actions') }}</th>
                            </tr>
                            </thead>
                            <tbody class="list">
                            @foreach ($lessons as $key => $lesson)
                                <tr>
                                    <td class="name">{{ $lesson->name }}</td>
                                    <td class="start">{{ date('d/m/Y H:i', strtotime($lesson->start_datetime)) }}</td>
                                    <td class="end">{{ date('d/m/Y H:i', strtotime($lesson->end_datetime)) }}</td>
                                    <td class="test">{{ $lesson->composite_test()->first()->name }}</td>
                                    <td>
                                        <ul>
                                            <li class="table--action">
                                                <a
                                                        href="{{ action('CompositeTestController@show', ['id' => $lesson->composite_test()->first()->id]) }}"
                                                        title="{{ __('composite-tests.execute') }}"
                                                >
                                                    <i class="fas fa-play fa-lg"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                            @endforeach
                            </tbody>
                        </table>
                    </div>

                    <div class="container-pagination">
                        <button class="btn-pagination" id="js-pagination-prev">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <ul class="pagination"></ul>
                        <button class="btn-pagination" id="js-pagination-next">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>

                <div class="container-empty-search" id="js-empty-search" aria-hidden="true">
                    <p class="emphasis">{{ __('common.no-results') }}</p>
                </div>
            @endif
        </div>
        <div class="part-container">
            <h2>{{ __('exercises.results.last') }}</h2>
            @if (!Auth::user()->hasRole('teacher'))
                <p class="emphasis">{{ __('correction.limitation') }}</p>
            @endif
            <div class="table" id="profile-tests">
                <div class="table--filters">
                    <div class="field-container">
                        <label for="search">{{ __('common.search') }}</label>
                        <input type="text" id="search" name="search" class="search">
                    </div>
                </div>

                <div class="table-container is-visible">
                    <table>
                        <caption class="sr-only">{{ __('exercises.results.last') }}</caption>
                        <thead>
                        <tr>
                            <th scope="col">
                                <button class="sort" data-sort="date">
                                    {{ __('common.date') }} <i class="fas fa-arrows-alt-v"></i>
                                </button>
                            </th>
                            <th scope="col">
                                <button class="sort" data-sort="test">
                                    {{ __('common.name') }} <i class="fas fa-arrows-alt-v"></i>
                                </button>
                            </th>
                            <th scope="col">
                                <button class="sort" data-sort="score">
                                    {{ __('common.score') }} <i class="fas fa-arrows-alt-v"></i>
                                </button>
                            </th>
                            <th scope="col">{{ __('common.actions') }}</th>
                        </tr>
                        </thead>
                        <tbody class="list">
                        @foreach ($datas['trials'] as $key => $trial)
                            <tr>
                                <td class="date">{{ date('d/m/Y H:i', strtotime($trial->datetime)) }}</td>
                                <td class="test">{{ $trial->test->name }}</td>
                                @php ($max = $trial->test->part->nb_questions*5)
                                @php ($score = $trial->score)
                                @php ($percent = round(100*$score/$max, 1))
                                @php ($class_score = $percent >= $scores['intermediate'] ? 'score--high' : ($percent >= $scores['low'] ? 'score--medium' : 'score--low'))
                                <td class="score {{ $class_score }}"><span class="important">{{ $score }}/{{ $max }}</span> ({{ $percent }}%)</td>
                                <td>
                                    <ul>
                                        @role('student')
                                        <li class="table--action">
                                            <a
                                                    href="{{ action('ExerciseController@show', ['id' => $trial->test->id]) }}"
                                                    title="{{ __('exercises.execute') }}"
                                            >
                                                <i class="fas fa-play fa-lg"></i>
                                            </a>
                                        </li>
                                        @endrole

                                        @if (
                                            (($trial->test->part_id !== 2) &&
                                            ($trial->test->part_id !== 3) &&
                                            ($trial->test->part_id !== 4) &&
                                            ($trial->test->part_id !== 5) &&
                                            ($datas['user']->hasRole('student'))) ||
                                            ($datas['user']->hasRole('teacher'))
                                        )
                                            <li class="table--action">
                                                <a
                                                    href="{{ route('student.trials.show', ['id' => $trial->id]) }}"
                                                    title="{{ __('correction.show') }}"
                                                >
                                                    <i class="fas fa-eye fa-lg"></i>
                                                </a>
                                            </li>
                                        @endif
                                    </ul>
                                </td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                </div>

                <div class="container-pagination">
                    <button class="btn-pagination" id="js-pagination-prev">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <ul class="pagination"></ul>
                    <button class="btn-pagination" id="js-pagination-next">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>

            <div class="container-empty-search" id="js-empty-search" aria-hidden="true">
                <p class="emphasis">{{ __('common.no-results') }}</p>
            </div>
        </div>

        <div class="part-container">
            <h2>{{ __('composite-tests.results.last') }}</h2>
            @if (!Auth::user()->hasRole('teacher'))
                <p class="emphasis">{{ __('correction.limitation') }}</p>
            @endif
            <div class="table" id="profile-composite-tests">
                <div class="table--filters">
                    <div class="field-container">
                        <label for="search">{{ __('common.search') }}</label>
                        <input type="text" id="search" name="search" class="search">
                    </div>
                </div>

                <div class="table-container is-visible">
                    <table>
                        <caption class="sr-only">{{ __('composite-tests.results.last') }}</caption>
                        <thead>
                        <tr>
                            <th scope="col">
                                <button class="sort" data-sort="date">
                                    {{ __('common.date') }} <i class="fas fa-arrows-alt-v"></i>
                                </button>
                            </th>
                            <th scope="col">
                                <button class="sort" data-sort="test">
                            {{ __('common.name') }} <i class="fas fa-arrows-alt-v"></i>
                        </button>
                    </th>
                    <th scope="col">
                        <button class="sort" data-sort="score">
                            {{ __('common.score') }} <i class="fas fa-arrows-alt-v"></i>
                        </button>
                    </th>
                    @role('student')
                    <th scope="col">{{ __('common.actions') }}</th>
                    @endrole
                </tr>
                </thead>
                <tbody class="list">
                @foreach ($composite_trials as $key => $trial)
                    <tr>
                        <td class="date">{{ date('d/m/Y H:i', strtotime($trial->datetime)) }}</td>
                                <td class="test">{{ $trial->composite_test->name }}</td>
                                @php ($max = $trial->composite_test->max_score())
                                @php ($score = $trial->score)
                                @php ($percent = round(100*$score/$max, 1))
                                @php ($class_score = $percent >= $scores['intermediate'] ? 'score--high' : ($percent >= $scores['low'] ? 'score--medium' : 'score--low'))
                                <td class="score {{ $class_score }}"><span class="important">{{ $score }}/{{ $max }}</span> ({{ $percent }}%)</td>
                                @role('student')
                                <td>
                                    <ul>
                                        <li class="table--action">
                                            <a
                                                    href="{{ action('ExerciseController@show', ['id' => $trial->test->id]) }}"
                                                    title="{{ __('composite-tests.execute') }}"
                                            >
                                                <i class="fas fa-play fa-lg"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </td>
                                @endrole
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                </div>

                <div class="container-pagination">
                    <button class="btn-pagination" id="js-pagination-prev">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <ul class="pagination"></ul>
                    <button class="btn-pagination" id="js-pagination-next">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>

            <div class="container-empty-search" id="js-empty-search" aria-hidden="true">
                <p class="emphasis">{{ __('common.no-result') }}</p>
            </div>
        </div>
    </div>

@endsection
