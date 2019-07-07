@extends('layouts.app')

@section('content')
    <div class="main-content">
        <div class="main-content--header">
            {{ Breadcrumbs::render('results.index') }}
            <h1>Résultats</h1>
        </div>

        @if ($errors->any())
            <div>
                <ul class="alert alert-error">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <div class="part-container">
            <ul>
                <li>
                    <a href="{{ route('results.exercises') }}">
                        <i class="menu-ico fas fa-star"></i>
                        Résultats des exercices
                    </a>
                </li>

                <li>
                    <a href="{{ route('results.composite-tests') }}">
                        <i class="menu-ico fas fa-star"></i>
                        Résultats des tests composés
                    </a>
                </li>

                <li>
                    <a href="{{ route('results.games') }}">
                        <i class="menu-ico fas fa-star"></i>
                        Résultats des challenges
                    </a>
                </li>
            </ul>
        </div>
    </div>
@endsection
