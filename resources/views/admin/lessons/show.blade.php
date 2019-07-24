@extends('layouts.app')

@section('content')
    <div class="main-content">
        <div class="main-content--header">
            {{ Breadcrumbs::render('lessons.show', $lesson) }}
            <h1>{{ __('common.details') }}: {{ $lesson->name }}</h1>
        </div>

        <p><span class="important">{{ __('common.name') }} : </span>{{ $lesson->name }}</p>
        <p><span class="important">{{ __('common.date') }} : </span>{{ $lesson->start_datetime }} to {{ $lesson->end_datetime }}</p>
        <p><span class="important">{{ __('common.group') }} : </span>{{ $lesson->group()->first()->name }}</p>
        <p><span class="important">{{ __('app.composite-test') }} : </span>{{ $lesson->composite_test()->first()->name }}</p>

        <div class="card-container">
            <div class="card">
                <p class="card-text"><span class="card-number">{{ $statistics['min'] }} </span>score minimal</p>
            </div>

            <div class="card">
                <p class="card-text"><span class="card-number">{{ $statistics['max'] }} </span>score maximal</p>
            </div>

            <div class="card">
                <p class="card-text"><span class="card-number">{{ $statistics['average'] }} </span>moyenne</p>
            </div>
        </div>

        <!-- TODO : Add the list of students with scores -->
        <div class="part-container">
            <h2>{{ __('students.list') }} ({{ $statistics['students_passed'] }}/{{ $statistics['students_number'] }})</h2>
            <div class="table" id="students-lesson">
                <div class="table--filters">
                    <div class="field-container">
                        <label for="search">{{ __('common.search') }}</label>
                        <input type="text" id="search" name="search" class="search">
                    </div>
                </div>

                <div class="students-table table-container is-visible">
                    <table>
                        <caption class="sr-only">{{ __('students.list') }}</caption>
                        <thead>
                        <tr>
                            <th scope="col">
                                <button class="sort" data-sort="student">
                                    {{ __('common.student') }} <i class="fas fa-arrows-alt-v"></i>
                                </button>
                            </th>

                            <th scope="col">
                                <button class="sort" data-sort="datetime">
                                    {{ __('common.datetime') }} <i class="fas fa-arrows-alt-v"></i>
                                </button>
                            </th>

                            <th scope="col">
                                <button class="sort" data-sort="score">
                                    {{ __('common.score') }} <i class="fas fa-arrows-alt-v"></i>
                                </button>
                            </th>
                        </tr>
                        </thead>
                        <tbody class="list">
                        @foreach ($results as $result)
                            <tr>
                                <td class="student">{{ $result['name'] }}</td>
                                <td class="datetime">{{ $result['datetime'] }}</td>
                                <td class="score">
                                    @if ($result['score'] === $statistics['min'])
                                        <span class="min">
                                @elseif ($result['score'] === $statistics['max'])
                                                <span class="max">
                                @endif
                                                    {{ $result['score'] }}
                                                    @if (($result['score'] === $statistics['min']) or ($result['score'] === $statistics['max']))
                                    </span>
                                    @endif
                                </td>
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
