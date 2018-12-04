@extends('layouts.app')

@section('content')
    @php ($index = ['A', 'B', 'C', 'D'])
    <div class="main-content">
        <h1>{{ $datas['test']->name }}</h1>


        @if ($datas['test']->part->id !== 1)
            <p>{{ $datas['test']->part->description }}</p>
        @endif

        <form method="POST" action="{{ route('student.tests.update', ['id' => $datas['test']->id]) }}" id="test">
            @csrf
            {{ method_field('PUT')}}
            <ol>
                @foreach ($datas['questions'] as $key => $question)
                    <li class="block-question">
                        <fieldset class="form-radio-el">
                            <legend class="question-legend">({{ $question->number }}) {{ $question->question }}</legend>
                            @foreach ($question->proposals as $k => $proposal)
                            <div>
                                <input type="radio" id="{{ $key . '-' . $proposal->id }}"
                                       name="{{ $key }}" value="{{ $proposal->id }}" />
                                <span class="radio-el"></span>
                                <label for="{{ $key . '-' . $proposal->id }}">{{ $index[$k] }}. {{ $proposal->value }}</label>
                            </div>
                            @endforeach
                        </fieldset>

                        <div class="documents">
                            @foreach ($question->documents as $document)
                                @if ($document->type === 'image')
                                    <img src="{{ url('storage/' . $document->url) }}" />
                                @elseif ($document->type === 'audio')
                                    <i class="fas fa-volume-up"></i>
                                @endif
                            @endforeach
                        </div>
                    </li>
                @endforeach
            </ol>
            <button type="submit" class="btn">
                {{ __('Validate') }}
            </button>
        </form>
    </div>
@endsection
