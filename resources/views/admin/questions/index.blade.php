@extends('layouts.app')

@section('content')
    <div class="main-content">
        <div class="main-content--header">
            <h1>Liste des questions</h1>
            <a href="{{ route('questions.create') }}" class="main-content--header-actions">
                <i class="fas fa-plus-circle"></i>
            </a>
        </div>

        @if ($message = Session::get('success'))
            <div class="alert alert-success">
                <p>{{ $message }}</p>
            </div>
        @endif
        <div class="table-container">
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
                @foreach ($questions as $key => $question)
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
                                    <a href="{{ route('questions.show', ['id' => $question->id]) }}">Voir</a>
                                    <a href="{{ route('questions.edit', ['id' => $question->id]) }}">Éditer</a>
                                </li>
                            </ul>
                        </td>
                    </tr>
                @endforeach
            </table>
        </div>
    </div>
@endsection
