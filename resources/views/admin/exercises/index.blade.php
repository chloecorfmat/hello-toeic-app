@extends('layouts.app')

@section('content')
    <div class="main-content list-tests">
        <div class="main-content--header">
            {{ Breadcrumbs::render('exercises.index') }}
            <h1>
                {{ __('exercises.list') }}
            </h1>
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

        <div class="table" id="exercises">
            <h2>{{ __('exercises.list') }}</h2>
            <div class="table--filters">
                <div class="field-container">
                    <label for="search">{{ __('common.search') }}</label>
                    <input type="text" id="search" name="search" class="search">
                </div>
            </div>
            <div class="table-container is-visible">
                <table>
                    <caption class="sr-only">{{ __('exercises.list') }}</caption>
                    <thead>
                    <tr>
                        <th scope="col">
                            <button class="sort" data-sort="name">
                                {{ __('common.name') }} <i class="fas fa-arrows-alt-v"></i>
                            </button>
                        </th>
                        <th scope="col">
                            <button class="sort" data-sort="part">
                                {{ __('common.part') }} <i class="fas fa-arrows-alt-v"></i>
                            </button>
                        </th>
                        <th scope="col">
                            <button class="sort" data-sort="visibility">
                                {{ __('common.visibility') }} <i class="fas fa-arrows-alt-v"></i>
                            </button>
                        </th>
                        <th scope="col">{{ __('common.actions') }}</th>
                    </tr>
                    </thead>
                    <tbody class="list">
                    @foreach ($exercises as $key => $exercise)
                        <tr>
                            <td class="name">{{ $exercise->name }} @if (in_array($exercise->id, $newExercises))<img src="/images/gif-new.jpg" class="gif-new" alt="{{ __('common.new-exercise') }}"/>@endif</td>
                            <td class="part">{{ $exercise->part->name }}</td>
                            <td class="visibility">{{ $exercise->visible }}</td>
                            <td>
                                <a href="{{ route('exercises.show', ['id' => $exercise->id]) }}" title="{{ __('exercises.show') }}"><i class="fas fa-eye"></i></a>
                                <a href="{{ route('exercises.edit', $exercise->id) }}" title="{{ __('exercises.edit') }}"><i class="fas fa-pencil-alt"></i></a>
                                @can('exercises-achieve')
                                    <a href="{{ action('ExerciseController@show', ['id' => $exercise->id]) }}" title="{{ __('exercises.execute') }}"><i class="fas fa-play"></i></a>
                                @endcan
                                <a href="{{ route('exercises.delete', $exercise->id) }}" title="{{ __('exercises.delete') }}"><i class="fas fa-trash"></i></a>
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
