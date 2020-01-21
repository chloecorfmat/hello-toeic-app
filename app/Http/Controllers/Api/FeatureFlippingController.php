<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Setting;
use Illuminate\Http\Request;

class FeatureFlippingController extends Controller
{
    public function index(Request $request) {
        $features = Setting::where('type', 'feature_flipping')->get();
        return response()->json($features);
    }
}
