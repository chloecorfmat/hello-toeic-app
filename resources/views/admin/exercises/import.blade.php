@extends('layouts.app')

@section('content')
    <div class="main-content">
        {{ Breadcrumbs::render('exercises.import', $part) }}
        <h1>Import an exercise: {{ $part->name }} ({{ $part->version }})</h1>
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
                <label for="name">Name <span class="required">*</span></label>
                <input type="text" id="name" name="name" required>
            </div>

            @if ($part->questions or $part->texts)
                <div class="field-container">
                    <label for="questions">Questions <span class="required">*</span></label>
                    <input type="file" id="questions" name="questions" required>
                    <p>Veuillez ajouter un fichier .txt.</p>
                </div>
            @endif

            @if ($part->files)
            <div class="field-container">
                <label for="documents">Documents <span class="required">*</span></label>
                <input type="file" id="documents" name="documents" required>
                <p>Veuillez ajouter un zip comprenant tous les fichiers.</p>
            </div>
            @endif

            @if ($part->type === 'listening')
            <div class="field-container">
                <label for="audios">Audios <span class="required">*</span></label>
                <input type="file" id="audios" name="audios" required>
                <p>Veuillez ajouter un zip s'il y a plusieurs fichiers audios. Sinon, vous pouvez ajouter un fichier MP3.</p>
            </div>
            @endif

            <div class="field-container">
                <label for="answers">Answers <span class="required">*</span></label>
                <input type="file" id="answers" name="answers" required>
                <p>Veuillez ajouter un fichier .txt.</p>
            </div>

            <input type="hidden" id="part" name="part" value="{{ $part->id }}">

            <button type="submit" class="btn btn-primary">
                {{ __('Validate') }}
            </button>
        </form>
    </div>
@endsection
