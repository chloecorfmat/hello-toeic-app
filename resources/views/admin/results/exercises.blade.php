@extends('layouts.app')

@section('content')
    <div class="main-content">
        <div class="main-content--header">
            {{ Breadcrumbs::render('results.exercises') }}
            <h1>{{ __('exercises.results') }}</h1>
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
            <h2>{{ __('exercises.results') }}</h2>
            @if (!Auth::user()->hasRole('teacher'))
                <p class="emphasis">{{ __('correction.limitation') }}</p>
            @endif
            <div class="table" id="results-exercises">
                <div class="table--filters">
                    <div class="field-container">
                        <label for="search">{{ __('common.search') }}</label>
                        <input type="text" id="search" name="search" class="search">
                    </div>
                </div>

                <div class="table-container is-visible">
                    <table>
                        <caption class="sr-only">{{ __('exercises.results') }}</caption>
                        <thead>
                        <tr>
                            <th scope="col">
                                <button class="sort" data-sort="date">
                                    {{ __('common.date') }} <i class="fas fa-arrows-alt-v"></i>
                                </button>
                            </th>
                            <th scope="col">
                                <button class="sort" data-sort="student">
                                    {{ __('common.student') }} <i class="fas fa-arrows-alt-v"></i>
                                </button>
                            </th>
                            <th scope="col">
                                <button class="sort" data-sort="exercise">
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
                        @foreach ($trials as $key => $trial)
                            <tr>
                                <td class="date">{{ date('d/m/Y H:i', strtotime($trial->datetime)) }}</td>
                                <td class="student">{{ $trial->user->name }}</td>
                                <td class="exercise">{{ $trial->test->name }}</td>
                                @php ($max = $trial->test->part->nb_questions*5)
                                @php ($score = $trial->score)
                                @php ($percent = round(100*$score/$max, 1))
                                @php ($class_score = $percent >= $scores['intermediate'] ? 'score--high' : ($percent >= $scores['low'] ? 'score--medium' : 'score--low'))
                                <td class="score {{ $class_score }}"><span class="important">{{ $score }}/{{ $max }}</span> ({{ $percent }}%)</td>
                                <td>
                                    <ul>
                                        <li class="table--action">
                                            <a
                                                    href="{{ route('student.trials.show', ['id' => $trial->id]) }}"
                                                    title="{{ __('correction.show') }}"
                                            >
                                                <i class="fas fa-eye fa-lg"></i>
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
                <p class="emphasis">{{ __('common.no-result') }}</p>
            </div>
        </div>
    </div>
@endsection
