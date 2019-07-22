@extends('layouts.app')

@section('content')
    <div class="main-content">
        <div class="main-content--header">
            {{ Breadcrumbs::render('students.index') }}
            <h1>{{ __('students.list') }}</h1>
            <a href="{{ route('users.import') }}" class="main-content--header-actions">
                <i class="fas fa-upload"></i>
            </a>
        </div>

        @if ($message = Session::get('success'))
            <div class="alert alert-success">
                <p>{{ $message }}</p>
            </div>
        @elseif ($message = Session::get('warning'))
            <div class="alert alert-warning">
                {!! html_entity_decode($message) !!}
            </div>
        @elseif ($message = Session::get('error'))
            <div class="alert alert-error">
                <p>{{ $message }}</p>
            </div>
        @endif

        <div class="table" id="students">
            <div class="table--filters">
                <div class="field-container">
                    <label for="search">{{ __('common.search') }}</label>
                    <input type="text" id="search" name="search" class="search">
                </div>
            </div>
            <div class="table-container is-visible">
                <table>
                    <caption class="sr-only">{{ __('students.list') }}</caption>
                    <thead>
                    <tr>
                        <th scope="col">
                            <button class="sort" data-sort="matricule">
                                {{ __('common.matricule') }} <i class="fas fa-arrows-alt-v"></i>
                            </button>
                        </th>
                        <th scope="col">
                            <button class="sort" data-sort="student">
                                {{ __('common.student') }} <i class="fas fa-arrows-alt-v"></i>
                            </button>
                        </th>
                        <th scope="col">
                            <button class="sort" data-sort="course">
                                {{ __('common.course') }} <i class="fas fa-arrows-alt-v"></i>
                            </button>
                        </th>
                        <th scope="col">
                            <button class="sort" data-sort="passed">
                                {{ __('common.toeic') }} <i class="fas fa-arrows-alt-v"></i>
                            </button>
                        </th>
                        <th scope="col">{{ __('common.actions') }}</th>
                    </tr>
                    </thead>
                    <tbody class="list">
                    @foreach ($students as $key => $student)
                        <tr>
                            <td class="matricule">{{ $student->matricule }}</td>
                            <td class="student">{{ $student->name }}</td>
                            <td class="course">{{ $student->course }}</td>
                            <td class="passed">
                                @if (!is_null($student->passed))
                                    <i class="fas fa-check-circle"></i>
                                @else
                                    <i class="fas fa-times-circle"></i>
                                @endif
                            </td>
                            <td>
                                <ul>
                                    <li>
                                        <a href="{{ route('students.show', ['id' => $student->id]) }}" title="Show student"><i class="fas fa-eye"></i></a>
                                        <a href="{{ route('users.edit', ['id' => $student->id]) }}" title="Edit student"><i class="fas fa-pencil-alt"></i></a>
                                        <a href="{{ route('users.delete', $student->id) }}" title="Delete student"><i class="fas fa-trash"></i></a>
                                    </li>
                                </ul>
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
