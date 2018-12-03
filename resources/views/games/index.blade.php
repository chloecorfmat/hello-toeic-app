@extends('layouts.app')

@section('content')
    <div class="main-content">
        <h1>Games list</h1>
        @if ($message = Session::get('success'))
            <div class="alert alert-success">
                <p>{{ $message }}</p>
            </div>
        @endif
        <div class="table-container">
            <table>
                <caption class="sr-only">Games list</caption>
                <thead>
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Score</th>
                </tr>
                </thead>
                <tbody>
                @foreach ($datas['games'] as $key => $game)
                    <tr>
                        <td>{{ date('d/m/Y H:i', strtotime($game->datetime)) }}</td>
                        <td>{{ $game->score }}</td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>
        <a href="{{ route('games.play') }}" class="btn">Commencer un challenge</a>
    </div>
@endsection
