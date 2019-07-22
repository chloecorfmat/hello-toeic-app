@extends('layouts.app')

@section('content')
    <div class="main-content">
        <div class="main-content--header">
            {{ Breadcrumbs::render('composite-tests.edit', $test) }}
            <h1>{{ __('common.edit') }}</h1>
        </div>
        @if ($errors->any())
            <div>
                <ul class="alert alert-error">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        @if ($message = Session::get('success'))
            <div class="alert alert-success">
                <p>{{ $message }}</p>
            </div>
        @endif

        <form method="POST" action="{{ route('composite-tests.update', ['id' => $test->id]) }}">
            @csrf
            {{ method_field('PUT')}}

            <div class="field-container">
                <label for="name">{{ __('common.name') }} <span class="required">*</span></label>
                <input type="text" id="name" name="name" value="{{ $test->name }}" required>
            </div>

            <div class="field-container">
                <label for="version">{{ __('common.version') }} <span class="required">*</span></label>
                <input type="number" id="version" name="version" value="{{ $test->version }}" required>
            </div>

            <div class="field-container">
                <label for="visible">{{ __('common.visibility') }} <span class="required">*</span></label>
                <input
                        type="number"
                        id="visible"
                        name="visible"
                        min="0"
                        max="1"
                        step="1"
                        aria-describedby="visible-description"
                        value="{{ $test->visible }}"
                        required
                >
                <p id="visible-description">{{ __('common.visibility_explanation') }}</p>
            </div>

            <div class="field-container">
                <label for="reading-duration">{{ __('common.reading-duration') }}</label>
                <input
                        type="number"
                        id="reading-duration"
                        name="reading_duration"
                        min="0"
                        step="1"
                        aria-describedby="reading-duration-description"
                        value="{{ $test->reading_duration }}"
                >
                <p id="reading-timer-description">{{ __('common.reading-duration_explanation') }}</p>
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
                                @php($p = "exercise_part" . $i)
                                <option
                                        value="{{ $exercise->id }}"

                                        @if($test->$p == $exercise->id)
                                            selected
                                        @endif
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
