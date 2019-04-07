@extends('layouts.app')

@section('content')
    <div class="main-content">
        <div class="main-content--header">
            <h1>Liste des types d'exercices</h1>
            <a href="{{ route('parts.create') }}" class="main-content--header-actions">
                <i class="fas fa-plus-circle"></i>
            </a>
        </div>

        @if ($message = Session::get('success'))
        <div class="alert alert-success">
            <p>{{ $message }}</p>
        </div>
        @elseif ($message = Session::get('warning'))
            <div class="alert alert-warning">
                <p>{{ $message }}</p>
            </div>
        @elseif ($message = Session::get('error'))
            <div class="alert alert-error">
                <p>{{ $message }}</p>
            </div>
        @endif

        <div class="table" id="parts">
            <h2>Tous les types d'exercice</h2>
            <div class="table--filters">
                <div class="field-container">
                    <label for="search">Search</label>
                    <input type="text" id="search" name="search" class="search">
                </div>
            </div>
            <div class="table-container">
                <table>
                    <caption class="sr-only">Liste des types d'exercices</caption>
                    <thead>
                    <tr>
                        <th scope="col">
                            <button class="sort" data-sort="name">
                                Name <i class="fas fa-arrows-alt-v"></i>
                            </button>
                        </th>
                        <th scope="col">
                            <button class="sort" data-sort="version">
                                Version <i class="fas fa-arrows-alt-v"></i>
                            </button>
                        </th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody class="list">
                    @foreach ($parts as $key => $part)
                        <tr>
                            <td class="name">{{ $part->name }}</td>
                            <td class="version">{{ $part->version }}</td>
                            <td>
                                <a href="{{ route('parts.show', ['id' => $part->id]) }}"><i class="fas fa-eye"></i></a>
                                <a href="{{ route('parts.edit', ['id' => $part->id]) }}"><i class="fas fa-pencil-alt"></i></a>
                                <a href="{{ route('exercises.import', ['id' => $part->id]) }}" title="Add an exercise"><i class="fas fa-plus"></i></a>
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
@endsection
