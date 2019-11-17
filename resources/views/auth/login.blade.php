@php ($class_main = 'login-page')

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png">
    <link rel="manifest" href="/favicon/site.webmanifest">
    <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#4b3f72">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="theme-color" content="#ffffff">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Hello Toeic') }}</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="https://fonts.gstatic.com">

    <!-- Styles -->
    <!--<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.min.css">

    <!-- Include Choices CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/choices.js/public/assets/styles/choices.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.3.0/css/flag-icon.min.css">

    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body style="background-image:url('{{ url('storage/' . $background_image->url) }}'); background-size:cover; color:{{ $background_image->color }};">
    <div id="app" class="app">
        <main
                @if (isset($class_main) && !empty($class_main))
                class="{{ $class_main }}"
                @endif
        >
            <div class="container">
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
            </div>
        </main>
    </div>
<script src="{{ asset('js/all.js') }}" defer></script>
<script src="{{ asset('js/app.js') }}" defer></script>
</body>
</html>
