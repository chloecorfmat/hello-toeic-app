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
        <div class="table-container is-visible">
            <table>
                <caption class="sr-only">Liste des questions</caption>
                <thead>
                <tr>
                    <th scope="col">Number</th>
                    <th scope="col">Question</th>
                    <th scope="col">Proposal A</th>
                    <th scope="col">Proposal B</th>
                    <th scope="col">Proposal C</th>
                    <th scope="col">Proposal D</th>
                    <th scope="col">Explanation</th>
                    <th scope="col">Actions</th>
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
                            <a href="{{ route('questions.show', ['id' => $question->id]) }}" title="Show question">
                                <i class="fas fa-eye"></i>
                            </a>
                            <a href="{{ route('questions.edit', ['id' => $question->id]) }}" title="Edit question">
                                <i class="fas fa-pencil-alt"></i>
                            </a>
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>

        {{ $questions->links() }}

        <div class="container-empty-search" id="js-empty-search" aria-hidden="true">
            <p class="emphasis">Aucun résultat.</p>
        </div>
    </div>
@endsection
