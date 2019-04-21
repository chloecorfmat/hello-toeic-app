@extends('layouts.app')

@section('content')
    <div class="main-content">
        <h1>Challenges list</h1>
        @if ($message = Session::get('success'))
            <div class="alert alert-success">
                <p>{!! html_entity_decode($message) !!}</p>
            </div>
        @endif

        <h2>Best scores</h2>
        <div class="table">
            <div class="table-container is-visible">
                <table>
                    <caption class="sr-only">Best scores</caption>
                    <thead>
                        <tr>
                            <th>Position</th>
                            <th>Étudiant</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                    @foreach($best_scores as $key => $score)
                        <tr>
                            <td>
                                <!-- For best score ever -->
                                @if($key == 0)
                                    <i class="fas fa-star"></i>
                                @else
                                    @php ($index = $key+1)
                                    {{ $index }}
                                @endif
                            </td>
                            <td>{{ $score->user->name }}</td>
                            <td>{{ $score->score }}</td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>
        </div>

        <h2>Scores</h2>
        <div class="table" id="games">
            <div class="table--filters">
                <div class="field-container">
                    <label for="search">Search</label>
                    <input type="text" id="search" name="search" class="search">
                </div>
            </div>
            <div class="table-container is-visible">
                <table>
                    <caption class="sr-only">Challenges list</caption>
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
                                <td class="student">{{  $game->user->name }}</td>
                            @endcan
                            <td class="score">{{ $game->score }}</td>
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

        <a href="{{ route('games.play') }}" class="btn">Commencer un challenge</a>

        <!-- Statistiques -->
        @if($datas['axisX'] != "")
        <div class="part-container">
            <div class="charts">
                <canvas class="chart" id="challenges"></canvas>
            </div>
        </div>
        @endif
    </div>

    <script>
        var chart_axisX = "{{ $datas['axisX'] }}";
        var chart_axisY = "{{ $datas['axisY'] }}";
    </script>
@endsection
