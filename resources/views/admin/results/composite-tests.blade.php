@extends('layouts.app')

@section('content')
    <div class="main-content">
        <div class="main-content--header">
            {{ Breadcrumbs::render('results.composite-tests') }}
            <h1>Résultats des tests composés</h1>
        </div>

        @if ($errors->any())
            <div>
                <ul class="alert alert-error">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <div class="part-container">
            <h2>Résultats des derniers tests composés</h2>
            @if (!Auth::user()->hasRole('teacher'))
                <p class="emphasis">La correction des questions liées aux parties de compréhension orale n'est pas affichée.</p>
            @endif
            <div class="table" id="results-composite-tests">
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
                                <button class="sort" data-sort="student">
                                    Student <i class="fas fa-arrows-alt-v"></i>
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
                            <th scope="col">Exercises</th>
                        </tr>
                        </thead>
                        <tbody class="list">
                        @foreach ($composite_trials as $key => $trial)
                            <tr>
                                <td class="date">{{ date('d/m/Y H:i', strtotime($trial->datetime)) }}</td>
                                <td class="student">{{ $trial->user->name }}</td>
                                <td class="test">{{ $trial->composite_test->name }}</td>
                                @php ($max = $trial->composite_test->max_score())
                                @php ($score = $trial->score)
                                @php ($percent = round(100*$score/$max, 1))
                                @php ($class_score = $percent >= $scores['intermediate'] ? 'score--high' : ($percent >= $scores['low'] ? 'score--medium' : 'score--low'))
                                <td class="score {{ $class_score }}"><span class="important">{{ $score }}/{{ $max }}</span> ({{ $percent }}%)</td>
                                <td>
                                    <ul>
                                        @if ($trial->composite_test->exercise_part1)<li><a href="{{ route('exercises.show', $trial->composite_test->exercisePart1->id) }}">{{ $trial->composite_test->exercisePart1->name }}</li>@endif
                                        @if ($trial->composite_test->exercise_part2)<li><a href="{{ route('exercises.show', $trial->composite_test->exercisePart2->id) }}">{{ $trial->composite_test->exercisePart2->name }}</li>@endif
                                        @if ($trial->composite_test->exercise_part3)<li><a href="{{ route('exercises.show', $trial->composite_test->exercisePart3->id) }}">{{ $trial->composite_test->exercisePart3->name }}</li>@endif
                                        @if ($trial->composite_test->exercise_part4)<li><a href="{{ route('exercises.show', $trial->composite_test->exercisePart4->id) }}">{{ $trial->composite_test->exercisePart4->name }}</li>@endif
                                        @if ($trial->composite_test->exercise_part5)<li><a href="{{ route('exercises.show', $trial->composite_test->exercisePart5->id) }}">{{ $trial->composite_test->exercisePart5->name }}</li>@endif
                                        @if ($trial->composite_test->exercise_part6)<li><a href="{{ route('exercises.show', $trial->composite_test->exercisePart6->id) }}">{{ $trial->composite_test->exercisePart6->name }}</li>@endif
                                        @if ($trial->composite_test->exercise_part7)<li><a href="{{ route('exercises.show', $trial->composite_test->exercisePart7->id) }}">{{ $trial->composite_test->exercisePart7->name }}</li>@endif
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

    </div>
@endsection
