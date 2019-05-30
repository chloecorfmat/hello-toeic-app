@extends('layouts.app')

@section('content')
    <div class="main-content">
        <div class="main-content--header">
            <h1>Détails du groupe : {{ $group->name }}</h1>
        </div>

        @if ($message = Session::get('success'))
            <div class="alert alert-success">
                <p>{{ $message }}</p>
            </div>
        @endif

        <div class="part-container">
            <p><strong class="important">Name: </strong>{{ $group->name }}</p>
            <p><strong class="important">Teacher: </strong>{{ $teacher->name }}</p>
            <p><strong class="important">Dates: </strong>from {{ date('d/m/Y', strtotime($group->start_date)) }} to {{ date('d/m/Y', strtotime($group->end_date)) }}</p>
        </div>

        <div class="part-container">
            <h2>Students</h2>
            <ul>
                @foreach($students as $student)
                    <li>{{ $student->name }}</li>
                @endforeach
            </ul>
        </div>
    </div>
@endsection
