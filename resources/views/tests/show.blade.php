@extends('layouts.app')

@section('content')
    @php ($index = ['A', 'B', 'C', 'D'])
    @php ($current_part = 0)
    @php ($parts_listening = [2, 3, 4, 5])
    <div class="main-content">
        <h1>{{ $datas['test']->name }}</h1>

        <form method="POST" action="{{ route('student.tests.update', ['id' => $datas['test']->id]) }}" id="test">
            @csrf
            {{ method_field('PUT')}}
            <ol>
                @foreach ($datas['questions'] as $key => $question)
                    @if ($current_part !== $question->parts[0]->id)
                        @php($current_part = $question->parts[0]->id)
                        @if ($current_part === 0)
                            <li class="part">
                        @else
                            </ul>
                            </li>
                            <li class="part">
                        @endif
                        <button class="js-part-close btn-close" type="button" title="Close">
                            <i class="fas fa-times fa-2x"></i>
                        </button>
                        <h2>{{ $question->parts[0]->name }}</h2>
                        <p>{{ $question->parts[0]->description }}</p>
                        <ul class="questions">
                    @endif
                                <li class="block-question">
                                    <fieldset class="form-radio-el">
                                        <legend class="question-legend">
                                            @if (in_array($current_part, $parts_listening))
                                                <i class="fas fa-volume-up"></i>
                                            @else
                                                <i class="fas fa-glasses"></i>
                                            @endif
                                            ({{ $question->number }}) {{ $question->question }}
                                        </legend>
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
                                                <img src="{{ url('storage/' . $document->url) }}" alt="Image necessary for this question." />
                                            @endif
                                        @endforeach
                                    </div>
                                </li>
                            @endforeach
                        </ul>
                </li>
            </ol>
            <button type="submit" class="btn">
                {{ __('Validate') }}
            </button>
        </form>
    </div>
@endsection
