<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>@yield('title')</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">

    <!-- Favicon -->
    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png">
    <link rel="manifest" href="/favicon/site.webmanifest">
    <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#4b3f72">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="theme-color" content="#ffffff">

    <!-- Styles -->
    <style>
        html, body {
            background-color: #fff;
            color: #636b6f;
            font-family: 'Nunito', sans-serif;
            font-weight: 100;
            height: 100vh;
            margin: 0;
        }

        .full-height {
            height: 100vh;
        }

        .flex-center {
            align-items: center;
            display: flex;
            justify-content: center;
        }

        .position-ref {
            position: relative;
        }

        .content {
            text-align: center;
        }

        .title h1 {
            font-size: 36px;
            padding: 20px;
        }

        .btn {
            background: #a42424;
            border: none;
            border-radius: 5px;
            color: #fff;
            cursor: pointer;
            display: inline-block;
            font-size: 1.3rem;
            line-height: 1.3;
            padding: .5rem 1rem;
            text-decoration: none;
            transition: background .2s ease-in;
        }

        .btn:hover {
             background: #c85d53;
             color: #fff;
         }

        a {
            color: #a42424;
        }

        a:hover {
            color: #c85d53;
        }

    </style>
</head>
<body>
<div class="flex-center position-ref full-height">
    <div class="content">
        <div class="title">
            <h1>{{ __('app.blocked-account') }}</h1>
            <div>
                <img src="https://media2.giphy.com/media/3ohzdIk6GgMh1T6ldC/giphy.gif" alt="TOEIC is coming !"/>
                <p>Your account bas been blocked on this test server.</p>
                <p>FYI Hello's been moved. Please go to <a href="https://hello.epe.bzh">https://hello.epe.bzh</a> and get back to training already. TOEIC is coming!</p>
            </div>

            <a href="logout" class="btn">{{ __('common.logout') }}</a>

        </div>
    </div>
</div>
</body>
</html>
