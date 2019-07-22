@extends('layouts.app')

@section('content')
    <div class="main-content">
        @php ($index = ['A', 'B', 'C', 'D'])
        {{ Breadcrumbs::render('games.continue') }}
        <h1>Play game</h1>
        <form method="POST" action="{{ route('games.continue') }}">
            @csrf
            <fieldset class="form-radio-el">
                <legend class="question-legend">({{ $datas['question']->number }}) {{ $datas['question']->question }}</legend>
                @foreach ($datas['question']->proposals as $k => $proposal)
                    <div>
                        <label for="{{ 'question-' . $proposal->id }}">
                            <input type="radio" id="{{ 'question-' . $proposal->id }}"
                                   name="question_answer" value="{{ $proposal->id }}" />
                            <span class="radio-el"></span>
                            {{ $index[$k] }}. {{ $proposal->value }}
                        </label>
                    </div>
                @endforeach
            </fieldset>

            <input type="hidden" name="question_id" value="{{ $datas['question']->id }}">
            <button type="submit" class="btn btn-primary">
                {{ __('common.validate') }}
            </button>
        </form>
    </div>
@endsection
