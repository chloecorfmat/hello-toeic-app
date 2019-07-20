<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\RenderService;
use App\Setting;
use Illuminate\Http\Request;

class WordingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $wordings = Setting::where('type', 'wording')->get();

        return view('admin.wordings.index',compact('wordings'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $datas = $request->all();
        $wordings = Setting::where('type', 'wording')->get();

        foreach ($wordings as $wording) {
            if (isset($datas[str_replace('.', '_', $wording->key)])) {
                $wording->value = $datas[str_replace('.', '_', $wording->key)];
                $wording->save();
            } else {
                return redirect()->route('wordings.index')->with('error', 'An error occured on "' . $wording->name .'" update.');
            }
        }

        return redirect()->route('wordings.index')->with('success', (new RenderService())->t('wording.wordings.index.success'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
