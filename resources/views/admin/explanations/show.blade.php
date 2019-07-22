@extends('layouts.app')

@section('content')
    <div class="main-content">
        <div class="main-content--header">
            {{ Breadcrumbs::render('explanations.show', $explanation) }}
            <h1>{{ __('common.details') }}: {{ $explanation->title }}</h1>
        </div>

        <p>{{ __('common.title') }} : <span>{{ $explanation->title }}</span></p>
        <p>{{ __('common.details') }} : <span>{{ $explanation->explanation }}</span></p>

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
                        <th scope="col">{{ __('common.actions') }}</th>
                    </tr>
                    </thead>
                    <tbody class="list">
                    @foreach ($explanation->questions()->get() as $question)
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
                            <td>
                                <a href="{{ route('questions.show', ['id' => $question->id]) }}" title="{{ __('questions.show') }}">
                                    <i class="fas fa-eye"></i>
                                </a>
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>


            <div class="container-empty-search" id="js-empty-search" aria-hidden="true">
                <p class="emphasis">{{ __('common.no-result') }}</p>
            </div>
        </div>
    </div>
@endsection
