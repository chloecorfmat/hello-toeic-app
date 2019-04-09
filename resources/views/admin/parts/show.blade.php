@extends('layouts.app')

@section('content')
    <div class="main-content">
        <div class="main-content--header">
            <h1>Détails du type d'exercice</h1>
            <a href="{{ route('parts.edit', ['id' => $part->id]) }}" class="main-content--header-actions" title="Modifier le type d'exercice">
                <i class="fas fa-pencil-alt"></i>
            </a>
        </div>

        <p>Nom : <span>{{ $part->name }}</span></p>
        <p>Version : <span>{{ $part->version }}</span></p>
        <p>Type : <span>{{ $part->type }}</span></p>
        <p>Description : <span>{{ $part->description }}</span></p>
        <p>Nombre de questions : <span>{{ $part->nb_questions }}</span></p>
        <p>Questions or texts ? : <span>{{ $part->texts }}</span></p>
        <p>Files ? : <span>{{ $part->files }}</span></p>

    </div>
@endsection