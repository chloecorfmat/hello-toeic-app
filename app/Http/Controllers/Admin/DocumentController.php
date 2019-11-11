<?php

namespace App\Http\Controllers\Admin;

use App\Document;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    /**
     * Constructor.
     */
    public function __construct()
    {
        $this->middleware(['permission:exercises-manage']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $datas['documents'] = Document::orderBy('name')->get();
        return view('admin.documents.index', compact('datas'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.documents.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
       // $path = Storage::disk('public')->put('documents', $request->file('file'));

        $extensions = array(
            'image/jpeg' => 'jpeg',
            'text/xml' => 'xml',
            'audio/x-ms-wma' => 'wma',
            'audio/mpeg' => 'mp3',
        );

        $file = $request->file('file');
        $path = Storage::putFileAs('documents', $file, uniqid() . '.' . $extensions[$file->getClientMimeType()]);

        Document::create([
            'name' => $request->get('name'),
            'type' => $request->get('type'),
            'url' => $path,
        ]);

        return redirect()->route('documents.index')->with('success', trans('documents.added'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $datas['document'] = Document::find($id);

        if (is_null($datas['document'])) {
            abort(404);
        }

        return view('admin.documents.show', compact('datas'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $document = Document::find($id);

        if (is_null($document)) {
            abort(404);
        }

        return view('admin.documents.edit', compact('document'));
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
        $document = Document::find($id);

        if (is_null($document)) {
            abort(404);
        }

        $document->name = $request->get('name') ?? "";

        if (!is_null($request->file('file'))) {
            $path = Storage::disk('public')->put('documents', $request->file('file'));
            $document->url = $path;
        }

        if (!is_null($request->get('content'))) {
            $document->content = $request->get('content');
        }

        $document->save();

        return redirect()->route('documents.show', ['id' => $id])->with('success', trans('documents.updated'));
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
