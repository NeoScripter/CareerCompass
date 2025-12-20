<!DOCTYPE html>
<html class="overflow-x-clip" lang="{{ str_replace('_', '-', app()->getLocale()) }}">

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

    <meta name="yandex-verification" content="d3efcbc91c4d66e6" />
    <!-- Yandex.Metrika counter -->
    <script defer type="text/javascript">
        (function(m, e, t, r, i, k, a) {
            m[i] = m[i] || function() {
                (m[i].a = m[i].a || []).push(arguments)
            };
            m[i].l = 1 * new Date();
            for (var j = 0; j < document.scripts.length; j++) {
                if (document.scripts[j].src === r) {
                    return;
                }
            }
            k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(
                k, a)
        })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=105874281', 'ym');

        ym(105874281, 'init', {
            ssr: true,
            webvisor: true,
            clickmap: true,
            ecommerce: "dataLayer",
            accurateTrackBounce: true,
            trackLinks: true
        });
    </script>
    <noscript>
        <div><img src="https://mc.yandex.ru/watch/105874281" style="position:absolute; left:-9999px;" alt="" />
        </div>
    </noscript>
    <!-- /Yandex.Metrika counter -->

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
