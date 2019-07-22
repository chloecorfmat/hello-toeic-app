@extends('layouts.app')

@section('content')
    <div class="main-content">
        <div class="main-content--header">
            {{ Breadcrumbs::render('parts.show', $part) }}
            <h1>{{ __('common.details') }}: {{ $part->name }}</h1>
        </div>

        <p>{{ __('common.name') }} : <span>{{ $part->name }}</span></p>
        <p>{{ __('common.version') }} : <span>{{ $part->version }}</span></p>
        <p>{{ __('common.type') }} : <span>{{ $part->type }}</span></p>
        <p>{{ __('common.description') }} : <span>{{ $part->description }}</span></p>
        <p>{{ __('common.number-of-questions') }} : <span>{{ $part->nb_questions }}</span></p>
        <p>{{ __('common.number-of-proposals') }} : <span>{{ $part->nb_answers }}</span></p>
        <p>{{ __('common.questions-or-texts) }} ? : <span>{{ $part->texts }}</span></p>
        <p>{{ __('common.files') }} ? : <span>{{ $part->files }}</span></p>

    </div>
@endsection
