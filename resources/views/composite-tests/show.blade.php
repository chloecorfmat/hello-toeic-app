@extends('layouts.app')

@section('content')
    @php ($index = ['A', 'B', 'C', 'D'])
    @php ($current_document = null)
    <div class="main-content">
        {{ Breadcrumbs::render('student.composite-tests.show', $datas['test']) }}
        <h1>{{ $datas['test']->name }}</h1>

        <form method="POST" action="{{ route('student.composite-tests.update', ['id' => $datas['test']->id]) }}" id="test" class="test">
            @csrf
            {{ method_field('PUT')}}
            <ol>
                @foreach($datas['questions'] as $key => $exercise)
                    <li class="part" id="part_{{ $exercise['part']->id }}">
                        <button class="js-part-close btn-close" type="button" title="Close">
                            <i class="fas fa-times fa-2x"></i>
                        </button>

                        <h2>
                            @if ($exercise['part']->type === 'listening')
                                <i class="fas fa-volume-up"></i>
                            @else
                                <i class="fas fa-glasses"></i>
                            @endif
                            {{ $exercise['part']->name }}
                        </h2>

                        <p class="part-instructions">{{ $exercise['part']->description }}</p>

                        @if ($exercise['example'])
                            <div class="example documents">
                                <div class="document">
                                    <div class="img-preview">
                                        <img src="{{ url('storage/' . $exercise['example']->image) }}" alt="{{ __('questions.necessary-image') }}" id={{ "example_" . $exercise['part']->id }} />
                                    </div>
                                </div>
                                <ol>
                                    <li>
                                        <a href="{{ url('storage/' . $exercise['example']->image) }}" target="_blank" title="{{ __('common.show-image') }} - {{ __('common.new-window') }}">
                                            <i class="fas fa-external-link-alt"></i>
                                        </a>
                                    </li>
                                </ol>
                            </div>
                        @endif

                        <ul class="questions">
                            @if($exercise['part']->inline)
                                @inject('render', 'App\Services\RenderService')
                                @php ($d = null)
                                @php ($qs = [])
                                @foreach ($exercise['questions'] as $question)
                                    @if (!is_null($d) && ($d->id == $question->documents()->get()[0]->id))
                                        @php ($qs[] = $question)
                                    @else
                                        @if (!empty($qs))
                                            <li class="block-question part-inline">
                                                {!! $render->inline($d->content, $qs, $exercise['exercise']->id) !!}
                                            </li>
                                        @endif
                                        @php ($d = $question->documents()->get()[0])
                                        @php ($qs = [])
                                        @php ($qs[] = $question)
                                    @endif
                                @endforeach
                                @if (!empty($qs))
                                    <li class="block-question part-inline">
                                        {!! $render->inline($d->content, $qs, $exercise['exercise']->id) !!}
                                    </li>
                                @endif
                            @else
                                @foreach ($exercise['questions'] as $question)
                            @if ($exercise['part']->texts)
                                <div>
                                    @foreach ($question->documents as $document)
                                        @if ($document->type === 'text' && $document->id !== $current_document)
                                            @php ($current_document = $document->id)
                                            <p>{!! $document->content !!}</p>
                                        @endif
                                    @endforeach
                                </div>
                            @endif

                            <li class="block-question" data-part="{{ $exercise['part'] }}">
                                <fieldset class="form-radio-el">
                                    <legend class="question-legend">
                                        @if ($exercise['part']->type === 'listening')
                                            <i class="fas fa-volume-up"></i>
                                        @else
                                            <i class="fas fa-glasses"></i>
                                        @endif
                                        ({{ $question->number }}) {{ $question->question }}
                                    </legend>
                                    @foreach ($question->proposals as $k => $proposal)
                                        <div>
                                            <label for="{{ 'e' . $exercise['exercise']->id . '-q' . $question->id . '-p' . $proposal->id }}">
                                                <input type="radio" id="{{ 'e' . $exercise['exercise']->id . '-q' . $question->id . '-p' . $proposal->id }}"
                                                       name="{{ 'e' . $exercise['exercise']->id . '-q' . $question->id }}" value="{{ $proposal->id }}" />
                                                <span class="radio-el"></span>
                                                <span class="label-text">{{ $index[$k] }}. {{ $proposal->value }}</span>
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
                            @endif
                        </ul>
                    </li>
                @endforeach
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

    <div class="preview hidden" id="preview">
    </div>
@endsection
