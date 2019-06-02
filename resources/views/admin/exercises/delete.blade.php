@extends('layouts.app')

@section('content')
    <div class="main-content">
        {{ Breadcrumbs::render('exercises.delete', $exercise) }}
        <h1>Delete the exercise: {{ $exercise->name }}</h1>
        @if ($errors->any())
            <div>
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form action="{{ route('exercises.destroy', $exercise->id) }}" method="POST">
            @method('DELETE')
            @csrf

            <div class="field-container">
                <label for="status">
                    <input
                            type="checkbox"
                            name="status"
                            value="true"
                            id="status"
                            aria-describedby="status-description"
                    >
                    <span class="form-label-text">
                        Suppression complète
                    </span>
                </label>
                <p id="status-description"><span class="important">Attention !</span> La suppression complète d'un exercice signifie que les questions / documents rattachés ne sont plus disponibles, y compris dans les modes challenges.</p>
            </div>

            <button type="submit" class="btn btn-primary">Delete</button>
        </form>
    </div>
@endsection
