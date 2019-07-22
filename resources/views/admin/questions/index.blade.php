@extends('layouts.app')

@section('content')
    <div class="main-content">
        <div class="main-content--header">
            {{ Breadcrumbs::render('questions.index') }}
            <h1>{{ __('questions.list') }}</h1>
            <a href="{{ route('questions.create') }}" class="main-content--header-actions">
                <i class="fas fa-plus-circle"></i>
            </a>
        </div>

        @if ($message = Session::get('success'))
            <div class="alert alert-success">
                <p>{{ $message }}</p>
            </div>
        @endif

        @if ($errors->any())
            <div>
                <ul class="alert alert-error">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

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
                            <a href="{{ route('questions.delete', $question->id) }}" title="{{ __('questions.delete') }}">
                                <i class="fas fa-trash"></i>
                            </a>
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>

        {{ $questions->links() }}

        <div class="container-empty-search" id="js-empty-search" aria-hidden="true">
            <p class="emphasis">{{ __('common.no-result') }}</p>
        </div>
    </div>
@endsection
