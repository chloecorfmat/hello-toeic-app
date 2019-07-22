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

        <!-- TODO : Add the list of students with scores -->
        <div class="part-container">
            <h2>{{ __('students.list') }}</h2>
            <div class="table-container is-visible">
                <table>
                    <caption class="sr-only">{{ __('students.list') }}</caption>
                    <thead>
                    <tr>
                        <th scope="col">{{ __('common.student') }}</th>
                        <th scope="col">{{ __('common.datetime') }}</th>
                        <th scope="col">{{ __('common.score') }}</th>
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
