@extends('layouts.app')

@section('content')
    <div class="main-content">
        {{ Breadcrumbs::render('exercises.import', $part) }}
        <h1>{{ __('exercises.import_title') }}: {{ $part->name }} ({{ $part->version }})</h1>
        @if ($errors->any())
            <div>
                <ul class="alert alert-error">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
        <form method="POST" action="{{ route('exercises.storeImport') }}" enctype="multipart/form-data">
            @csrf

            <div class="field-container">
                <label for="name">{{ __('common.name') }} <span class="required">*</span></label>
                <input type="text" id="name" name="name" required>
            </div>

            @if ($part->questions or $part->texts)
                <div class="field-container">
                    <label for="questions">{{ __('common.questions') }} <span class="required">*</span></label>
                    <input type="file" id="questions" name="questions" required>
                    <p>{{ __('form.txt-format_required') }}</p>
                </div>
            @endif

            @if ($part->files)
            <div class="field-container">
                <label for="documents">{{ __('common.documents') }} <span class="required">*</span></label>
                <input type="file" id="documents" name="documents" required>
                <p>{{ __('form.zip-format_required') }}</p>
            </div>
            @endif

            @if ($part->type === 'listening')
            <div class="field-container">
                <label for="audios">{{ __('common.audios') }} <span class="required">*</span></label>
                <input type="file" id="audios" name="audios" required>
                <p>{{ __('form.audios-file-format') }}</p>
            </div>
            @endif

            <div class="field-container">
                <label for="answers">{{ __('common.answers') }} <span class="required">*</span></label>
                <input type="file" id="answers" name="answers" required>
                <p>{{ __('form.txt-format_required') }}</p>
            </div>

            <input type="hidden" id="part" name="part" value="{{ $part->id }}">

            <button type="submit" class="btn btn-primary">
                {{ __('common.validate') }}
            </button>
        </form>
    </div>
@endsection
