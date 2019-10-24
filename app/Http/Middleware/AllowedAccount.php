<?php

namespace App\Http\Middleware;

use Closure;

use Illuminate\Support\Facades\Auth;

class AllowedAccount
{
    /**
     * The URIs that should be reachable while maintenance mode is enabled.
     *
     * @var array
     */
    protected $except = [

    ];

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = Auth::user();

        if (!is_null($user)) {
            // Check if user consent (according to GDPR).
            if (!$user->status) {
                return redirect()->route('blockedAccount');
            }

            if (!is_null($user->consent_at)) {
                return $next($request);
            } else {
                $url = $request->path();
                $request->session()->put('redirect', $url);
                return redirect()->route('collectConsent');
            }
        }

        return $next($request);
    }
}
