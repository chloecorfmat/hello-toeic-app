@extends('layouts.app')

@section('content')
    <div class="main-content">
        <div class="main-content--header">
            {{ Breadcrumbs::render('questions.show', $question) }}
            <h1>Détails de la question</h1>
            <a href="{{ route('questions.edit', ['id' => $question->id]) }}" class="main-content--header-actions" title="Modifier la question">
                <i class="fas fa-pencil-alt"></i>
            </a>
        </div>

        @if (count($question->documents()->get()))
        <div>
            <h2>Documents liés</h2>
            <ul>
                @foreach ($question->documents()->get() as $document)
                    <li>
                        <a href="{{ route('documents.show', ['id' => $document->id]) }}">
                            @if (!empty($document->name))
                                {{ $document->name }} <span class="emphasis">({{ $document->type }})</span>
                            @else
                                <span class="emphasis">Unamed document ({{ $document->type }})</span>
                            @endif
                        </a>
                    </li>
                @endforeach
            </ul>
        </div>
        @endif

        @if ($explanation != null)
            <div>
                <h2>Explanation</h2>
                <p class="important">{{ $explanation->title }}</p>
                <p>{{ $explanation->explanation }}</p>
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
