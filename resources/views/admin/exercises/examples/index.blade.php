@extends('layouts.app')

@section('content')
    <div class="main-content list-tests">
        <div class="main-content--header">
            <a href="{{ route('examples.create') }}" class="main-content--header-actions">
                <i class="fas fa-plus-circle"></i>
            </a>
        </div>

        <div class="list-documents">
            <ul>
                @foreach ($examples as $example)
                    <li>
                        <h2>{{ $example->name }}</h2>
                        <img src="{{ url('storage/'.$example->image) }}"/>
                        <p>{{ $example->image }}</p>
                    </li>
                @endforeach
            </ul>
        </div>
    </div>
@endsection
