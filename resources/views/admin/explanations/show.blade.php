@extends('layouts.app')

@section('content')
    <div class="main-content">
        <div class="main-content--header">
            {{ Breadcrumbs::render('explanations.show', $explanation) }}
            <h1>Détails de l'explication</h1>
        </div>

        <p>Title : <span>{{ $explanation->title }}</span></p>
        <p>Details : <span>{{ $explanation->explanation }}</span></p>
    </div>
@endsection
