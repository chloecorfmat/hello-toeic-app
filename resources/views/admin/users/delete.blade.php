@extends('layouts.app')

@section('content')
    <div class="main-content">
        {{ Breadcrumbs::render('users.delete', $user) }}
        <h1>{{ __('users.delete-this', ['name' => $user->name]) }}</h1>
        @if ($errors->any())
            <div>
                <ul class="alert alert-error">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form action="{{ route('users.destroy', $user->id) }}" method="POST">
            @method('DELETE')
            @csrf
            <p class="important">{{ __('common.delete_sure') }} <span class="emphasis">{{ __('common.action_irreversible') }}</span></p>

            <button type="submit" class="btn btn-primary">{{ __('common.delete') }}</button>
        </form>
    </div>
@endsection
