@extends('layouts.app')

@section('content')
    <div class="main-content">
        {{ Breadcrumbs::render('results.games') }}
        <h1>Résultats des challenges</h1>
        @if ($errors->any())
            <div>
                <ul class="alert alert-error">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

    </div>
@endsection
