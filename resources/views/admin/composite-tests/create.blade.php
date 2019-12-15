@extends('layouts.app')

@section('content')
    <div class="main-content">
        <form method="POST" action="{{ route('composite-tests.store') }}">
            @csrf

            <div class="field-container">
                <label for="name">{{ __('common.name') }} <span class="required">*</span></label>
                <input type="text" id="name" name="name" required>
            </div>

            <div class="field-container">
                <label for="version">{{ __('common.version') }} <span class="required">*</span></label>
                <input type="number" id="version" name="version" required>
            </div>

            <div class="field-container">
                <label for="visible">{{ __('common.visibility') }} <span class="required">*</span></label>
                <input type="number" id="visible" name="visible" min="0" max="1" step="1" aria-describedby="visible-description" required>
                <p id="visible-description">{{ __('common.visibility_explanation') }}</p>
            </div>

            <div class="field-container">
                <label for="reading-duration">{{ __('common.reading-duration') }}</label>
                <input type="number" id="reading-duration" name="reading_duration" min="0" step="1" aria-describedby="reading-duration-description">
                <p id="reading-duration-description">{{ __('common.reading-duration_explanation') }}</p>
            </div>

            <fieldset>
                <legend>{{ __('composite-tests.composition') }}</legend>
                <p>{{ __('composite-tests.composition_explanation') }}</p>
                @for ($i = 1; $i < 8; $i++)
                    <div class="field-container">
                        <label for="exercise_part{{ $i }}">Part {{ $i }}</label>
                        <select id="exercise_part{{ $i }}" name="exercise_part{{ $i }}">
                            <option></option>
                            @foreach ($exercises as $exercise)
                                <option
                                        value="{{ $exercise->id }}"
                                >
                                    {{ $exercise->name }}
                                </option>
                            @endforeach
                        </select>
                    </div>
                @endfor
            </fieldset>

            <button type="submit" class="btn btn-primary">
                {{ __('common.validate') }}
            </button>
        </form>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            @for ($i = 1; $i < 8; $i++)
                const choices{{ $i }} = new Choices('#exercise_part{{ $i }}');
            @endfor
        });
    </script>
@endsection
