@extends('layouts.app')

@section('content')
    <div class="main-content">
        <div class="main-content--header">
            <a href="{{ route('users.create') }}" class="main-content--header-actions">
                <i class="fas fa-plus-circle"></i>
            </a>
            <a href="{{ route('users.blocked') }}" class="main-content--header-actions">
                <i class="fas fa-ban"></i>
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

        <div class="table" id="users">
            <div class="table--filters">
                <div class="field-container">
                    <label for="search">{{ __('common.search') }}</label>
                    <input type="text" id="search" name="search" class="search">
                </div>
            </div>
            <div class="table-container is-visible">
                <table>
                    <caption class="sr-only">{{ __('users.list') }}</caption>
                    <thead>
                    <tr>
                        <th scope="col">
                            <button class="sort" data-sort="matricule">
                                {{ __('common.matricule') }} <i class="fas fa-arrows-alt-v"></i>
                            </button>
                        </th>
                        <th scope="col">
                            <button class="sort" data-sort="user">
                                {{ __('common.student') }} <i class="fas fa-arrows-alt-v"></i>
                            </button>
                        </th>
                        <th scope="col">
                            <button class="sort" data-sort="role">
                                {{ __('common.role') }} <i class="fas fa-arrows-alt-v"></i>
                            </button>
                        </th>
                        <th scope="col">{{ __('common.actions') }}</th>
                    </tr>
                    </thead>
                    <tbody class="list">
                    @foreach ($users as $key => $user)
                        <tr>
                            <td class="matricule">{{ $user->matricule }}</td>
                            <td class="user">{{ $user->name }}</td>
                            <td class="role">
                                <ul>
                                    @foreach($user->getRoleNames() as $role)
                                        <li>{{ $role }}</li>
                                    @endforeach
                                </ul>
                            </td>
                            <td>
                                <ul>
                                    <li>
                                        <a href="{{ route('users.show', ['id' => $user->id]) }}" title="{{ __('users.show') }}"><i class="fas fa-eye"></i></a>
                                        @if ((!$user->hasRole('teacher') && !$user->hasRole('admin')) || $is_admin)
                                            <a href="{{ route('users.edit', ['id' => $user->id]) }}" title="{{ __('users.edit') }}"><i class="fas fa-pencil-alt"></i></a>
                                        @endif
                                        <a href="{{ route('users.delete', $user->id) }}" title="{{ __('users.delete') }}"><i class="fas fa-trash"></i></a>
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
