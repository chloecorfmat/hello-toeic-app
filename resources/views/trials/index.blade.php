@extends('layouts.app')

@section('laterale-bar-content-begin')
    @role('student')
    <div class="laterale-bar--part">
        <h3>Statistiques</h3>
        <p><span>{{ count($trials) }}</span> tests</p>
    </div>
    @endrole
@endsection

@section('content')
    <div class="main-content">
        <h1>Résultats des tests passés</h1>
        <!-- Results -->
        <div class="part-container">
            @if ($message = Session::get('success'))
                <div class="alert alert-success">
                    <p>{{ $message }}</p>
                </div>
            @endif
            @if (!Auth::user()->hasRole('teacher'))
                <p class="emphasis">La correction des questions liées aux parties de compréhension orale n'est pas affichée.</p>
            @endif
            <div class="table" id="profile-tests">
                <div class="table--filters">
                    <div class="field-container">
                        <label for="search">Search</label>
                        <input type="text" id="search" name="search" class="search">
                    </div>
                </div>

                <div class="table-container">
                    <table>
                        <caption class="sr-only">Liste des exercices passés</caption>
                        <thead>
                        <tr>
                            <th scope="col">
                                <button class="sort" data-sort="date">
                                    Date <i class="fas fa-arrows-alt-v"></i>
                                </button>
                            </th>
                            <th scope="col">
                                <button class="sort" data-sort="test">
                                    Nom du test <i class="fas fa-arrows-alt-v"></i>
                                </button>
                            </th>
                            <th scope="col">
                                <button class="sort" data-sort="score">
                                    Score <i class="fas fa-arrows-alt-v"></i>
                                </button>
                            </th>
                            <th scope="col">Actions</th>
                        </tr>
                        </thead>
                        <tbody class="list">
                        @foreach ($trials as $key => $trial)
                            <tr>
                                <td class="date">{{ date('d/m/Y H:i', strtotime($trial->datetime)) }}</td>
                                <td class="test">{{ $trial->test->name }}</td>
                                <td class="score">{{ $trial->score }}</td>
                                <td>
                                    <ul>
                                        @if (
                                            (($trial->test->part_id !== 5) &&
                                            ($user->hasRole('student'))) ||
                                            ($user->hasRole('teacher'))
                                        )
                                            <li>
                                                <a href="{{ route('student.trials.show', ['id' => $trial->id]) }}">Correction</a>
                                            </li>
                                        @endif
                                        @role('student')
                                        <li>
                                            <a href="{{ action('ExerciseController@show', ['id' => $trial->test->id]) }}">Execute</a>
                                        </li>
                                        @endrole
                                    </ul>
                                </td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
@endsection
