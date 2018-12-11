@php ($class_main = 'login-page')

@extends('layouts.app')

@section('content')
<div class="login">
    <div class="form-container">
        <h1>Login</h1>

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
                <label for="email">E-mail address <span class="required">*</span></label>
                <input type="email" id="email" name="email" value="{{ old('email') }}" required autofocus>
            </div>

            <div class="field-container">
                <label for="password">Password <span class="required">*</span></label>
                <input type="password" id="password" name="password" required>
            </div>

            <button type="submit" class="btn btn-primary">
                {{ __('Login') }}
            </button>
        </form>
    </div>
</div>
@endsection
