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
<body>
    <div id="app" class="app">
        <div class="profile--menu">
            <ul class="profile--menu-list">
                <li class="profile--menu-item student--item">
                    <a href="./profile" class="profile--menu-link">
                        <span>Student</span>
                    </a>
                </li>
                <li class="profile--menu-item teacher--item">
                    <a href="./profile" class="profile--menu-link">
                        <span>Teacher</span>
                    </a>
                </li>
                <li class="profile--menu-item admin--item">
                    <a href="./profile" class="profile--menu-link">
                        <span>Admin</span>
                    </a>
                </li>
            </ul>
        </div>
        <header class="header">
            <div class="header--part header--logo">
                <a href="{{ route('profile') }}">
                    <img src="/svg/hello-toeic-small.svg" alt="">
                    {{ config('app.name', 'Hello Toeic') }}
                </a>
            </div>
            <div class="header--part header--menu">
                <nav>
                    <ul>
                        <li><a href="" class="active">Composite tests</a></li>
                        <li><a href="">Exercises</a></li>
                        <li><a href="">Challenge mode</a></li>
                    </ul>
                </nav>
            </div>
            <div class="header--part">
                <ul class="header--actions-list">
                @guest
                    <li class="header--actions-list-item">
                        <a href="{{ route('login') }}">
                            <span>{{__('common.login')}}</span>
                        </a>
                    </li>
                @else
                    <li class="header--actions-list-item">
                        <a href="{{ route('student.users.show', ['id' => Auth::user()->id]) }}">
                            @if (Auth::user()->picture)
                                <div class="user-picture--container user-picture--header">
                                    <img src="{{ Auth::user()->picture }}" alt="" class="user-picture">
                                </div>
                            @else
                                <i class="user-ico fas fa-user-circle fa-lg"></i>
                            @endif

                            <span class="legend-ico">{{ __('app.profile') }}</span>
                        </a>
                    </li>
                    <li class="header--actions-list-item">
                        <a href="{{ route('contact') }}">
                            <i class="fas fa-info-circle fa-lg"></i>
                            <span class="legend-ico">{{ __('app.contact') }}</span>
                        </a>
                    </li>
                    <li class="header--actions-list-item">
                        <a href="{{ route('logout') }}">
                            <i class="fas fa-power-off fa-lg"></i>
                            <span class="legend-ico">{{__('common.logout')}}</span>
                        </a>
                    </li>
                @endguest
                </ul>
            </div>
        </header>
        <main
            @if (isset($class_main) && !empty($class_main))
                class="{{ $class_main }}"
            @endif
        >
            <div class="container">
                @yield('content')
            </div>
        </main>

        <div class="body-border"></div>
    </div>

    <!-- Scripts -->
    <script src="//cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.bundle.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/list.js/1.5.0/list.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/moment-duration-format/2.2.2/moment-duration-format.min.js"></script>
    <!-- Include Choices JavaScript -->
    <script src="https://cdn.jsdelivr.net/npm/choices.js/public/assets/scripts/choices.min.js"></script>

    <script>
        @if(isset($listening_duration) && $listening_duration != 0)
            const DURATION_LISTENING = {{ $listening_duration }};
        @else
            const DURATION_LISTENING = 0;
        @endif

        @if(isset($reading_duration) && $reading_duration != 0)
            const DURATION_READING = {{ $reading_duration }};
        @else
            const DURATION_READING = 0;
        @endif

    </script>
    <script src="{{ asset('js/all.js') }}" defer></script>

    @if (isset($use_vue) && $use_vue)
        <script src="{{ asset('js/app.js') }}" defer></script>
    @endif
</body>
</html>
