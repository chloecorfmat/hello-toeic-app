@extends('layouts.app')

@section('content')
    <div class="main-content">
        <div class="part-container student-profile">
            <p><strong class="important">{{ __('common.name') }}: </strong>{{ $user->name }}</p>
            <p><strong class="important">{{ __('common.matricule') }}: </strong>{{ $user->matricule }}</p>
            <p>
                <strong class="important">{{ __('common.email') }}: </strong>
                <a href="mailto:{{ $user->email }}">{{ $user->email }}</a>
            </p>
            @if (!is_null($user->passed))
            <p>
                <strong class="important">{{ __('common.toeic') }}: </strong>
                    {{ date('d/m/Y', strtotime($user->passed)) }}
            </p>
            @endif

            @if ($user->groups()->count() !== 0)
            <div>
                <p>
                    <strong class="important">{{ __('app.groups') }} :</strong>
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
