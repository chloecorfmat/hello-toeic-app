@extends('layouts.app')

@section('content')
    <div class="main-content">
        {{ Breadcrumbs::render('lessons.delete', $lesson) }}
        <h1>Delete the lesson: {{ $lesson->name }}</h1>
        @if ($errors->any())
            <div>
                <ul class="alert alert-error">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form action="{{ route('lessons.destroy', $lesson->id) }}" method="POST">
            @method('DELETE')
            @csrf
            <p class="important">Êtes-vous sûr de vouloir supprimer cette leçon ? <span class="emphasis">Cette action est irréversible.</span></p>

            <button type="submit" class="btn btn-primary">Delete</button>
        </form>
    </div>
@endsection
