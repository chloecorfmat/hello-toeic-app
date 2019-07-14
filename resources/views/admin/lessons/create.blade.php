@extends('layouts.app')

@section('content')
    <div class="main-content">
        {{ Breadcrumbs::render('lessons.create') }}
        <h1>Ajouter une leçon</h1>
        @if ($errors->any())
            <div>
                <ul class="alert alert-error">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
        <form method="POST" action="{{ route('lessons.store') }}" enctype="multipart/form-data">
            @csrf

            <div class="field-container">
                <label for="name">Name <span class="required">*</span></label>
                <input type="text" id="name" name="name" required>
            </div>

            <div class="field-container">
                <label for="start">Start datetime <span class="required">*</span></label>
                <input type="datetime-local" id="start" name="start" aria-describedby="start-description" required>
                <p id="start-description">Format : YYYY-MM-DDTHH:MM (2018-06-07T00:00)</p>
            </div>

            <div class="field-container">
                <label for="end">End datetime <span class="required">*</span></label>
                <input type="datetime-local" id="end" name="end" aria-describedby="end-description" required>
                <p id="end-description">Format : YYYY-MM-DDTHH:MM (2018-06-07T00:00)</p>
            </div>

            <div class="field-container">
                <label for="choices-group">Group <span class="required">*</span></label>
                <select id="choices-group" name="group" id="group" required>
                    <option></option>
                    @foreach ($groups as $group)
                        <option
                                value="{{ $group->id }}"
                        >
                            {{ $group->name }}
                        </option>
                    @endforeach
                </select>
            </div>

            <div class="field-container">
                <label for="choices-test">Test <span class="required">*</span></label>
                <p class="test-description">Test concerned should be a composite test.</p>
                <select id="choices-test" name="test" id="test" required aria-describedby="test-description">
                    <option></option>
                    @foreach ($tests as $test)
                        <option
                                value="{{ $test->id }}"
                        >
                            {{ $test->name }}
                        </option>
                    @endforeach
                </select>
            </div>

            <button type="submit" class="btn btn-primary">
                {{ __('Validate') }}
            </button>
        </form>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const choices = new Choices('#choices-group');
            const choices_2 = new Choices('#choices-test');
        });
    </script>
@endsection
