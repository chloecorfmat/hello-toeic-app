@extends('layouts.app')

@section('content')
    <div class="main-content">
        <form action="{{ route('groups.destroy', $group->id) }}" method="POST">
            @method('DELETE')
            @csrf
            <p class="important">{{ __('groups.delete_sure') }} <span class="emphasis">{{ __('common.action_irreversible') }}</span></p>

            <button type="submit" class="btn btn-primary">{{ __('common.delete') }}</button>
        </form>
    </div>
@endsection
