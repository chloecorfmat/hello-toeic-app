@extends('layouts.app')

@section('content')
    <div class="main-content">
        <form method="POST" action="{{ route('lessons.store') }}" enctype="multipart/form-data">
            @csrf

            <div class="field-container">
                <label for="name">{{ __('common.name') }} <span class="required">*</span></label>
                <input type="text" id="name" name="name" required>
            </div>

            <div class="field-container">
                <label for="start">{{ __('common.datetime_start') }} <span class="required">*</span></label>
                <input type="datetime-local" id="start" name="start" aria-describedby="start-description" required>
                <p id="start-description">{{ __('form.datetime-local_format') }}</p>
            </div>

            <div class="field-container">
                <label for="end">{{ __('common.datetime_end') }} <span class="required">*</span></label>
                <input type="datetime-local" id="end" name="end" aria-describedby="end-description" required>
                <p id="end-description">{{ __('form.datetime-local_format') }}</p>
            </div>

            <div class="field-container">
                <label for="choices-group">{{ __('common.group') }} <span class="required">*</span></label>
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
                <label for="choices-test">{{ __('app.composite-test') }} <span class="required">*</span></label>
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
                {{ __('common.validate') }}
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
