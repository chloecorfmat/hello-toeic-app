@extends('layouts.app')

@section('laterale-bar-content-begin')
    {{--  @role('student')
     <div class="laterale-bar--part">
         <h3>Statistiques</h3>
         <p><span>{{ count($datas['trials']) }}</span> tests</p>
     </div>
     @endrole --}}
@endsection

@section('content')
    <div class="main-content">
        <div class="main-content--header">
            <h1>Profile</h1>
        </div>

        <div class="part-container">
            <p><strong class="important">Name:</strong> {{ $user->name }}</p>
            <p><strong class="important">Matricule:</strong> {{ $user->matricule }}</p>
            <p><strong class="important">E-mail:</strong> {{ $user->email }}</p>
            <p><strong class="important">Course:</strong>
                @if (!is_null($user->course))
                    {{ $user->course }}
                @else
                    -
                @endif
            </p>
            <p><strong class="important">Toeic:</strong>
                @if (!is_null($user->passed))
                    <i class="fas fa-check-circle"></i>
                @else
                    <i class="fas fa-times-circle"></i>
                @endif
            </p>

            <h2>Update password</h2>

            @if ($message = Session::get('success'))
                <div class="alert alert-success">
                    <p>{{ $message }}</p>
                </div>
            @elseif ($message = Session::get('warning'))
                <div class="alert alert-warning">
                    <p>{{ $message }}</p>
                </div>
            @elseif ($message = Session::get('error'))
                <div class="alert alert-error">
                    <p>{{ $message }}</p>
                </div>
            @endif

            <p class="emphasis">Password should contain at least 1 lowercase, 1 uppercase, 1 number, 1 special char and contain between 6 and 16 characters.</p>
            <form method="POST" action="{{ route('student.users.update', ['id' => $user->id]) }}">
                @csrf
                {{ method_field('PUT')}}

                <div class="field-container">
                    <label for="password">Password <span class="required">*</span></label>
                    <input type="password" id="password" name="password" required>
                </div>

                <div class="field-container">
                    <label for="password_repeat">Repeat password <span class="required">*</span></label>
                    <input type="password" id="password_repeat" name="password_repeat" required>
                </div>

                <button type="submit" class="btn btn-primary">
                    {{ __('Validate') }}
                </button>
            </form>
        </div>
    </div>
@endsection
