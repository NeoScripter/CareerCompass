<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TestAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user) {
            return redirect()->route('home');
        }
        $testId = $request->route('testId');

        if (!$user->hasTest($testId)) {
            return redirect()->route('home')
                ->with('message', 'У вас нет доступа к данному тесту');
        }
        return $next($request);
    }
}
