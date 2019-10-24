<?php

namespace App\Http\Middleware;

use Closure;

use Illuminate\Support\Facades\Auth;

class hasGDPRConsent
{
    /**
     * The URIs that should be reachable while maintenance mode is enabled.
     *
     * @var array
     */
    protected $except = [
        'collect-consent', // @TODO : check this.
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

        // Check if user consent (according to GDPR).
        if ($user->consent) { // @TODO : check this.
            return $next($request);
        } else {
            $url = $request->path();
            $request->session()->put('redirect', $url);
            return redirect('collect-consent');
        }
    }
}
