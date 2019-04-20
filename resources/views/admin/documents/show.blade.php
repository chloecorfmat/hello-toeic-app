@extends('layouts.app')

@section('content')
    <div class="main-content">
        <div class="main-content--header">
            <h1>Détails du document</h1>
            <a href="{{ route('documents.edit', ['id' => $datas['document']->id]) }}" class="main-content--header-actions" title="Modifier la question">
                <i class="fas fa-pencil-alt"></i>
            </a>
        </div>

        <p>Nom : <span>{{ $datas['document']->name }}</span></p>

        <div class="file--preview">
            <img src="{{ url('storage/' . $datas['document']->url) }}"/>
            <p>{{ $datas['document']->url }}</p>
        </div>

        <h2>Questions</h2>
        <div class="table-container is-visible">
            <table>
            <caption class="sr-only">Liste des questions liées au document</caption>
            <thead>
                <tr>
                    <th scope="col">Number</th>
                    <th scope="col">Question</th>
                    <th scope="col">Proposal 1</th>
                    <th scope="col">Proposal 2</th>
                    <th scope="col">Proposal 3</th>
                    <th scope="col">Proposal 4</th>
                    <th scope="col">Actions</th>
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
                                    --> answer
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
                                <a href="{{ route('questions.edit', ['id' => $question->id]) }}">Éditer</a>
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
        <p class="emphasis">Aucun résultat.</p>
    </div>
@endsection
