@extends('layouts.app')

@section('content')
    @php ($index = ['A', 'B', 'C', 'D'])
    @php ($current_part = null)
    @php ($current_document = null)
    <div class="main-content">
        <h1>{{ $exercise->name }}</h1>

        <form method="POST" action="{{ route('student.exercises.update', ['id' => $exercise->id]) }}" id="test" class="test">
            @csrf
            {{ method_field('PUT')}}
            @if ($part->inline)
                @inject('render', 'App\Services\RenderService')
                <ol>
                    <li class="part" id="part_{{ $part->id }}">
                        <button class="js-part-close btn-close" type="button" title="Close">
                            <i class="fas fa-times fa-2x"></i>
                        </button>

                        <h2>
                            @if ($part->type == "listening")
                                <i class="fas fa-volume-up"></i>
                            @else
                                <i class="fas fa-glasses"></i>
                            @endif
                            {{ $part->name }}
                        </h2>
                        <p class="part-instructions">{{ $part->description }}</p>
                        <ul class="questions">
                            @php ($d = null)
                            @php ($qs = [])
                            @foreach ($questions as $question)
                                @if (!is_null($d) && ($d->id == $question->documents()->get()[0]->id))
                                    @php ($qs[] = $question)
                                @else
                                    @if (!empty($qs))
                                        <li class="block-question">
                                            {!! $render->inline($d->content, $qs, -1) !!}
                                        </li>
                                    @endif
                                    @php ($d = $question->documents()->get()[0])
                                    @php ($qs = [])
                                    @php ($qs[] = $question)
                                @endif
                            @endforeach
                            @if (!empty($qs))
                                <li class="block-question">
                                    {!! $render->inline($d->content, $qs, -1) !!}
                                </li>
                            @endif
                        </ul>
                    </li>
                </ol>
            @else
                <ol>
                @foreach ($questions as $key => $question)
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
                                    @if ($question->parts[0]->type == "listening")
                                        <i class="fas fa-volume-up"></i>
                                    @else
                                        <i class="fas fa-glasses"></i>
                                    @endif
                                    {{ $question->parts[0]->name }}
                                </h2>
                                <p class="part-instructions">{{ $question->parts[0]->description }}</p>
                                <ul class="questions">
                                    @endif
                                    @if ($question->parts[0]->texts)
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
                                                @if ($question->parts[0]->type == "listening")
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
                                            @foreach ($question->documents as $key => $document)
                                                @if ($document->type === 'image')
                                                    <div class="document">
                                                        <div class="img-preview">
                                                            <img src="{{ url('storage/' . $document->url) }}" alt="Image necessary for this question." id="{{ $question->number }}_{{ $key }}" />
                                                        </div>
                                                    </div>
                                                @endif
                                            @endforeach

                                            @foreach ($question->documents as $key => $document)
                                                @if ($document->type === 'image')
                                                    <ol>
                                                        <li>
                                                            <a href="{{ url('storage/' . $document->url) }}" target="_blank" title="View image - Open new window">
                                                                <i class="fas fa-external-link-alt"></i>
                                                            </a>
                                                        </li>
                                                    </ol>
                                                @endif
                                            @endforeach
                                        </div>
                                    </li>
                                    @endforeach
                                </ul>
                            </li>
            </ol>
            @endif
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

    <div class="preview hidden" id="preview">
    </div>
@endsection
