@extends('layouts.app')

@section('content')
    <div class="main-content">
        <div class="main-content--header">
            {{ Breadcrumbs::render('explanations.show', $explanation) }}
            <h1>Détails de l'explication</h1>
        </div>

        <p>Title : <span>{{ $explanation->title }}</span></p>
        <p>Details : <span>{{ $explanation->explanation }}</span></p>

        <div class="part-container">
            <h2>Relative questions</h2>
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
                        <th scope="col">Actions</th>
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
                                <a href="{{ route('questions.show', ['id' => $question->id]) }}" title="Show question">
                                    <i class="fas fa-eye"></i>
                                </a>
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>


            <div class="container-empty-search" id="js-empty-search" aria-hidden="true">
                <p class="emphasis">Aucun résultat.</p>
            </div>
        </div>
    </div>
@endsection
