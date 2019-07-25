@extends('layouts.app')

@section('content')
    @php ($index = ['A', 'B', 'C', 'D'])

    <div class="main-content">
        <h1>{{ __('common.details') }} : {{ $exercise->name }}</h1>

        <div class="part-container">
            <div class="student-profile">
                <p>
                    <span class="important">{{ __('common.part') }} :</span>
                    {{ $part->name }}
                    <a href="{{ route('parts.show', ['id' => $part->id]) }}" title="{{ __('parts.show') }}">
                        <i class="fas fa-eye"></i>
                    </a>
                </p>
            </div>
        </div>

        <div class="card-container cards-five">
            <div class="card">
                <p class="card-text"><span class="card-number">{{ $statistics['min'] }} </span>{{ __('statistics.min-score') }}</p>
            </div>

            <div class="card">
                <p class="card-text"><span class="card-number">{{ $statistics['max'] }} </span>{{ __('statistics.max-score') }}</p>
            </div>

            <div class="card">
                <p class="card-text"><span class="card-number">{{ $statistics['average'] }} </span>{{ __('statistics.average') }}</p>
            </div>

            <div class="card">
                <p class="card-text"><span class="card-number">{{ $statistics['standard_deviation'] }} </span>{{ __('statistics.standard-deviation') }}</p>
            </div>

            <div class="card">
                <p class="card-text"><span class="card-number">{{ $statistics['median'] }} </span>{{ __('statistics.median') }}</p>
            </div>
        </div>

        <div class="part-container">
            <p><span class="important">{{ __('common.number-trials') }} : </span> {{ $statistics['nb_trials'] }}</p>
        </div>

        <div class="part-container">
            <h2>{{ __('questions.list') }}</h2>
            <div class="table-container is-visible">
                <table>
                    <caption class="sr-only">{{ __('questions.list') }}</caption>
                    <thead>
                    <tr>
                        <th scope="col">{{ __('common.number') }}</th>
                        <th scope="col">{{ __('common.question') }}</th>
                        <th scope="col">{{ __('common.proposal') }} A</th>
                        <th scope="col">{{ __('common.proposal') }} B</th>
                        <th scope="col">{{ __('common.proposal') }} C</th>
                        <th scope="col">{{ __('common.proposal') }} D</th>
                        <th scope="col">{{ __('common.explanation') }}</th>
                        <th scope="col">{{ __('common.actions') }}</th>
                    </tr>
                    </thead>
                    <tbody class="list">
                    @foreach ($questions as $key => $question)
                        <tr>
                            <td>{{ $question->number }}</td>
                            <td>{{ $question->question }}</td>
                            @for ($i = 0; $i < 4; $i++)
                                @if(isset($question->proposals[$i]))
                                    <td
                                            @if (isset($question->answer) && ($question->proposals[$i]->id === $question->answer->id))
                                            class="proposal-answer"
                                            @endif
                                    >
                                        @isset($question->proposals[$i])
                                            {{ $question->proposals[$i]->value }}


                                        @endisset

                                        @empty($question->proposals[$i])
                                            /
                                        @endempty
                                    </td>
                                @else
                                    <td>/</td>
                                @endif
                            @endfor
                            <td>@if ($question->explanation_id) <i class="fas fa-chalkboard-teacher"></i> @else <i class="fas fa-times"></i> @endif</td>
                            <td>
                                <a href="{{ route('questions.show', ['id' => $question->id]) }}" title="{{ __('questions.show') }}">
                                    <i class="fas fa-eye"></i>
                                </a>
                                <a href="{{ route('questions.edit', ['id' => $question->id]) }}" title="{{ __('questions.edit') }}">
                                    <i class="fas fa-pencil-alt"></i>
                                </a>
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>
        </div>

    </div>
@endsection
