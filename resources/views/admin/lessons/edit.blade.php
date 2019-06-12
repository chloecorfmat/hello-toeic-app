@extends('layouts.app')

@section('content')
    <div class="main-content">
        {{ Breadcrumbs::render('lessons.edit', $lesson) }}
        <h1>Modifier</h1>
        @if ($errors->any())
            <div>
                <ul class="alert alert-error">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
        <form method="POST" action="{{ route('lessons.update', ['id' => $lesson->id]) }}" enctype="multipart/form-data">
            @csrf
            {{ method_field('PUT')}}

            <div class="field-container">
                <label for="name">Name <span class="required">*</span></label>
                <input type="text" id="name" name="name" value="{{ $lesson->name }}" required>
            </div>

            <div class="field-container">
                <label for="start">Start datetime <span class="required">*</span></label>
                <input
                        type="datetime-local"
                        id="start"
                        name="start"
                        aria-describedby="start-description"
                        value="{{ $lesson->start_datetime }}"
                        required
                >
                <p id="start-description">Format : YYYY-MM-DDTHH:MM (2018-06-07T00:00)</p>
            </div>

            <div class="field-container">
                <label for="end">End datetime <span class="required">*</span></label>
                <input
                        type="datetime-local"
                        id="end"
                        name="end"
                        aria-describedby="end-description"
                        value="{{ $lesson->end_datetime }}"
                        required
                >
                <p id="end-description">Format : YYYY-MM-DDTHH:MM (2018-06-07T00:00)</p>
            </div>

            <div class="field-container">
                <label for="choices-group">Group <span class="required">*</span></label>
                <select id="choices-group" name="group" id="group" required>
                    @foreach ($groups as $group)
                        <option
                                value="{{ $group->id }}"

                                @if ($group->id == $lesson->group_id)
                                selected
                                @endif
                        >
                            {{ $group->name }}
                        </option>
                    @endforeach
                </select>
            </div>

            <div class="field-container">
                <label for="choices-test">Test <span class="required">*</span></label>
                <select id="choices-test" name="test" id="test" required>
                    @foreach ($tests as $test)
                        <option
                                value="{{ $test->id }}"

                                @if ($test->id == $lesson->composite_test_id)
                                selected
                                @endif
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
