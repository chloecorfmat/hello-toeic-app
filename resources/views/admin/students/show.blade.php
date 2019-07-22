@extends('layouts.app')

@section('content')
    <div class="main-content">
        <div class="main-content--header">
            {{ Breadcrumbs::render('students.show', $student) }}
            <h1>{{ __('common.details') }} : {{ $student->name }}</h1>
        </div>

        @if ($message = Session::get('success'))
            <div class="alert alert-success">
                <p>{{ $message }}</p>
            </div>
        @endif

        <div class="part-container student-profile">
            <p><strong class="important">{{ __('common.name') }}: </strong>{{ $student->name }}</p>
            <p><strong class="important">{{ __('common.matricule') }}: </strong>{{ $student->matricule }}</p>
            <p>
                <strong class="important">{{ __('common.toeic') }}: </strong>
                @if (!is_null($student->passed))
                    {{ date('d/m/Y', strtotime($student->passed)) }}
                @else
                    ({{ __('common.no-validate') }}))
                @endif
            </p>
            <div>
                <p>
                    <strong class="important">{{ __('app.groups') }} :</strong>
                </p>
                <ul>
                    @foreach ($student->groups()->get() as $group)
                        <li>
                            <a href="{{ route('groups.show', ['id' => $group->id]) }}">{{ $group->name }}</a>
                        </li>
                    @endforeach
                </ul>
            </div>
        </div>

        <div class="part-container">
            <h2>{{ __('exercises.results_last') }}</h2>
            <div class="table" id="profile-tests">
                <div class="table--filters">
                    <div class="field-container">
                        <label for="search">{{ __('common.search') }}</label>
                        <input type="text" id="search" name="search" class="search">
                    </div>
                </div>

                <div class="table-container is-visible">
                    <table>
                        <caption class="sr-only">{{ __('exercises.results_last') }}</caption>
                        <thead>
                        <tr>
                            <th scope="col">
                                <button class="sort" data-sort="date">
                                    {{ __('common.date') }} <i class="fas fa-arrows-alt-v"></i>
                                </button>
                            </th>
                            <th scope="col">
                                <button class="sort" data-sort="test">
                                    {{ __('common.name') }}t <i class="fas fa-arrows-alt-v"></i>
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
                        @foreach ($trials as $key => $trial)
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
                                        <li>
                                            <a href="{{ route('student.trials.show', ['id' => $trial->id]) }}">{{ __('common.correction') }}</a>
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
                <p class="emphasis">{{ __('common.no-result') }}</p>
            </div>
        </div>

        <div class="part-container">
            <h2>{{ __('composite-tests.results_last') }}</h2>
            <div class="table">
                <div class="table--filters">
                    <div class="field-container">
                        <label for="search">{{ __('common.search') }}</label>
                        <input type="text" id="search" name="search" class="search">
                    </div>
                </div>

                <div class="table-container is-visible">
                    <table>
                        <caption class="sr-only">{{ __('composite-tests.results_last') }}</caption>
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
                                <td class="test">{{ $composite_trials_names[$key] }}</td>
                                <td class="score">{{ $trial->score }}</td>
                                @role('student')
                                <td>
                                    <ul>

                                        <li>
                                            <a href="{{ action('CompositeTestController@show', ['id' => $trial->composite_test_id]) }}">{{ __('composite-tests.execute') }}</a>
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

        <div class="part-container">
            <h2>{{ __('games.results_last') }}</h2>
            <div class="table" id="games">
                <div class="table--filters">
                    <div class="field-container">
                        <label for="search">{{ __('common.search') }}</label>
                        <input type="text" id="search" name="search" class="search">
                    </div>
                </div>
                <div class="table-container is-visible">
                    <table>
                        <caption class="sr-only">{{ __('games.results_last') }}</caption>
                        <thead>
                        <tr>
                            <th>
                                <button class="sort" data-sort="date">
                                    {{ __('common.date') }} <i class="fas fa-arrows-alt-v"></i>
                                </button>
                            </th>
                            <th>
                                <button class="sort" data-sort="score">
                                    {{ __('common.score') }} <i class="fas fa-arrows-alt-v"></i>
                                </button>
                            </th>
                        </tr>
                        </thead>
                        <tbody class="list">
                        @foreach ($games as $key => $game)
                            <tr>
                                <td class="date">{{ date('d/m/Y H:i', strtotime($game->datetime)) }}</td>
                                <td class="score">{{ $game->score }}</td>
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
