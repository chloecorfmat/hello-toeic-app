@extends('layouts.app')

@section('content')
    @php ($index = ['A', 'B', 'C', 'D'])
    @php ($current_part = null)
    @php ($parts_listening = [2, 3, 4, 5])
    @php ($current_document = null)
    <div class="main-content">
        <h1>{{ $datas['test']->name }}</h1>

        <form method="POST" action="{{ route('student.tests.update', ['id' => $datas['test']->id]) }}" id="test" class="test">
            @csrf
            {{ method_field('PUT')}}
            <ol>
                @foreach ($datas['questions'] as $key => $question)
                    @if ($current_part !== $question->parts[0]->id)
                        @if ($current_part == null)
                            <li class="part" id="part_{{ $question->parts[0]->id }}">
                                <button class="js-part-close btn-close" type="button" title="Close">
                                    <i class="fas fa-times fa-2x"></i>
                                </button>
                        @else
                            </ul>
                            </li>
                            <li class="part part-hide" id="part_{{ $question->parts[0]->id }}">
                                <button class="js-part-close btn-close" type="button" title="Close">
                                    <i class="fas fa-chevron-down fa-2x"></i>
                                </button>
                        @endif
                        @php($current_part = $question->parts[0]->id)
                        <h2>
                            @if (in_array($current_part, $parts_listening))
                                <i class="fas fa-volume-up"></i>
                            @else
                                <i class="fas fa-glasses"></i>
                            @endif
                            {{ $question->parts[0]->name }}
                        </h2>
                        <p class="part-instructions">{{ $question->parts[0]->description }}</p>
                        <ul class="questions">
                    @endif
                                @if ($current_part == 7)
                                    <div>
                                        @foreach ($question->documents as $document)
                                            @if ($document->type === 'text' && $document->id !== $current_document)
                                                @php ($current_document = $document->id)
                                                <p>{!! $document->content !!}</p>
                                            @endif
                                        @endforeach
                                    </div>
                                @endif
                                <li class="block-question" data-part="{{ $current_part }}">
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
                                            <label for="{{ $key . '-' . $proposal->id }}">
                                                <input type="radio" id="{{ $key . '-' . $proposal->id }}"
                                                       name="{{ $key }}" value="{{ $proposal->id }}" />
                                                <span class="radio-el"></span>
                                                {{ $index[$k] }}. {{ $proposal->value }}
                                            </label>
                                        </div>
                                        @endforeach
                                    </fieldset>

                                    <div class="documents">
                                        @foreach ($question->documents as $document)
                                            @if ($document->type === 'image')
                                                <button type="button" class="img-preview">
                                                    <img src="{{ url('storage/' . $document->url) }}" alt="Image necessary for this question." />
                                                    <!--<i class="fas fa-search-plus"></i>-->
                                                </button>
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
            {{--
            <button type="reset" class="btn">
                {{ __('Reset') }}
            </button>
             --}}

        </form>
    </div>

    <div class="preview hidden">
    </div>
@endsection
