<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\FlashService;
use App\Setting;
use DaveJamesMiller\Breadcrumbs\Facades\Breadcrumbs;
use Illuminate\Http\Request;

class FeatureFlippingController extends Controller
{
    /**
     * Constructor.
     */
    public function __construct()
    {
        $this->middleware(['permission:features-manage']);
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

        return redirect()->route('config.index')->with('success', trans('feature-flipping.updated'));
    }
}
