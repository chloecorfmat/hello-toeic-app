@php ($class_main = 'login-page')

@extends('layouts.app')

@section('content')
    <div class="login">
        <div class="form-container">
            <h1>{{ __('Reset Password') }}</h1>

            @foreach($errors->all() as $error)
                <div class="alert alert-error">
                    <ul>
                        <li>{{ $error }}</li>
                    </ul>
                </div>
            @endforeach

            <form method="POST" action="{{ route('password.update') }}">
                @csrf

                <input type="hidden" name="token" value="{{ $token }}">

                <div class="field-container">
                    <label for="email">{{ __('E-mail address') }} <span class="required">*</span></label>
                    <input id="email" type="email" name="email" value="{{ $email ?? old('email') }}" required autofocus>
                </div>

                <div class="field-container">
                    <label for="password">{{ __('Password') }} <span class="required">*</span></label>
                    <input id="password" type="password" name="password" required>
                </div>

                <div class="field-container">
                    <label for="password-confirm">{{ __('Confirm password') }} <span class="required">*</span></label>
                    <input id="password-confirm" type="password" name="password_confirmation" required>
                </div>


                <button type="submit" class="btn btn-primary">
                    {{ __('Reset password') }}
                </button>
            </form>
        </div>
    </div>
@endsection
