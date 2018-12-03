@extends('layouts.app')

@section('content')
    <div class="main-content">
        <div class="main-content--header">
            <h1>Créer un test</h1>
        </div>
        @if ($message = Session::get('success'))
            <div class="alert alert-success">
                <p>{{ $message }}</p>
            </div>
        @endif

        <p>La création d'un test, blablabla...</p>

        <ul>
            @for($i = 1; $i < 8; $i++)
                <li><a href="{{ route('tests.exercise.create', ['type_id' => $i]) }}" class="btn">Partie {{ $i }}</a></li>
            @endfor
        </ul>


        <form method="POST" action="{{ route('tests.store') }}">
            @csrf

            <div class="field-container">
                <label for="name">Nom <span class="required">*</span></label>
                <input type="text" id="name" name="name" required>
            </div>

            @foreach($tests as $key => $tests_in_part)
                @if(count($tests_in_part) !== 0)
                    <div class="field-container">
                        <label for="part_{{ $key }}">Partie {{ $key }} <span class="required">*</span></label>
                        <select name="part_{{ $key }}" id="part_{{ $key }}" required>

                            @foreach ($tests_in_part as $test)
                                <option
                                        value="{{ $test->id }}"
                                >
                                    {{ $test->name }}
                                </option>
                            @endforeach
                        </select>
                    </div>
                @endisset
            @endforeach

            <input type="hidden" id="version" name="version" value="2018" required>

            <button type="submit" class="btn btn-primary">
                {{ __('Validate') }}
            </button>
        </form>
    </div>
@endsection
