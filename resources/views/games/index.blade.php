@extends('layouts.app')

@section('content')
    <div class="main-content">
        <h2>{{__('common.best-scores')}}</h2>
        <p>{{__('common.best-scores-of', ['number' => 10, 'type' => trans('common.students')])}}</p>
        <div class="table">
            <div class="table-container is-visible">
                <table>
                    <caption class="sr-only">{{__('common.best-scores')}}</caption>
                    <thead>
                        <tr>
                            <th>{{__('common.position')}}</th>
                            <th>{{__('common.student')}}</th>
                            <th>{{__('common.score')}}</th>
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

        <h2>{{__('common.scores')}}</h2>
        <p>{{__('common.own-scores')}}</p>
        <div class="table" id="games">
            <div class="table--filters">
                <div class="field-container">
                    <label for="search">{{__('common.search')}}</label>
                    <input type="text" id="search" name="search" class="search">
                </div>
            </div>
            <div class="table-container is-visible">
                <table>
                    <caption class="sr-only">{{__('games.list')}}</caption>
                    <thead>
                    <tr>
                        <th>
                            <button class="sort" data-sort="date">
                                {{__('common.date')}} <i class="fas fa-arrows-alt-v"></i>
                            </button>
                        </th>
                        @can('dashboard-students-see')
                            <th>
                                <button class="sort" data-sort="student">
                                    {{__('common.student')}} <i class="fas fa-arrows-alt-v"></i>
                                </button>
                            </th>
                        @endcan
                        <th>
                            <button class="sort" data-sort="score">
                                {{__('common.score')}} <i class="fas fa-arrows-alt-v"></i>
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
            <p class="emphasis">{{__('common.no-result')}}</p>
        </div>
    </div>
@endsection
