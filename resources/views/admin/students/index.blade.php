@extends('layouts.app')

@section('content')
    <div class="main-content">
        <div class="main-content--header">
            <h1>Liste des étudiants</h1>
            <a href="{{ route('users.import') }}" class="main-content--header-actions">
                <i class="fas fa-upload"></i>
            </a>
        </div>

        @if ($message = Session::get('success'))
            <div class="alert alert-success">
                <p>{{ $message }}</p>
            </div>
        @elseif ($message = Session::get('warning'))
            <div class="alert alert-warning">
                {!! html_entity_decode($message) !!}
            </div>
        @elseif ($message = Session::get('error'))
            <div class="alert alert-error">
                <p>{{ $message }}</p>
            </div>
        @endif

        <div class="table" id="students">
            <div class="table--filters">
                <div class="field-container">
                    <label for="search">Search</label>
                    <input type="text" id="search" name="search" class="search">
                </div>
            </div>
            <div class="table-container">
                <table>
                    <caption class="sr-only">Liste des étudiants</caption>
                    <thead>
                    <tr>
                        <th scope="col">
                            <button class="sort" data-sort="matricule">
                                Matricule <i class="fas fa-arrows-alt-v"></i>
                            </button>
                        </th>
                        <th scope="col">
                            <button class="sort" data-sort="student">
                                Student <i class="fas fa-arrows-alt-v"></i>
                            </button>
                        </th>
                        <th scope="col">
                            <button class="sort" data-sort="course">
                                Course <i class="fas fa-arrows-alt-v"></i>
                            </button>
                        </th>
                        <th scope="col">
                            <button class="sort" data-sort="passed">
                                Passed <i class="fas fa-arrows-alt-v"></i>
                            </button>
                        </th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody class="list">
                    @foreach ($students as $key => $student)
                        <tr>
                            <td class="matricule">{{ $student->matricule }}</td>
                            <td class="student">{{ $student->firstname }} {{ $student->lastname }}</td>
                            <td class="course">{{ $student->course }}</td>
                            <td class="passed">
                                @if (!is_null($student->passed))
                                    <i class="fas fa-check-circle"></i>
                                @else
                                    <i class="fas fa-times-circle"></i>
                                @endif
                            </td>
                            <td>
                                <ul>
                                    <li>
                                        <a href="{{ route('students.show', ['id' => $student->id]) }}">Voir</a>
                                    </li>
                                </ul>
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
@endsection
