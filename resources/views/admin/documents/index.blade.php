@extends('layouts.app')

@section('content')
    <div class="main-content">
        <div class="main-content--header">
            {{ Breadcrumbs::render('documents.index') }}
            <h1>{{ __('documents.list') }}</h1>
            <a href="{{ route('documents.create') }}" class="main-content--header-actions">
                <i class="fas fa-plus-circle"></i>
            </a>
        </div>
        <ul class="list-documents">
            @foreach ($datas['documents'] as $key => $document)
                <li class="list-documents--item">
                    <a href="{{ route('documents.show', ['id' => $document->id]) }}">
                        @if ($document->type === 'image')
                            <img src="{{ url('storage/'.$document->url) }}">
                        @elseif ($document->type === 'text')
                            <div class="audio-ico-container">
                                <i class="fas fa-align-justify fa-5x"></i>
                            </div>
                        @else
                            <div class="audio-ico-container">
                                <i class="fas fa-volume-up fa-5x"></i>
                            </div>
                        @endif
                        <div class="list-documents--item-content">
                            <p class="important">{{ $document->name }}</p>
                            <p><span>{{ count($document->questions) }}</span> {{ __('common.questions') }}</p>
                        </div>
                    </a>
                </li>
            @endforeach
        </ul>
    </div>
@endsection
