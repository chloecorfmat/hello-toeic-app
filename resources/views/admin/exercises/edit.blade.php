@extends('layouts.app')

@section('content')
    <div class="main-content">
        <div class="main-content--header">
            {{ Breadcrumbs::render('exercises.edit', $exercise) }}
            <h1>Modifier</h1>
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
                <label for="name">Nom <span class="required">*</span></label>
                <input type="text" id="name" name="name" value="{{ $exercise->name }}" required>
            </div>

            <div class="field-container">
                <label for="visible">Visibility <span class="required">*</span></label>
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
                <p id="visible-description">1 for public, 0 for private.</p>
            </div>

            <button type="submit" class="btn btn-primary">
                {{ __('Validate') }}
            </button>
        </form>
    </div>
@endsection
