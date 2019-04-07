@extends('layouts.app')

@section('content')
    <div class="main-content">
        <div class="main-content--header">
            <h1>Créer un test composé</h1>
        </div>
        @if ($message = Session::get('success'))
            <div class="alert alert-success">
                <p>{{ $message }}</p>
            </div>
        @endif

        <p>La création d'un test, blablabla...</p>

        <form method="POST" action="{{ route('composite-tests.store') }}">
            @csrf

            <div class="field-container">
                <label for="name">Nom <span class="required">*</span></label>
                <input type="text" id="name" name="name" required>
            </div>

            <div class="field-container">
                <label for="version">Version <span class="required">*</span></label>
                <input type="text" id="version" name="version" required>
            </div>

            @for ($i = 1; $i < 8; $i++)
                <div class="field-container">
                    <label for="choices-part{{ $i }}">Part {{ $i }}</label>
                    <select id="choices-part{{ $i }}" name="part_{{ $i }}" id="part_{{ $i }}">
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

            <button type="submit" class="btn btn-primary">
                {{ __('Validate') }}
            </button>
        </form>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            @for ($i = 1; $i < 8; $i++)
                const choices{{ $i }} = new Choices('#choices-part{{ $i }}');
            @endfor
        });
    </script>
@endsection
