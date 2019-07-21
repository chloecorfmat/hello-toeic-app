@extends('layouts.app')


@section('content')
    <div class="main-content">

        {{ Breadcrumbs::render('permissions.index') }}

        <h1>{{ __('permissions.manage') }}</h1>

        @if ($message = Session::get('success'))
            <div class="alert alert-success">
                <p>{{ $message }}</p>
            </div>
        @endif

        <form method="POST" action="{{ route('permissions.store') }}">
            @csrf
            <div>
                @foreach ($datas['permissions'] as $key => $permission)
                    <fieldset>
                        <legend>{{ $permission->name }}</legend>
                        <div>
                            @foreach ($datas['roles'] as $key_role => $role)
                                <label for="{{ $permission->name . '-' . $key_role }}">
                                    <input
                                        type="checkbox"
                                        name="{{ $permission->name }}[]"
                                        value="{{ $role->id }}"
                                        id="{{ $permission->name . '-' . $key_role }}"
                                        @if(in_array($role->name, $datas['sync'][$permission->name]))
                                            checked
                                        @endif
                                    >
                                    <span class="form-label-text">
                                        <span>{{ $role->name }}</span>
                                    </span>
                                </label>
                            @endforeach
                        </div>
                    </fieldset>
                @endforeach
            </div>
            <div>
                <button type="submit" class="btn btn-primary">
                    {{ __('common.save') }}
                </button>
            </div>
        </form>
    </div>
@endsection
