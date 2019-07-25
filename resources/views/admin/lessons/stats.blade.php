@extends('layouts.app')

@section('content')
    <div class="main-content list-tests">
        <div class="main-content--header">
            {{ Breadcrumbs::render('lessons.stats', $lesson) }}
            <h1>{{ __('statistics.title') }}</h1>
        </div>
        @if ($message = Session::get('success'))
            <div class="alert alert-success">
                <p>{{ $message }}</p>
            </div>
        @elseif ($message = Session::get('error'))
            <div class="alert alert-error">
                <p>{{ $message }}</p>
            </div>
        @endif

        <div class="part-container">
            <div class="table" id="tests">
                <h2>{{ __('exercises.list') }}</h2>
                <div class="table-container is-visible">
                    <table>
                        <caption class="sr-only">{{ __('exercises.list') }}</caption>
                        <thead>
                        <tr>
                            <th scope="col">{{ __('common.name') }}</th>
                            <th scope="col">{{ __('statistics.average') }}</th>
                            <th scope="col">{{ __('common.actions') }}</th>
                        </tr>
                        </thead>
                        <tbody class="list">
                        @foreach ($score_by_exercises as $key => $exercise)
                            <tr>
                                <td>{{ $exercise->name }}</td>
                                <td><span class="important">{{ round(($exercise->score/$exercise->users_nb), 2)  }}/{{ $exercise->max_score }}</span> {{ round((($exercise->score/$exercise->users_nb)*100/$exercise->max_score), 2) }}%</td>
                                <td>
                                    <a href="{{ route('exercises.show', ['id' => $exercise->exercise_id]) }}" title="{{ __('exercises.show') }}"><i class="fas fa-eye"></i></a>
                                </td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="part-container">
            <h2>{{ __('common.details') }}</h2>
            @for($i = 1; $i < 8; $i++)
                @php ($part = "exercise_part" . $i)

                @php ($ex = $exercises[$composite_test->$part] ?? null )

                @if (!is_null($ex))
                    <div class="stats-exercise">
                    <h3>{{ $ex['name'] }}</h3>

                    <div class="table">
                    <div class="table-container is-visible">
                        <table>
                            <caption class="sr-only">{{ __('questions.list') }}</caption>
                            <thead>
                            <tr>
                                <th scope="col">{{ __('common.question') }}</th>
                                <th scope="col">{{ __('common.score') }}</th>
                                <th scope="col">{{ __('common.actions') }}</th>
                            </tr>
                            </thead>
                            <tbody class="list">
                            @foreach ($ex['questions'] as $key => $question)
                                <tr>
                                    <td>{{ $question->number }}</td>
                                    @php ($percent = $question->score*100/$exercise->users_nb)
                                    @php ($class_score = $percent >= $levels['intermediate'] ? 'score--high' : ($percent >= $levels['low'] ? 'score--medium' : 'score--low'))
                                    <td class="score {{ $class_score }}"><span class="important">{{ $question->score }}/{{ $exercise->users_nb }}</span> ({{ $percent }}%)</td>
                                    <td>
                                        <a href="{{ route('questions.show', ['id' => $question->question]) }}" title="{{ __('questions.show') }}"><i class="fas fa-eye"></i></a>
                                    </td>
                                </tr>
                            @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
                </div>
                @endif
            @endfor
        </div>
    </div>
@endsection
