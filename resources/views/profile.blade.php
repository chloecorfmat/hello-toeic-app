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
        {{ Breadcrumbs::render('profile') }}

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

            <h2>Résultats des derniers exercices</h2>
            @if ($message = Session::get('success'))
                <div class="alert alert-success">
                    <p>{{ $message }}</p>
                </div>
            @endif
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
                            @can('dashboard-students-see')
                                <th scope="col">
                                    <button class="sort" data-sort="student">
                                        Étudiant <i class="fas fa-arrows-alt-v"></i>
                                    </button>
                                </th>
                            @endcan
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
                                @can('dashboard-students-see')
                                    <td class="student">{{  $trial->user->name }}</td>
                                @endcan
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

        @role('student')
        <!-- Statistiques -->
        <!--<div class="part-container">
            <h2>Progression</h2>
            <div class="charts">
                <canvas class="chart" id="progression"></canvas>
            </div>
        </div>-->
        @endrole

    </div>

    {{--
    <script>
        var chart_axisX = "{{ $datas['axisX'] }}";
        var chart_axisY = "{{ $datas['axisY'] }}";
    </script>
    --}}
@endsection
