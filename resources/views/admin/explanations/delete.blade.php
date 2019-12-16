@extends('layouts.app')

@section('content')
    <div class="main-content">
        <form action="{{ route('explanations.destroy', $explanation->id) }}" method="POST">
            @method('DELETE')
            @csrf
            <p class="important">{{ __('explanations.delete_sure') }} <span class="emphasis">{{ __('common.action_irreversible') }}</span></p>

            <button type="submit" class="btn btn-primary">{{ __('common.delete') }}</button>
        </form>
    </div>
@endsection
