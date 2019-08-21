@extends('layouts.app')

@section('content')
    <div class="main-content">
        <div class="main-content--header">
            {{ Breadcrumbs::render('exercises.edit', $exercise) }}
            <h1>{{ __('common.edit') }}</h1>
        </div>
        @if ($message = Session::get('success'))
            <div class="alert alert-success">
                <p>{{ $message }}</p>
            </div>
        @endif

        <form method="POST" action="{{ route('exercises.update', ['id' => $exercise->id]) }}">
            @csrf
            {{ method_field('PUT')}}

            <div class="field-container">
                <label for="name">{{ __('common.name') }} <span class="required">*</span></label>
                <input type="text" id="name" name="name" value="{{ $exercise->name }}" required>
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
                        value="{{ $exercise->visible }}"
                        required
                >
                <p id="visible-description">{{ __('common.visibility_explanation') }}</p>
            </div>

            <div class="field-container">
                <label for="example">{{ __('common.example') }}</label>
                <select name="example" id="example">
                    <option></option>
                    @foreach ($examples as $example)
                        <option
                                value="{{ $example->id }}"

                                @if ($exercise->example_id == $example->id)
                                    selected
                                @endif
                        >
                            {{ $example->name }}
                        </option>
                    @endforeach
                </select>
            </div>

            <button type="submit" class="btn btn-primary">
                {{ __('common.validate') }}
            </button>
        </form>
    </div>
@endsection
