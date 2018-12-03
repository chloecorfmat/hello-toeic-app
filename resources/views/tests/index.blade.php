@extends('layouts.app')

@section('content')
    <div class="main-content list-tests">
        <div class="main-content--header">
            <h1>
                Liste des tests

                @isset($part_id)
                    @if($part_id !== 1)
                        (Part {{ $part_id-1 }})
                    @endif
                @endisset
            </h1>

            @can('test-add')
            <a href="{{ route('tests.create') }}" class="main-content--header-actions">
                <i class="fas fa-plus-circle"></i>
            </a>
            <a href="{{ route('tests.exercise.import') }}" class="main-content--header-actions">
                <i class="fas fa-cloud-download-alt"></i>
            </a>
            @endcan
        </div>
        @if ($message = Session::get('success'))
            <div class="alert alert-success">
                <p>{{ $message }}</p>
            </div>
        @elseif ($message = Session::get('error'))
            <div class="alert alert-error">
                <p>{{ $message }}</p>
            </div>
        @endif

        <div class="table" id="tests">
            <h2>Tous les exercices</h2>
            <div class="table--filters">
                <div class="field-container">
                    <label for="search">Search</label>
                    <input type="text" id="search" name="search" class="search">
                </div>
            </div>
            <div class="table-container">
                <table>
                    <caption class="sr-only">Liste des tests</caption>
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
                    @foreach ($tests as $key => $test)
                        <tr>
                            <td class="name">{{ $test->name }}</td>
                            <td class="version">{{ $test->version }}</td>
                            <td>
                                <a href="{{ action('TestController@show', ['id' => $test->id]) }}">Execute</a>
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>
        </div>

        @if(!isset($part_id) && isset($exercises) && $exercises)
            <div class="exercises-per-part">
                <h2>Sélectionner un type d'exercices</h2>
                <ul class="list-parts--links">
                    <li><a href="{{ route('tests.exercises', ['id' => '2']) }}">1</a></li>
                    <li><a href="{{ route('tests.exercises', ['id' => '3']) }}">2</a></li>
                    <li><a href="{{ route('tests.exercises', ['id' => '4']) }}">3</a></li>
                    <li><a href="{{ route('tests.exercises', ['id' => '5']) }}">4</a></li>
                    <li><a href="{{ route('tests.exercises', ['id' => '6']) }}">5</a></li>
                    <li><a href="{{ route('tests.exercises', ['id' => '7']) }}">6</a></li>
                    <li><a href="{{ route('tests.exercises', ['id' => '8']) }}">7</a></li>
                </ul>
            </div>
        @endisset
    </div>
@endsection
