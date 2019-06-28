@extends('layouts.app')

@section('content')
    <div class="main-content">
        <div class="main-content--header">
            {{ Breadcrumbs::render('groups.index') }}
            <h1>Liste des groupes</h1>
            <a href="{{ route('groups.create') }}" class="main-content--header-actions">
                <i class="fas fa-plus-circle"></i>
            </a>
            <a href="{{ route('groups.assign') }}" class="main-content--header-actions">
                <i class="fas fa-user-graduate"></i>
            </a>
            <a href="{{ route('groups.import') }}" class="main-content--header-actions">
                <i class="fas fa-upload"></i>
            </a>
        </div>

        @if ($message = Session::get('success'))
            <div class="alert alert-success">
                <p>{!! html_entity_decode($message) !!}</p>
            </div>
        @endif

        @if ($message = Session::get('warning'))
            <div class="alert alert-warning">
                <p>{!! html_entity_decode($message) !!}</p>
            </div>
        @elseif ($message = Session::get('error'))
            <div class="alert alert-error">
                <p>{{ $message }}</p>
            </div>
        @endif

        <div class="table" id="groups">
            <h2>Tous les groupes</h2>
            <div class="table--filters">
                <div class="field-container">
                    <label for="search">Search</label>
                    <input type="text" id="search" name="search" class="search">
                </div>
            </div>
            <div class="table-container is-visible">
                <table>
                    <caption class="sr-only">Liste des groupes</caption>
                    <thead>
                    <tr>
                        <th scope="col">
                            <button class="sort" data-sort="name">
                                Name <i class="fas fa-arrows-alt-v"></i>
                            </button>
                        </th>
                        <th scope="col">
                            <button class="sort" data-sort="teacher">
                                Teacher <i class="fas fa-arrows-alt-v"></i>
                            </button>
                        </th>
                        <th scope="col">
                            <button class="sort" data-sort="start">
                                Start date <i class="fas fa-arrows-alt-v"></i>
                            </button>
                        </th>
                        <th scope="col">
                            <button class="sort" data-sort="end">
                                End date <i class="fas fa-arrows-alt-v"></i>
                            </button>
                        </th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody class="list">
                    @foreach ($groups as $key => $group)
                        <tr>
                            <td class="name">
                                {{ $group->name }}
                                <span class="emphasis">({{ $group->machine_name }})</span>
                            </td>
                            <td class="teacher">{{ $teachers[$group->teacher]->name  }}</td>
                            <td class="start">{{ date('d/m/Y', strtotime($group->start_date)) }}</td>
                            <td class="end">{{ date('d/m/Y', strtotime($group->end_date)) }}</td>
                            <td>
                                <a href="{{ route('groups.show', ['id' => $group->id]) }}" title="Show group"><i class="fas fa-eye"></i></a>
                                {{-- <a href="{{ route('groups.edit', ['id' => $group->id]) }}" title="Edit group"><i class="fas fa-pencil-alt"></i></a> --}}
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
