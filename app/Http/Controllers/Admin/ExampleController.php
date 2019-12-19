<?php

namespace App\Http\Controllers\Admin;

use App\Example;
use App\Http\Controllers\Controller;
use App\Services\FlashService;
use DaveJamesMiller\Breadcrumbs\Facades\Breadcrumbs;
use Illuminate\Http\Request;
use Webpatser\Sanitize\Sanitize;

class ExampleController extends Controller
{
    /**
     * Constructor.
     */
    public function __construct()
    {
        $this->middleware(['permission:examples-manage']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $examples = Example::all();

        $common_data['active_trail'] = 'teacher-exercises';
        $common_data['header'] = [
            'title' => trans('examples.list'),
            'breadcrumb' => Breadcrumbs::generate('exercises.examples.index'),
            'theme' => 'colored-background',
        ];
        $common_data['flashs'] = FlashService::getMessages();

        return view('admin.exercises.examples.index', compact('examples', 'common_data'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $common_data['active_trail'] = 'teacher-exercises';
        $common_data['header'] = [
            'title' => trans('examples.add'),
            'breadcrumb' => Breadcrumbs::generate('exercises.examples.create'),
            'theme' => 'colored-background',
        ];
        $common_data['flashs'] = FlashService::getMessages();

        return view('admin.exercises.examples.create', compact('common_data'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (
            $request->file('image')->getClientMimeType() === 'image/png' ||
            $request->file('image')->getClientMimeType() === 'image/jpeg'
        ) {
            $uid = uniqid();

            $new_file = $uid
                . '_'
                . Sanitize::string($request->get('name'))
                . '.'
                . $request->file('image')->extension();

            rename($request->file('image'), './storage/examples/' . $new_file);
            chmod('./storage/examples/' . $new_file, 0644);

            Example::create([
                'name' => $request->get('name'),
                'image' => './examples/' . $new_file,
            ]);

            return redirect()->route('examples.index')->with('success', trans('examples.added'));
        }


        return redirect()->route('examples.create')->withErrors([trans('form.image-constraints')]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Example  $exerciseExample
     * @return \Illuminate\Http\Response
     */
    public function show(Example $exerciseExample)
    {
        return redirect()->route('examples.index');
    }
}
