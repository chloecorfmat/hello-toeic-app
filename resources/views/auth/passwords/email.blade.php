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

            @if (session('status'))
                <div class="alert alert-success" role="alert">
                    <p>{{ session('status') }}</p>
                </div>
            @endif

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
