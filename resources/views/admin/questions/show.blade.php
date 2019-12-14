@extends('layouts.app')

@section('content')
    <div class="main-content">
        <div class="main-content--header">
            <a href="{{ route('questions.edit', ['id' => $question->id]) }}" class="main-content--header-actions" title="Modifier la question">
                <i class="fas fa-pencil-alt"></i>
            </a>
        </div>

        @if (count($question->documents()->get()))
        <div>
            <h2>{{ __('common.documents') }}</h2>
            <ul>
                @foreach ($question->documents()->get() as $document)
                    <li>
                        <a href="{{ route('documents.show', ['id' => $document->id]) }}">
                            @if (!empty($document->name))
                                {{ $document->name }} <span class="emphasis">({{ $document->type }})</span>
                            @else
                                <span class="emphasis">{{ __('documents.unamed') }} ({{ $document->type }})</span>
                            @endif
                        </a>
                    </li>
                @endforeach
            </ul>
        </div>
        @endif

        @if (count($exercises) > 0)
            <div>
                <h2>{{ __('app.exercises') }}</h2>
                <ul>
                    @foreach ($exercises as $exercise)
                        <li>
                            <a href="{{ route('exercises.show', ['id' => $exercise->id]) }}">
                                {{ $exercise->name }}
                            </a>
                        </li>
                    @endforeach
                </ul>
            </div>
        @endif


        @if ($explanation != null)
            <div>
                <h2>{{ __('common.explanation') }}</h2>
                <p class="important">{{ $explanation->title }}</p>
                <p>{{ $explanation->explanation }}</p>
            </div>
        @endif

        @isset($statistics['total'])
        <div>
            <h2>{{ __('common.statistics') }}</h2>
            @isset ($statistics['percent'])
                <p>{{ __('statistics.success-rate') }}: {{ $statistics['percent'] }}%</p>
            @endisset

            <p>{{ __('statistics.number-passages') }}: {{ $statistics['total'] }}</p>
            <p>{{ __('statistics.difficulty_rate') }} : {{ $question->difficulty_rate * 100 }}%</p>

            @isset($statistics['answers'])
                <h3>{{ __('statistics.user-choice') }} :</h3>
                <ul>
                    @foreach ($statistics['answers'] as $answer)
                        @if ($answer->proposal_id != null)
                            @php ($name = $answer->proposal)
                        @else
                            @php ($name = __('common.empty_answer'))
                        @endif

                            <li>{{ $name }} : {{ $answer->count }} ({{ ($answer->count/$statistics['total'])*100 }}%)</li>
                    @endforeach
                </ul>
            @endisset
        </div>
        @endisset
    </div>
@endsection
