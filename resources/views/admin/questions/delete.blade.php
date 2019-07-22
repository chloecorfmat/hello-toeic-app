@extends('layouts.app')

@section('content')
    <div class="main-content">
        {{ Breadcrumbs::render('questions.delete', $question) }}
        @if (!empty($question->question))
            <h1>{{ __('common.delete') }}: {{ $question->question }}</h1>
        @else
            <h1>{{ __('common.delete') }}: #none ({{ $question->id }})</h1>
        @endif

        @if ($errors->any())
            <div>
                <ul class="alert alert-error">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form action="{{ route('questions.destroy', $question->id) }}" method="POST">
            @method('DELETE')
            @csrf
            <p class="important">{{ __('questions.delete_sure') }} <span class="emphasis">{{ __('common.action_irreversible') }}</span></p>

            <button type="submit" class="btn btn-primary">{{ __('common.delete') }}</button>
        </form>
    </div>
@endsection
