@extends('layouts.app')

@section('content')
    <div class="main-content">
        @if ($message = Session::get('success'))
            <div class="alert alert-success">
                <p>{{ $message }}</p>
            </div>
        @endif

        @if ($message = Session::get('error'))
            <div class="alert alert-error">
                <p>{{ $message }}</p>
            </div>
        @endif

        <div class="part-container">
            <p><strong class="important">{{ __('common.name') }}: </strong>{{ $group->name }}</p>
            <p><strong class="important">{{ __('common.machine-name') }}: </strong>{{ $group->machine_name }}</p>
            <p><strong class="important">{{ __('common.teacher') }}: </strong>{{ $teacher->name }}</p>
            <p><strong class="important">{{ __('common.dates') }}: </strong>from {{ date('d/m/Y', strtotime($group->start_date)) }} to {{ date('d/m/Y', strtotime($group->end_date)) }}</p>
        </div>

        <div class="part-container">
            <h2>{{ __('common.students') }}</h2>
            <ul>
                @foreach($students as $student)
                    <li>
                        <a href="{{ route('students.show', ['id' => $student->id]) }}">
                            {{ $student->name }}
                        </a> :
                        <a href="{{ route('groups.unassign', ['group' => $group->id, 'student' => $student->id]) }}">
                            <i class="fas fa-trash"></i>
                        </a>
                    </li>
                @endforeach
            </ul>
        </div>
    </div>
@endsection
