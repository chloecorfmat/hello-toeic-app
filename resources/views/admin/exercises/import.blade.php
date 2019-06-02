@extends('layouts.app')

@section('content')
    <div class="main-content">
        {{ Breadcrumbs::render('exercises.import', $part) }}
        <h1>Import an exercise: {{ $part->name }} ({{ $part->version }})</h1>
        @if ($errors->any())
            <div>
                <ul>
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
                </div>
            @endif

            @if ($part->files)
            <div class="field-container">
                <label for="documents">Documents <span class="required">*</span></label>
                <input type="file" id="documents" name="documents" required>
            </div>
            @endif

            @if ($part->type === 'listening')
            <div class="field-container">
                <label for="audios">Audios <span class="required">*</span></label>
                <input type="file" id="audios" name="audios" required>
            </div>
            @endif

            <div class="field-container">
                <label for="answers">Answers <span class="required">*</span></label>
                <input type="file" id="answers" name="answers" required>
            </div>

            <input type="hidden" id="part" name="part" value="{{ $part->id }}">

            <button type="submit" class="btn btn-primary">
                {{ __('Validate') }}
            </button>
        </form>
    </div>
@endsection
