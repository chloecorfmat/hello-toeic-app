@extends('layouts.app')

@section('content')
    <div class="main-content">
        @if ($errors->any())
            <div>
                <ul class="alert alert-error">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <div class="part-container">
            <h2>Scores</h2>
            <div class="table" id="games">
                <div class="table--filters">
                    <div class="field-container">
                        <label for="search">{{ __('common.search') }}</label>
                        <input type="text" id="search" name="search" class="search">
                    </div>
                </div>
                <div class="table-container is-visible">
                    <table>
                        <caption class="sr-only">{{ __('games.results') }}/caption>
                        <thead>
                        <tr>
                            <th>
                                <button class="sort" data-sort="date">
                                    {{ __('common.date') }} <i class="fas fa-arrows-alt-v"></i>
                                </button>
                            </th>
                            <th>
                                <button class="sort" data-sort="student">
                                    {{ __('common.student') }} <i class="fas fa-arrows-alt-v"></i>
                                </button>
                            </th>
                            <th>
                                <button class="sort" data-sort="score">
                                    {{ __('common.score') }} <i class="fas fa-arrows-alt-v"></i>
                                </button>
                            </th>
                        </tr>
                        </thead>
                        <tbody class="list">
                        @foreach ($games as $key => $game)
                            <tr>
                                <td class="date">{{ date('d/m/Y H:i', strtotime($game->datetime)) }}</td>
                                <td class="student">{{  $game->user->name }}</td>
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
                <p class="emphasis">{{ __('common.no-result') }}</p>
            </div>
        </div>

    </div>
@endsection
