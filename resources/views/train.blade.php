@extends('layouts.app')

@section('content')
    <div class="main-content">
        <h1>S'entraîner</h1>
        <ul class="training-container">
            <li class="training-part">
                <a href="{{ route('student.tests.index') }}">
                    <img src="{{ url('svg/tests.svg') }}" alt="Tests"/>
                    <h2>Tests complets</h2>
                </a>
            </li>
            <li class="training-part">
                <a href="{{ route('tests.exercises') }}">
                    <img src="{{ url('svg/exercises.svg') }}" alt="Exercises"/>
                    <h2>Exercises</h2>
                </a>
            </li>
            <li class="training-part">
                <a href="{{ route('games.play') }}">
                    <img src="{{ url('svg/challenges.svg') }}" alt="Challenges"/>
                    <h2>Challenges</h2>
                </a>
            </li>
        </ul>
    </div>
@endsection
