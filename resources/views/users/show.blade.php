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
            <h1>{{ __('app.profile') }}</h1>
        </div>

        <div class="part-container">
            <p><strong class="important">{{ __('common.name') }}:</strong> {{ $user->name }}</p>
            <p><strong class="important">{{ __('common.matricule') }}:</strong> {{ $user->matricule }}</p>
            <p><strong class="important">{{ __('common.email') }}:</strong> {{ $user->email }}</p>
            <p><strong class="important">{{ __('common.course') }}:</strong>
                @if (!is_null($user->course))
                    {{ $user->course }}
                @else
                    -
                @endif
            </p>
            <p><strong class="important">{{ __('common.toeic') }}:</strong>
                @if (!is_null($user->passed))
                    <i class="fas fa-check-circle"></i>
                @else
                    <i class="fas fa-times-circle"></i>
                @endif
            </p>

            <h2>{{ __('profile.password_update') }}</h2>

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

            <p class="emphasis">{{ __('profile.password_limitation') }}</p>
            <form method="POST" action="{{ route('student.users.update', ['id' => $user->id]) }}">
                @csrf
                {{ method_field('PUT')}}

                <div class="field-container">
                    <label for="password">{{ __('common.password') }} <span class="required">*</span></label>
                    <input type="password" id="password" name="password" required>
                </div>

                <div class="field-container">
                    <label for="password_repeat">{{ __('profile.password_repeat') }} <span class="required">*</span></label>
                    <input type="password" id="password_repeat" name="password_repeat" required>
                </div>

                <button type="submit" class="btn btn-primary">
                    {{ __('common.validate') }}
                </button>
            </form>
        </div>
    </div>
@endsection
