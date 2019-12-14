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
        <!-- Results -->
        <div class="part-container">
            @if ($message = Session::get('success'))
                <div class="alert alert-success">
                    <p>{{ $message }}</p>
                </div>
            @endif
            @if (!Auth::user()->hasRole('teacher'))
                <p class="emphasis">{{ __('correction.limitation') }}</p>
            @endif
            <div class="table" id="profile-tests">
                <div class="table--filters">
                    <div class="field-container">
                        <label for="search">Search</label>
                        <input type="text" id="search" name="search" class="search">
                    </div>
                </div>

                <div class="table-container is-visible">
                    <table>
                        <caption class="sr-only">{{ __('composite-tests.results_last') }}</caption>
                        <thead>
                        <tr>
                            <th scope="col">
                                <button class="sort" data-sort="date">
                                    {{ __('common.date') }} <i class="fas fa-arrows-alt-v"></i>
                                </button>
                            </th>
                            <th scope="col">
                                <button class="sort" data-sort="test">
                                    {{ __('common.name') }} <i class="fas fa-arrows-alt-v"></i>
                                </button>
                            </th>
                            <th scope="col">
                                <button class="sort" data-sort="score">
                                    {{ __('common.score') }} <i class="fas fa-arrows-alt-v"></i>
                                </button>
                            </th>
                            @role('student')
                                <th scope="col">{{ __('common.actions') }}</th>
                            @endrole
                        </tr>
                        </thead>
                        <tbody class="list">
                        @foreach ($trials as $key => $trial)
                            <tr>
                                <td class="date">{{ date('d/m/Y H:i', strtotime($trial->datetime)) }}</td>
                                <td class="test">{{ $names[$key] }}</td>
                                <td class="score">{{ $trial->score }}</td>
                                @role('student')
                                    <td>
                                        <ul>

                                            <li>
                                                <a href="{{ action('CompositeTestController@show', ['id' => $trial->composite_test_id]) }}">{{ __('composite-tests.execute') }}</a>
                                            </li>

                                        </ul>
                                    </td>
                                @endrole
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
