<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
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
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $features = Setting::where('type', 'feature_flipping')->get();

        $common_data['active_trail'] = 'admin';
        $common_data['header'] = [
            'title' => trans('app.feature-flipping'),
            'breadcrumb' => Breadcrumbs::generate('feature-flipping.index'),
            'theme' => 'colored-background',
        ];

        return view('admin.feature-flipping.index',compact('features', 'common_data'));
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

        return redirect()->route('feature-flipping.index')->with('success', trans('feature-flipping.updated'));
    }
}
