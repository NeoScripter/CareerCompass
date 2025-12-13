<!DOCTYPE html>
<html class="overflow-x-clip " lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <link rel="preload" href="{{ asset('fonts/Lato-Regular.woff2') }}" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="{{ asset('fonts/Lato-Medium.woff2') }}" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="{{ asset('fonts/Lato-SemiBold.woff2') }}" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="{{ asset('fonts/Lato-Bold.woff2') }}" as="font" type="font/woff2" crossorigin>
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">

    <style>
        @font-face {
            font-family: 'Lato';
            src: url('/fonts/Lato-Bold.woff2') format('woff2');
            font-weight: bold;
            font-display: swap
        }

        @font-face {
            font-family: 'Lato';
            src: url('/fonts/Lato-SemiBold.woff2') format('woff2');
            font-weight: 600;
            font-display: swap
        }

        @font-face {
            font-family: 'Lato';
            src: url('/fonts/Lato-Medium.woff2') format('woff2');
            font-weight: 500;
            font-display: swap
        }

        @font-face {
            font-family: 'Lato';
            src: url('/fonts/Lato-Regular.woff2') format('woff2');
            font-weight: normal;
            font-display: swap
        }
    </style>

    @routes
    @viteReactRefresh
    @vite('resources/js/app.tsx')
    @inertiaHead
</head>

<body class="font-sans overflow-x-clip min-h-screen">
    @inertia
    <div id="portal-container"></div>
</body>

</html>
