@extends('layouts.app')

@section('content')
    <div class="main-content">
        <h1>Games list</h1>
        @if ($message = Session::get('success'))
            <div class="alert alert-success">
                <p>{!! html_entity_decode($message) !!}</p>
            </div>
        @endif
        <div class="table" id="games">
            <div class="table--filters">
                <div class="field-container">
                    <label for="search">Search</label>
                    <input type="text" id="search" name="search" class="search">
                </div>
            </div>
            <div class="table-container">
                <table>
                    <caption class="sr-only">Games list</caption>
                    <thead>
                    <tr>
                        <th>
                            <button class="sort" data-sort="date">
                                Date <i class="fas fa-arrows-alt-v"></i>
                            </button>
                        </th>
                        @can('dashboard-students-see')
                            <th>
                                <button class="sort" data-sort="student">
                                    Étudiant <i class="fas fa-arrows-alt-v"></i>
                                </button>
                            </th>
                        @endcan
                        <th>
                            <button class="sort" data-sort="score">
                                Score <i class="fas fa-arrows-alt-v"></i>
                            </button>
                        </th>
                    </tr>
                    </thead>
                    <tbody class="list">
                    @foreach ($datas['games'] as $key => $game)
                        <tr>
                            <td class="date">{{ date('d/m/Y H:i', strtotime($game->datetime)) }}</td>
                            @can('dashboard-students-see')
                                <td class="student">{{  $game->user->firstname }} {{  $game->user->lastname }}</td>
                            @endcan
                            <td class="score">{{ $game->score }}</td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>
        </div>
        <a href="{{ route('games.play') }}" class="btn">Commencer un challenge</a>
    </div>
@endsection
