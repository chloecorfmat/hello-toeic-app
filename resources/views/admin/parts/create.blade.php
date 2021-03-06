@extends('layouts.app')

@section('content')
    <div class="main-content">
        {{ Breadcrumbs::render('parts.create') }}
        <h1>{{ __('parts.add') }}</h1>
        @if ($errors->any())
            <div>
                <ul class="alert alert-error">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
        <form method="POST" action="{{ route('parts.store') }}" enctype="multipart/form-data">
            @csrf

            <div class="field-container">
                <label for="name">{{ __('common.name') }} <span class="required">*</span></label>
                <input type="text" id="name" name="name" required>
            </div>

            <div class="field-container">
                <label for="version">{{ __('common.version') }} <span class="required">*</span></label>
                <input type="number" id="version" name="version" min="1950" max="2150" required>
            </div>

            <div class="field-container">
                <label for="type">{{ __('common.type') }} <span class="required">*</span></label>
                <select name="type" id="type" required>
                    <option value="listening">{{ __('common.listening') }}</option>
                    <option value="reading">{{ __('common.reading') }}</option>
                </select>
            </div>

            <div class="field-container">
                <label for="description">{{ __('common.description') }} <span class="required">*</span></label>
                <textarea id="description" name="description" required></textarea>
            </div>

            <div class="field-container">
                <label for="nb-questions">{{ __('common.number-of-questions') }} <span class="required">*</span></label>
                <input type="number" id="nb-questions" name="nb-questions" min="0" max="1000" required>
            </div>

            <div class="field-container">
                <label for="nb-answers">{{ __('common.number-of-proposals') }} <span class="required">*</span></label>
                <input type="number" id="nb-answers" name="nb-answers" min="0" max="10" required>
            </div>

            <fieldset class="form-radio-el">
                <legend class="question-legend">{{ __('common.questions') }} ?</legend>
                <div>
                    <label for="hasQuestions">
                        <input type="radio" id="hasQuestions"
                               name="questions" value="true" />
                        <span class="radio-el"></span>
                        {{ __('common.yes') }}
                    </label>
                    <label for="noQuestions">
                        <input type="radio" id="noQuestions"
                               name="questions" value="false" />
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
                               name="texts" value="true" />
                        <span class="radio-el"></span>
                        {{ __('common.yes') }}
                    </label>
                    <label for="noTexts">
                        <input type="radio" id="noTexts"
                               name="texts" value="false" />
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
                               name="inline" value="true" />
                        <span class="radio-el"></span>
                        {{ __('common.yes') }}
                    </label>
                    <label for="isNotInline">
                        <input type="radio" id="isNotInline"
                               name="inline" value="false" />
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
                               name="files" value="true" />
                        <span class="radio-el"></span>
                        {{ __('common.yes') }}
                    </label>
                    <label for="noFiles">
                        <input type="radio" id="noFiles"
                               name="files" value="false" />
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
                >
                <p id="duration-description">{{ __('common.duration_explanation') }}</p>
            </div>

            <button type="submit" class="btn btn-primary">
                {{ __('common.validate') }}
            </button>
        </form>
    </div>
@endsection
