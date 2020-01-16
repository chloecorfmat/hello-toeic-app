<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Setting;
use Illuminate\Http\Request;

class FeatureFlippingController extends Controller
{
    public function index(Request $request) {
        $configs = Setting::where('type', 'config')->get();
        return response()->json($configs);
    }
}
