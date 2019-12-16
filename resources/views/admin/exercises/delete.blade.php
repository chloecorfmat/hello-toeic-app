@extends('layouts.app')

@section('content')
    <div class="main-content">
        <form action="{{ route('exercises.destroy', $exercise->id) }}" method="POST">
            @method('DELETE')
            @csrf

            <div class="field-container">
                <label for="status">
                    <input
                            type="checkbox"
                            name="status"
                            value="true"
                            id="status"
                            aria-describedby="status-description"
                    >
                    <span class="form-label-text">
                        {{ __('common.complete-deletion') }}
                    </span>
                </label>
                <p id="status-description"><span class="important">{{ __('common.warning') }} !</span> {{ __('common.complete-deletion_explanation') }}</p>
            </div>

            <button type="submit" class="btn btn-primary">{{ __('common.delete') }}</button>
        </form>
    </div>
@endsection
