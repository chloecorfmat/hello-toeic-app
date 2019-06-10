@extends('layouts.app')

@section('content')
    @php ($index = ['A', 'B', 'C', 'D'])

    <div class="main-content">
        <h1>Détails du test : {{ $exercise->name }}</h1>

        <div class="part-container">
            <div class="student-profile">
                <p>
                    <span class="important">Type d'exercice :</span>
                    {{ $part->name }}
                    <a href="{{ route('parts.show', ['id' => $part->id]) }}" title="Show part">
                        <i class="fas fa-eye"></i>
                    </a>
                </p>
            </div>
        </div>

        <div class="part-container">
            <h2>Liste des questions</h2>
            <div class="table-container is-visible">
                <table>
                    <caption class="sr-only">Liste des questions liées à l'exercice</caption>
                    <thead>
                    <tr>
                        <th scope="col">Number</th>
                        <th scope="col">Question</th>
                        <th scope="col">Proposal A</th>
                        <th scope="col">Proposal B</th>
                        <th scope="col">Proposal C</th>
                        <th scope="col">Proposal D</th>
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
        </div>

    </div>
@endsection
