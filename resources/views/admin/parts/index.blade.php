@extends('layouts.app')

@section('content')
    <div class="main-content">
        <div class="main-content--header">
            {{ Breadcrumbs::render('parts.index') }}
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
            <div class="table-container is-visible">
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
                                <a href="{{ route('parts.show', ['id' => $part->id]) }}" title="Show exercise"><i class="fas fa-eye"></i></a>
                                <a href="{{ route('parts.edit', ['id' => $part->id]) }}" title="Edit exercise"><i class="fas fa-pencil-alt"></i></a>
                                <a href="{{ route('exercises.import', ['id' => $part->id]) }}" title="Add an exercise"><i class="fas fa-upload"></i></a>
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>

            <div class="container-pagination">
                <button class="btn-pagination" id="js-pagination-prev">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <ul class="pagination"></ul>
                <button class="btn-pagination" id="js-pagination-next">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>

        <div class="container-empty-search" id="js-empty-search" aria-hidden="true">
            <p class="emphasis">Aucun résultat.</p>
        </div>
    </div>
@endsection
