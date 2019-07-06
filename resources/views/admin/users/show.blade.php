@extends('layouts.app')

@section('content')
    <div class="main-content">
        <div class="main-content--header">
            {{ Breadcrumbs::render('users.show', $user) }}
            <h1>Détails : {{ $user->name }}</h1>
        </div>

        @if ($message = Session::get('success'))
            <div class="alert alert-success">
                <p>{{ $message }}</p>
            </div>
        @endif

        <div class="part-container student-profile">
            <p><strong class="important">Name: </strong>{{ $user->name }}</p>
            <p><strong class="important">Matricule: </strong>{{ $user->matricule }}</p>
            <p>
                <strong class="important">Email: </strong>
                <a href="mailto:{{ $user->email }}">{{ $user->email }}</a>
            </p>
            @if (!is_null($user->passed))
            <p>
                <strong class="important">Passed: </strong>
                    {{ date('d/m/Y', strtotime($user->passed)) }}
            </p>
            @endif

            @if ($user->groups()->count() !== 0)
            <div>
                <p>
                    <strong class="important">Groups :</strong>
                </p>
                <ul>
                    @foreach ($user->groups()->get() as $group)
                        <li>
                            <a href="{{ route('groups.show', ['id' => $group->id]) }}">{{ $group->name }}</a>
                        </li>
                    @endforeach
                </ul>
            </div>
            @endif
        </div>
    </div>
@endsection
