<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>@yield('title')</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">

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

        .title {
            font-size: 36px;
            padding: 20px;
        }

        .btn {
            background: #4b3f72;
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
             background: #8d6a9f;
             color: #fff;
         }

    </style>
</head>
<body>
<div class="flex-center position-ref full-height">
    <div class="content">
        <div class="title">
            <p>{{ __('app.blocked-account') }}</p>
            <a href="logout" class="btn">{{ __('common.logout') }}</a>
        </div>
    </div>
</div>
</body>
</html>
