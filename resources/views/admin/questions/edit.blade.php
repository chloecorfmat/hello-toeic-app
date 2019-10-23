@extends('layouts.app')

@section('content')
    @php ($index = ['A', 'B', 'C', 'D'])
    <div class="main-content">
        {{ Breadcrumbs::render('questions.edit', $datas['question']) }}
        <h1>{{ __('questions.edit') }}</h1>
        @if ($errors->any())
            <div>
                <ul class="alert alert-error">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
        <form method="POST" action="{{ route('questions.update', ['id' => $datas['question']->id]) }}">
            @csrf
            {{ method_field('PUT')}}

            <div class="field-container">
                <label for="question">{{ __('common.question') }} <span class="required">*</span></label>
                @php ($question_value = $datas['question']->question == '' ? '#none' : $datas['question']->question)
                <input type="text" id="question" name="question" value="{{ $question_value }}" aria-describedby="question-description" required>
                <p id="question-description">{{ __('questions.none-explanation') }}</p>
            </div>

            <div>
                @for ($i = 0; $i < 4; $i++)
                    <div class="field-container">
                        <label for="proposal{{ $index[$i] }}">{{ __('common.proposal') }} {{ $index[$i] }}</label>
                        @isset($datas['question']->proposals[$i])
                            @if (isset($datas['question']->answer->id) && $datas['question']->proposals[$i]->id === $datas['question']->answer->id)
                                @php ($selected = $index[$i])
                            @endif
                            <input type="text" name="proposals[]" id="proposal{{ $index[$i] }}" value="{{ $datas['question']->proposals[$i]->value }}">
                        @endisset

                        @empty($datas['question']->proposals[$i])
                            <input type="text" name="proposals[]" id="proposal{{ $index[$i] }}">
                        @endempty
                    </div>
                @endfor
            </div>

            <div class="field-container">
                <label for="answer">{{ __('common.answer') }} <span class="required">*</span></label>
                <select
                    name="answer"
                    id="answer"
                    required
                >
                    @empty($datas['question']->answer->id)
                        <option selected>---</option>
                    @endempty
                    @for ($i = 0; $i < 4; $i++)

                        <option
                            value="{{ $i }}"
                            @isset($selected)
                                @if ($selected === $index[$i])
                                    selected
                                @endif
                            @endisset
                        >
                            {{ __('common.proposal') }} {{ $index[$i] }}
                        </option>
                    @endfor
                </select>

                @empty($datas['question']->answer->id)
                    <p class="important danger">Vous devez sélectionner une bonne réponse.</p>
                @endif
            </div>

            <div class="field-container">
                <label for="choices-explanation">{{ __('common.explanation') }}</label>
                <select id="choices-explanation" name="explanation" id="explanation">
                    <option></option>
                    @foreach ($explanations as $explanation)
                        <option
                                value="{{ $explanation->id }}"
                                @if ($explanation->id == $datas['question']->explanation_id)
                                    selected
                                @endif
                        >
                            {{ $explanation->title }}
                        </option>
                    @endforeach
                </select>
            </div>

            <button type="submit" class="btn btn-primary">
                {{ __('common.validate') }}
            </button>
        </form>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const choices= new Choices('#choices-explanation');
        });
    </script>
@endsection
