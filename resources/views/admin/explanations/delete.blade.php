@extends('layouts.app')

@section('content')
    <div class="main-content">
        {{ Breadcrumbs::render('explanations.delete', $explanation) }}
        <h1>Delete the explanation: {{ $explanation->title }}</h1>
        @if ($errors->any())
            <div>
                <ul class="alert alert-error">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form action="{{ route('explanations.destroy', $explanation->id) }}" method="POST">
            @method('DELETE')
            @csrf
            <p class="important">Êtes-vous sûr de vouloir supprimer cette explication ? <span class="emphasis">Cette action est irréversible.</span></p>

            <button type="submit" class="btn btn-primary">Delete</button>
        </form>
    </div>
@endsection
