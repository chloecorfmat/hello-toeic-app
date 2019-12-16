@extends('layouts.app')

@section('content')
    <div class="main-content">
        <form action="{{ route('lessons.destroy', $lesson->id) }}" method="POST">
            @method('DELETE')
            @csrf
            <p class="important">{{ __('lessons.delete_sure') }} <span class="emphasis">{{ __('common.action_irreversible') }}</span></p>

            <button type="submit" class="btn btn-primary">{{ __('common.delete') }}</button>
        </form>
    </div>
@endsection
