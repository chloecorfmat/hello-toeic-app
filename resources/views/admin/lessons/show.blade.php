@extends('layouts.app')

@section('content')
    <div class="main-content">
        <div class="main-content--header">
            {{ Breadcrumbs::render('lessons.show', $lesson) }}
            <h1>Détails de la leçon</h1>
        </div>

        <p><span class="important">Name : </span>{{ $lesson->name }}</p>
        <p><span class="important">Date : </span>{{ $lesson->start_datetime }} to {{ $lesson->end_datetime }}</p>
        <p><span class="important">Group : </span>{{ $lesson->group()->first()->name }}</p>
        <p><span class="important">Composite test : </span>{{ $lesson->composite_test()->first()->name }}</p>

        <!-- TODO : Add the list of students with scores -->
        <div class="part-container">
            <h2>Liste des étudiants</h2>
            <div class="table-container is-visible">
                <table>
                    <caption class="sr-only">Liste des étudiants</caption>
                    <thead>
                    <tr>
                        <th scope="col">Student</th>
                        <th scope="col">Datetime</th>
                        <th scope="col">Score</th>
                    </tr>
                    </thead>
                    <tbody class="list">
                    @foreach ($results as $result)
                        <tr>
                            <td>{{ $result['name'] }}</td>
                            <td>{{ $result['datetime'] }}</td>
                            <td>{{ $result['score'] }}</td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
@endsection
