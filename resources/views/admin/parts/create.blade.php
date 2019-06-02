@extends('layouts.app')

@section('content')
    <div class="main-content">
        {{ Breadcrumbs::render('parts.create') }}
        <h1>Ajouter un type d'exercice</h1>
        @if ($errors->any())
            <div>
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
        <form method="POST" action="{{ route('parts.store') }}" enctype="multipart/form-data">
            @csrf

            <div class="field-container">
                <label for="name">Nom <span class="required">*</span></label>
                <input type="text" id="name" name="name" required>
            </div>

            <div class="field-container">
                <label for="version">Version <span class="required">*</span></label>
                <input type="number" id="version" name="version" min="1950" max="2150" required>
            </div>

            <div class="field-container">
                <label for="type">Type <span class="required">*</span></label>
                <select name="type" id="type" required>
                    <option value="listening">Listening</option>
                    <option value="reading">Reading</option>
                </select>
            </div>

            <div class="field-container">
                <label for="description">Description <span class="required">*</span></label>
                <textarea id="description" name="description" required></textarea>
            </div>

            <div class="field-container">
                <label for="nb-questions">Nombre de questions <span class="required">*</span></label>
                <input type="number" id="nb-questions" name="nb-questions" min="0" max="1000" required>
            </div>

            <fieldset class="form-radio-el">
                <legend class="question-legend">Questions ?</legend>
                <div>
                    <label for="hasQuestions">
                        <input type="radio" id="hasQuestions"
                               name="questions" value="true" />
                        <span class="radio-el"></span>
                        Yes
                    </label>
                    <label for="noQuestions">
                        <input type="radio" id="noQuestions"
                               name="questions" value="false" />
                        <span class="radio-el"></span>
                        No
                    </label>
                </div>
            </fieldset>

            <fieldset class="form-radio-el">
                <legend class="question-legend">Texts ?</legend>
                <div>
                    <label for="hasTexts">
                        <input type="radio" id="hasTexts"
                               name="texts" value="true" />
                        <span class="radio-el"></span>
                        Yes
                    </label>
                    <label for="noTexts">
                        <input type="radio" id="noTexts"
                               name="texts" value="false" />
                        <span class="radio-el"></span>
                        No
                    </label>
                </div>
            </fieldset>

            <fieldset class="form-radio-el">
                <legend class="question-legend">Files ?</legend>
                <div>
                    <label for="hasFiles">
                        <input type="radio" id="hasFiles"
                               name="files" value="true" />
                        <span class="radio-el"></span>
                        Yes
                    </label>
                    <label for="noFiles">
                        <input type="radio" id="noFiles"
                               name="files" value="false" />
                        <span class="radio-el"></span>
                        No
                    </label>
                </div>
            </fieldset>

            <button type="submit" class="btn btn-primary">
                {{ __('Validate') }}
            </button>
        </form>
    </div>
@endsection
