@extends('layouts.app')

@section('content')
    <div class="main-content">
        {{ Breadcrumbs::render('questions.delete', $question) }}
        @if (!empty($question->question))
            <h1>Delete the question: {{ $question->question }}</h1>
        @else
            <h1>Delete the question: #none ({{ $question->id }})</h1>
        @endif

        @if ($errors->any())
            <div>
                <ul class="alert alert-error">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form action="{{ route('questions.destroy', $question->id) }}" method="POST">
            @method('DELETE')
            @csrf
            <p class="important">Êtes-vous sûr de vouloir supprimer cette question ? <span class="emphasis">Cette action est irréversible.</span></p>

            <button type="submit" class="btn btn-primary">Delete</button>
        </form>
    </div>
@endsection
