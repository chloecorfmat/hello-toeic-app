@extends('layouts.app')

@section('content')
    <div class="main-content">
        <form method="POST" action="{{ route('parts.update', ['id' => $part->id]) }}" enctype="multipart/form-data">
            @csrf
            {{ method_field('PUT')}}

            <div class="field-container">
                <label for="name">{{ __('common.name') }} <span class="required">*</span></label>
                <input type="text" id="name" name="name" value="{{ $part->name }}"required>
            </div>

            <div class="field-container">
                <label for="version">{{ __('common.version') }} <span class="required">*</span></label>
                <input type="number" id="version" name="version" min="1950" max="2150" value="{{ $part->version }}" required>
            </div>

            <div class="field-container">
                <label for="type">{{ __('common.type') }} <span class="required">*</span></label>
                <select name="type" id="type" required>
                    <option value="listening" @if($part->type == 'listening') selected @endif>{{ __('common.listening') }}</option>
                    <option value="reading" @if($part->type == 'reading') selected @endif>{{ __('common.reading') }}</option>
                </select>
            </div>

            <div class="field-container">
                <label for="description">{{ __('common.description') }} <span class="required">*</span></label>
                <textarea id="description" name="description" required>{{ $part->description }}</textarea>
            </div>

            <div class="field-container">
                <label for="nb-questions">{{ __('common.number-of-questions') }} <span class="required">*</span></label>
                <input type="number" id="nb-questions" name="nb-questions" min="0" max="1000" value="{{ $part->nb_questions }}" required>
            </div>

            <div class="field-container">
                <label for="nb-answers">{{ __('common.number-of-proposals') }} <span class="required">*</span></label>
                <input type="number" id="nb-answers" name="nb-answers" min="0" max="10" value="{{ $part->nb_answers }}" required>
            </div>

            <fieldset class="form-radio-el">
                <legend class="question-legend">{{ __('common.questions') }} ?</legend>
                <div>
                    <label for="hasQuestions">
                        <input type="radio" id="hasQuestions"
                               name="questions" value="true"
                               @if ($part->questions) checked @endif
                        />
                        <span class="radio-el"></span>
                        {{ __('common.yes') }}
                    </label>
                    <label for="noQuestions">
                        <input type="radio" id="noQuestions"
                               name="questions" value="false"
                               @if (!$part->questions) checked @endif
                        />
                        <span class="radio-el"></span>
                        {{ __('common.no') }}
                    </label>
                </div>
            </fieldset>

            <fieldset class="form-radio-el">
                <legend class="question-legend">{{ __('common.texts') }} ?</legend>
                <div>
                    <label for="hasTexts">
                        <input type="radio" id="hasTexts"
                               name="texts" value="true"
                               @if ($part->texts) checked @endif
                        />
                        <span class="radio-el"></span>
                        {{ __('common.yes') }}
                    </label>
                    <label for="noTexts">
                        <input type="radio" id="noTexts"
                               name="texts" value="false"
                               @if (!$part->texts) checked @endif
                        />
                        <span class="radio-el"></span>
                        {{ __('common.no') }}
                    </label>
                </div>
            </fieldset>

            <fieldset class="form-radio-el">
                <legend class="question-legend">{{ __('common.inline') }} ?</legend>
                <p>{{ __('common.inline_explanation') }}</p>
                <div>
                    <label for="isInline">
                        <input type="radio" id="isInline"
                               name="inline" value="true"
                               @if ($part->inline) checked @endif
                        />
                        <span class="radio-el"></span>
                        {{ __('common.yes') }}
                    </label>
                    <label for="isNotInline">
                        <input type="radio" id="isNotInline"
                               name="inline" value="false"
                               @if (!$part->inline) checked @endif
                        />
                        <span class="radio-el"></span>
                        {{ __('common.no') }}
                    </label>
                </div>
            </fieldset>

            <fieldset class="form-radio-el">
                <legend class="question-legend">{{ __('common.files') }} ?</legend>
                <div>
                    <label for="hasFiles">
                        <input type="radio" id="hasFiles"
                               name="files" value="true"
                               @if ($part->files) checked @endif
                        />
                        <span class="radio-el"></span>
                        {{ __('common.yes') }}
                    </label>
                    <label for="noFiles">
                        <input type="radio" id="noFiles"
                               name="files" value="false"
                               @if (!$part->files) checked @endif
                        />
                        <span class="radio-el"></span>
                        {{ __('common.no') }}
                    </label>
                </div>
            </fieldset>

            <div class="field-container">
                <label for="duration">{{ __('common.duration') }}</label>
                <input
                        type="number"
                        id="duration"
                        name="duration"
                        min="0"
                        step="1"
                        aria-describedby="duration-description"
                        value="{{ $part->duration }}"
                >
                <p id="duration-description">{{ __('common.duration_explanation') }}</p>
            </div>

            <button type="submit" class="btn btn-primary">
                {{ __('common.validate') }}
            </button>
        </form>
    </div>
@endsection
