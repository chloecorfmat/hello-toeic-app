@php ($class_main = 'login-page')

@extends('layouts.app')

@section('content')
    <div class="login">
        <div class="form-container">
            <h1>{{ __('Reset Password') }}</h1>
            <form method="POST" action="{{ route('password.email') }}">
                @csrf
                <div class="field-container">
                    <label for="email">{{ __('common.email') }} <span class="required">*</span></label>
                    <input id="email" type="email" name="email" value="{{ $email ?? old('email') }}" required autofocus>
                </div>

                <button type="submit" class="btn btn-primary">
                    {{ __('Send password reset link') }}
                </button>
            </form>
        </div>
    </div>
@endsection
