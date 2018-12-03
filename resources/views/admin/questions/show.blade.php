@extends('layouts.app')

@section('content')
    <div class="main-content">
        <div class="main-content--header">
            <h1>Détails de la question</h1>
            <a href="{{ route('questions.edit', ['id' => $question->id]) }}" class="main-content--header-actions" title="Modifier la question">
                <i class="fas fa-pencil-alt"></i>
            </a>
        </div>
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
                </tr>
                </thead>
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
                    </tr>
            </table>
        </div>
        @if (count($question->documents()->get()))
        <div>
            <h2>Documents liés</h2>
            <ul>
                @foreach ($question->documents()->get() as $document)
                    <li>
                        <a href="{{ route('documents.show', ['id' => $document->id]) }}">
                            {{ $document->name }}
                        </a>
                    </li>
                @endforeach
            </ul>
        </div>
        @endif

        @isset($statistics['total'])
        <div>
            <h2>Statistiques</h2>
            @isset ($statistics['percent'])
                <p>Taux de réussite : {{ $statistics['percent'] }}%</p>
            @endisset

            <p>Nombre de passages total : {{ $statistics['total'] }}</p>

            @isset($statistics['answers'])
                <p>Valeurs entrées :</p>
                <ul>
                    @foreach ($statistics['answers'] as $answer)
                        @if ($answer->proposal_id != null)
                            <li>{{ $answer->proposal }} : {{ $answer->count }} ({{ ($answer->count/$statistics['total'])*100 }}%)</li>
                        @endif
                    @endforeach
                </ul>
            @endisset
        </div>
        @endisset
    </div>
@endsection