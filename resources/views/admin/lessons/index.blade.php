@extends('layouts.app')

@section('content')
    <div class="main-content list-tests">
        <div class="main-content--header">
            {{ Breadcrumbs::render('lessons.index') }}
            <h1>
                {{ __('lessons.list') }}
            </h1>
            <a href="{{ route('lessons.create') }}" class="main-content--header-actions">
                <i class="fas fa-plus-circle"></i>
            </a>
        </div>
        @if ($message = Session::get('success'))
            <div class="alert alert-success">
                <p>{{ $message }}</p>
            </div>
        @elseif ($message = Session::get('error'))
            <div class="alert alert-error">
                <p>{{ $message }}</p>
            </div>
        @endif

        <div class="table" id="tests">
            <h2>{{ __('lessons.list') }}</h2>
            <div class="table--filters">
                <div class="field-container">
                    <label for="search">{{ __('common.search') }}</label>
                    <input type="text" id="search" name="search" class="search">
                </div>
            </div>
            <div class="table-container is-visible">
                <table>
                    <caption class="sr-only">{{ __('lessons.list') }}</caption>
                    <thead>
                    <tr>
                        <th scope="col">
                            <button class="sort" data-sort="name">
                                {{ __('common.name') }} <i class="fas fa-arrows-alt-v"></i>
                            </button>
                        </th>
                        <th scope="col">
                            <button class="sort" data-sort="start">
                                {{ __('common.datetime_start') }} <i class="fas fa-arrows-alt-v"></i>
                            </button>
                        </th>
                        <th scope="col">
                            <button class="sort" data-sort="end">
                                {{ __('common.datetime_end') }} <i class="fas fa-arrows-alt-v"></i>
                            </button>
                        </th>
                        <th scope="col">
                            <button class="sort" data-sort="group">
                                {{ __('common.group') }} <i class="fas fa-arrows-alt-v"></i>
                            </button>
                        </th>
                        <th scope="col">
                            <button class="sort" data-sort="test">
                                {{ __('app.composite-test') }} <i class="fas fa-arrows-alt-v"></i>
                            </button>
                        </th>
                        <th scope="col">{{ __('common.actions') }}</th>
                    </tr>
                    </thead>
                    <tbody class="list">
                    @foreach ($lessons as $key => $lesson)
                        <tr>
                            <td class="name">{{ $lesson->name }}</td>
                            <td class="start">{{ $lesson->start_datetime }}</td>
                            <td class="end">{{ $lesson->end_datetime }}</td>
                            <td class="group">{{ $lesson->group()->first()->name }}</td>
                            <td class="test">{{ $lesson->composite_test()->first()->name }}</td>
                            <td>
                                <a href="{{ route('lessons.show', ['id' => $lesson->id]) }}" title="{{ __('lessons.show') }}"><i class="fas fa-eye"></i></a>
                                <a href="{{ route('lessons.edit', ['id' => $lesson->id]) }}" title="{{ __('lessons.edit') }}"><i class="fas fa-pencil-alt"></i></a>
                                <a href="{{ route('lessons.delete', $lesson->id) }}" title="{{ __('lessons.delete') }}"><i class="fas fa-trash"></i></a>
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
@endsection
