<?php

namespace App\Http\Controllers\Auth;

use App\BackgroundImage;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/profile';

    public function showLoginForm()
    {
        $background_image = BackgroundImage::all()->random(1)->first();
        return view('auth.login', compact('background_image'));
    }


    public function logout(Request $request) {
        // What happened if several tabs opened ?
        /**$user = Auth::user();
        $user->api_token = null;
        $user->save();**/

        Auth::logout();
        return redirect('/login');
    }

    protected function redirectTo()
    {
        $user = Auth::user();

        $token = $user->createToken('Hello')-> accessToken;
        $user->api_token = $token;
        $user->save();

        Log::info(trans('log.user-login', [
            'name' => $user->name,
            'email' => $user->email,
        ]));
        return '/profile';
    }

    function authenticated(Request $request, $user)
    {
        if (!is_null($user->last_login_at)) {
            $user->before_last_login_at = $user->last_login_at;
        } else {
            $user->before_last_login_at = (new \DateTime());
        }

        $user->last_login_at = (new \DateTime());
        $user->save();

        setcookie('lang', 'en', 0, '/');
    }

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }
}
