@extends('layouts.app')

@section('content')
    <div class="main-content">
        <h1>Teacher menu</h1>
        <nav>
            <ul>
                <li><a href="/teacher/results">Results</a></li>
                <li><a href="/teacher/users">Users list</a></li>
                <li><a href="/teacher/students">Students list</a></li>
                <li><a href="/teacher/groups">Groups list</a></li>
                <li><a href="/teacher/documents">Documents list</a></li>
                <li><a href="/teacher/questions">Questions list</a></li>
                <li><a href="/teacher/exercises">Exercises list</a></li>
                <li><a href="/teacher/composite-tests">Composite tests list</a></li>
                <li><a href="/teacher/explanations">Explanations list</a></li>
                <li><a href="/teacher/messages">Messages list</a></li>
            </ul>
        </nav>
    </div>
@endsection
