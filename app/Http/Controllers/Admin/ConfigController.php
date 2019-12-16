<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\FlashService;
use App\Setting;
use DaveJamesMiller\Breadcrumbs\Facades\Breadcrumbs;
use Illuminate\Http\Request;

class ConfigController extends Controller
{
    /**
     * Constructor.
     */
    public function __construct()
    {
        $this->middleware(['permission:configs-manage']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $configs = Setting::where('type', 'config')->get();

        $common_data['active_trail'] = 'admin';
        $common_data['header'] = [
            'title' => trans('app.configuration'),
            'breadcrumb' => Breadcrumbs::generate('config.index'),
            'theme' => 'colored-background',
        ];
        $common_data['flashs'] = FlashService::getMessages();

        return view('admin.config.index',compact('configs', 'common_data'));
    }

    /**
     * Store config values.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $datas = $request->all();
        $configs = Setting::where('type', 'config')->get();

        foreach ($configs as $config) {
            if (isset($datas[str_replace('.', '_', $config->key)])) {
                $config->value = $datas[str_replace('.', '_', $config->key)];
                $config->save();
            } else {
                return redirect()->route('config.index')->with('error', trans('messages.error_config-update', ['config' => $config->name]));
            }
        }

        return redirect()->route('config.index')->with('success', trans('config.updated'));
    }
}
