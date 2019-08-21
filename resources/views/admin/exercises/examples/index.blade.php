@extends('layouts.app')

@section('content')
    <div class="main-content list-tests">
        <div class="main-content--header">
            {{ Breadcrumbs::render('exercises.examples.index') }}
            <h1>
                {{ __('examples.list') }}
            </h1>
            <a href="{{ route('examples.create') }}" class="main-content--header-actions">
                <i class="fas fa-plus-circle"></i>
            </a>
        </div>
        @if ($message = Session::get('success'))
            <div class="alert alert-success">
                <p>{{ $message }}</p>
            </div>
        @elseif ($message = Session::get('error'))
            <div class="alert alert-error">
                <p>{{ $message }}</p>
            </div>
        @endif

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
