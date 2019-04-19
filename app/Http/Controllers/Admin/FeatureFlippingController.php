<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Setting;
use Illuminate\Http\Request;

class FeatureFlippingController extends Controller
{
    public function __construct()
    {
        $this->middleware(['role:admin']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $features = Setting::where('type', 'feature_flipping')->get();

        return view('admin.feature-flipping.index',compact('features'));
    }

    /**
     * Store feature flipping values.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $datas = $request->all();
        $features = Setting::where('type', 'feature_flipping')->get();

        foreach ($features as $feature) {
            if (($feature->value === "true") && !key_exists(str_replace('.', '_', $feature->key), $datas)) {
                $feature->value = "false";
                $feature->save();
            } elseif (($feature->value === "false") && key_exists(str_replace('.', '_', $feature->key), $datas)) {
                $feature->value = "true";
                $feature->save();
            }
        }

        return redirect()->route('feature-flipping.index')->with('success', 'Feature flipping has been saved.');
    }
}
