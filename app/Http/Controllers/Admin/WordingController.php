<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\RenderService;
use Illuminate\Http\Request;
use Spatie\TranslationLoader\LanguageLine;

class WordingController extends Controller
{
    /**
     * Constructor.
     */
    public function __construct()
    {
        $this->middleware(['permission:translations-manage']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $wordings = LanguageLine::orderBy('group', 'asc')
            ->orderBy('key', 'asc')
            ->get();

        $common_data['active_trail'] = 'admin';

        return view('admin.wordings.index',compact('wordings', 'common_data'));
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
        $wordings = LanguageLine::all();

        foreach ($wordings as $wording) {
            $fr = $datas[$wording->group . '_' . $wording->key . '_fr'];
            $en = $datas[$wording->group . '_' . $wording->key . '_en'];

            if (!is_null($en) && !is_null($fr)) {
                $wording->text = [
                    'en' => $en,
                    'fr' => $fr,
                ];
                $wording->save();
            } else {
                return redirect()->route('wordings.index')->with('error', trans('messages.error_config-update', ['config' => $wording->group . '_' . $wording->key]));
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
