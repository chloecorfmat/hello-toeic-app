@extends('layouts.app')

@section('laterale-bar-content-begin')
   {{--  @role('student')
    <div class="laterale-bar--part">
        <h3>Statistiques</h3>
        <p><span>{{ count($datas['trials']) }}</span> tests</p>
    </div>
    @endrole --}}
@endsection

@section('content')
    <div class="main-content">
        {{ Breadcrumbs::render('dashboard') }}

        <h1>Dashboard</h1>
        <!-- Results -->
        <div class="part-container">
            <div class="card-container">
                <div class="card">
                    <p class="card-text"><span class="card-number">{{ $stats['composite-trials'] }} </span>tests composés effectués</p>
                    <a href="{{ route('student.composite-trials.index') }}" class="card-link">Learn more</a>
                </div>

                <div class="card">
                    <p class="card-text"><span class="card-number">{{ $stats['trials'] }} </span>exercices effectués</p>
                    <a href="{{ route('student.trials.index') }}" class="card-link">Learn more</a>
                </div>

                <div class="card">
                    <p class="card-text"><span class="card-number">{{ $stats['games'] }} </span>challenges réalisés</p>
                    <a href="{{ route('games') }}" class="card-link">Learn more</a>
                </div>
            </div>

            @if ($message = Session::get('success'))
                <div class="alert alert-success">
                    <p>{{ $message }}</p>
                </div>
            @endif

            @if (sizeof($lessons) > 0)
                <h2>Leçons en cours</h2>
                <div class="table" id="profile-lessons">
                    <div class="table--filters">
                        <div class="field-container">
                            <label for="search">Search</label>
                            <input type="text" id="search" name="search" class="search">
                        </div>
                    </div>

                    <div class="table-container is-visible">
                        <table>
                            <caption class="sr-only">Liste des leçons en cours</caption>
                            <thead>
                            <tr>
                                <th scope="col">
                                    <button class="sort" data-sort="name">
                                        Name <i class="fas fa-arrows-alt-v"></i>
                                    </button>
                                </th>
                                <th scope="col">
                                    <button class="sort" data-sort="start">
                                        Start datetime <i class="fas fa-arrows-alt-v"></i>
                                    </button>
                                </th>
                                <th scope="col">
                                    <button class="sort" data-sort="end">
                                        End datetime <i class="fas fa-arrows-alt-v"></i>
                                    </button>
                                </th>
                                <th scope="col">
                                    <button class="sort" data-sort="test">
                                        Composite test <i class="fas fa-arrows-alt-v"></i>
                                    </button>
                                </th>
                                <th scope="col">Actions</th>
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
                                                        title="Execute test"
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
                    <p class="emphasis">Aucun résultat.</p>
                </div>
            @endif
        </div>
        <div class="part-container">
            <h2>Résultats des derniers exercices</h2>
            @if (!Auth::user()->hasRole('teacher'))
                <p class="emphasis">La correction des questions liées aux parties de compréhension orale n'est pas affichée.</p>
            @endif
            <div class="table" id="profile-tests">
                <div class="table--filters">
                    <div class="field-container">
                        <label for="search">Search</label>
                        <input type="text" id="search" name="search" class="search">
                    </div>
                </div>

                <div class="table-container is-visible">
                    <table>
                        <caption class="sr-only">Liste des tests passés</caption>
                        <thead>
                        <tr>
                            <th scope="col">
                                <button class="sort" data-sort="date">
                                    Date <i class="fas fa-arrows-alt-v"></i>
                                </button>
                            </th>
                            <th scope="col">
                                <button class="sort" data-sort="test">
                                    Nom du test <i class="fas fa-arrows-alt-v"></i>
                                </button>
                            </th>
                            <th scope="col">
                                <button class="sort" data-sort="score">
                                    Score <i class="fas fa-arrows-alt-v"></i>
                                </button>
                            </th>
                            <th scope="col">Actions</th>
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
                                                    title="Execute exercise"
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
                                                    title="Show solution"
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
                <p class="emphasis">Aucun résultat.</p>
            </div>
        </div>

        <div class="part-container">
            <h2>Résultats des derniers tests composés</h2>
            @if (!Auth::user()->hasRole('teacher'))
                <p class="emphasis">La correction des questions liées aux parties de compréhension orale n'est pas affichée.</p>
            @endif
            <div class="table" id="profile-composite-tests">
                <div class="table--filters">
                    <div class="field-container">
                        <label for="search">Search</label>
                        <input type="text" id="search" name="search" class="search">
                    </div>
                </div>

                <div class="table-container is-visible">
                    <table>
                        <caption class="sr-only">Liste des composite tests passés</caption>
                        <thead>
                        <tr>
                            <th scope="col">
                                <button class="sort" data-sort="date">
                                    Date <i class="fas fa-arrows-alt-v"></i>
                                </button>
                            </th>
                            <th scope="col">
                                <button class="sort" data-sort="test">
                                    Nom du test <i class="fas fa-arrows-alt-v"></i>
                                </button>
                            </th>
                            <th scope="col">
                                <button class="sort" data-sort="score">
                                    Score <i class="fas fa-arrows-alt-v"></i>
                                </button>
                            </th>
                            @role('student')
                            <th scope="col">Actions</th>
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
                                                    title="Execute exercise"
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
                <p class="emphasis">Aucun résultat.</p>
            </div>
        </div>
    </div>

@endsection
