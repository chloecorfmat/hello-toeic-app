@php ($class_main = 'login-page')

@extends('layouts.app')

@section('content')
<div class="login">
    <div class="form-container">
        <h1>{{ __('common.login') }}</h1>

        @foreach($errors->all() as $error)
            <div class="alert alert-error">
                <ul>
                    <li>{{ $error }}</li>
                </ul>
            </div>
        @endforeach

        <form method="POST" action="{{ route('login') }}">
            @csrf
            <div class="field-container">
                <label for="email">{{ __('common.email') }} <span class="required">*</span></label>
                <input type="email" id="email" name="email" value="{{ old('email') }}" required autofocus>
            </div>

            <div class="field-container">
                <label for="password">{{ __('common.password') }} <span class="required">*</span></label>
                <input type="password" id="password" name="password" required>
            </div>

            <button type="submit" class="btn btn-primary">
                {{ __('common.login') }}
            </button>
        </form>

        <a class="forgot-password" href="{{ route('password.request') }}">{{ __('common.forgot-password') }}</a>
    </div>
</div>
@endsection
