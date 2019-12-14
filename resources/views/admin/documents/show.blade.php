@extends('layouts.app')

@section('content')
    <div class="main-content">
        <div class="main-content--header">
            <a href="{{ route('documents.edit', ['id' => $datas['document']->id]) }}" class="main-content--header-actions" title="Modifier la question">
                <i class="fas fa-pencil-alt"></i>
            </a>
        </div>

        <p><span class="important">{{ __('common.name') }}:</span>
            @if (empty($datas['document']->name))
            <span class="emphasis">{{ __('documents.unamed') }}
            @else
            <span>{{ $datas['document']->name }}
            @endif
            </span>
        </p>

        @if (!empty($datas['document']->url))
        <div class="file--preview">
            <img src="{{ url('storage/' . $datas['document']->url) }}"/>
            <p>{{ $datas['document']->url }}</p>
        </div>
        @endif

        @if (!empty($datas['document']->content))
        <div class="content--preview">
            <p class="important">{{ __('common.content') }}:</p>
            <p>{!! $datas['document']->content !!}</p>
        </div>
        @endif

        <h2>{{ __('questions.list') }}</h2>
        <div class="table-container is-visible">
            <table>
            <caption class="sr-only">{{ __('questions.list') }}</caption>
            <thead>
                <tr>
                    <th scope="col">{{ __('common.number') }}</th>
                    <th scope="col">{{ __('common.question') }}</th>
                    <th scope="col">{{ __('common.proposal') }} 1</th>
                    <th scope="col">{{ __('common.proposal') }} 2</th>
                    <th scope="col">{{ __('common.proposal') }} 3</th>
                    <th scope="col">{{ __('common.proposal') }} 4</th>
                    <th scope="col">{{ __('common.actions') }}</th>
                </tr>
            </thead>
            @foreach ($datas['document']->questions as $key => $question)
                <tr>
                    <td>{{ $question->number }}</td>
                    <td>{{ $question->question }}</td>
                    @for ($i = 0; $i < 4; $i++)
                        <td>
                            @isset($question->proposals[$i])
                                {{ $question->proposals[$i]->value }}

                                @if ($question->proposals[$i]->id === $question->answer->id)
                                    --> {{ __('common.answer') }}
                                @endif
                            @endisset

                            @empty($question->proposals[$i])
                                /
                            @endempty
                        </td>
                    @endfor
                    <td>
                        <ul>
                            <li>
                                <a href="{{ route('questions.edit', ['id' => $question->id]) }}">{{ __('common.edit') }}</a>
                            </li>
                        </ul>
                    </td>
                </tr>
            @endforeach
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
@endsection
