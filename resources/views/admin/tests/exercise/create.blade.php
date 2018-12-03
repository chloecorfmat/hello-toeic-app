@extends('layouts.app')

@section('content')
    <div class="main-content">
        <div class="main-content--header">
            <h1>Partie {{ $type_id }}</h1>
        </div>
        @if ($message = Session::get('success'))
            <div class="alert alert-success">
                <p>{{ $message }}</p>
            </div>
        @endif

        <p>{{ $datas['description'] }}</p>

        <form method="POST" action="{{ route('tests.exercise.store', ['type_id' => $type_id]) }}">
            @csrf

            <div class="field-container">
                <label for="name">Nom <span class="required">*</span></label>
                <input type="text" id="name" name="name" required>
            </div>

            @for ($i = 0; $i < $datas['number']; $i++)
                <div class="field-container">
                    <label for="{{ $datas['type'] }}_{{ $i }}">{{ $datas['type'] }} {{ $i+1 }} <span class="required">*</span></label>
                    <select name="{{ $datas['type'] }}_{{ $i }}" id="{{ $datas['type'] }}_{{ $i }}" required>

                        @foreach ($datas['datas'] as $data)
                            <option
                                    value="{{ $data->id }}"
                            >
                                @if ($datas['type'] == 'question')
                                    {{ $data->question }}
                                @elseif ($datas['type'] == 'document')
                                    {{ $data->name }}
                                @endif
                            </option>
                        @endforeach
                    </select>
                </div>
            @endfor

            <input type="hidden" id="version" name="version" value="2018" required>

            <input type="hidden" id="part" name="part" value="{{ $type_id+1 }}" required>

            <button type="submit" class="btn btn-primary">
                {{ __('Validate') }}
            </button>
        </form>
    </div>
@endsection
