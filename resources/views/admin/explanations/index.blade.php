@extends('layouts.app')

@section('content')
    <div class="main-content list-tests">
        <div class="main-content--header">
            {{ Breadcrumbs::render('explanations.index') }}
            <h1>
                {{ __('explanations.list') }}
            </h1>
            <a href="{{ route('explanations.create') }}" class="main-content--header-actions">
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

        <div class="table" id="explanations">
            <h2>{{ __('explanations.list') }}</h2>
            <div class="table--filters">
                <div class="field-container">
                    <label for="search">{{ __('common.search') }}</label>
                    <input type="text" id="search" name="search" class="search">
                </div>
            </div>
            <div class="table-container is-visible">
                <table>
                    <caption class="sr-only">{{ __('explanations.list') }}</caption>
                    <thead>
                    <tr>
                        <th scope="col">
                            <button class="sort" data-sort="title">
                                {{ __('common.title') }} <i class="fas fa-arrows-alt-v"></i>
                            </button>
                        </th>
                        <th scope="col">
                            <button class="sort" data-sort="explanation">
                                {{ __('common.details') }} <i class="fas fa-arrows-alt-v"></i>
                            </button>
                        </th>
                        <th scope="col">{{ __('common.actions') }}</th>
                    </tr>
                    </thead>
                    <tbody class="list">
                    @foreach ($explanations as $key => $explanation)
                        <tr>
                            <td class="title">{{ $explanation->title }}</td>
                            <td class="explanation">{{ $explanation->explanation }}</td>
                            <td>
                                <a href="{{ route('explanations.show', ['id' => $explanation->id]) }}" title="{{ __('explanations.show') }}"><i class="fas fa-eye"></i></a>
                                <a href="{{ route('explanations.edit', ['id' => $explanation->id]) }}" title="{{ __('explanations.edit') }}"><i class="fas fa-pencil-alt"></i></a>
                                <a href="{{ route('explanations.delete', $explanation->id) }}" title="{{ __('explanations.delete') }}"><i class="fas fa-trash"></i></a>
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
