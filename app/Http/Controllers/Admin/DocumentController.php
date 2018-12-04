<?php

namespace App\Http\Controllers\Admin;

use App\Document;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use PhpParser\Comment\Doc;

class DocumentController extends Controller
{
    public function __construct()
    {
        $this->middleware(['permission:document-add'])->only('create', 'store');
        $this->middleware(['permission:document-update'])->only('edit', 'update');
        $this->middleware(['permission:document-list'])->only('index');
        $this->middleware(['permission:document-show'])->only('show');

        // This route are currently not used.
        $this->middleware(['role:admin'])->only('destroy');
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

        return redirect()->route('documents.index')->with('success', 'Document has been created.');
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

        $document->name = $request->get('name');
        $document->type = $request->get('type');

        if (!is_null($request->file('file'))) {
            $path = Storage::disk('public')->put('documents', $request->file('file'));
            $document->url = $path;
        }

        $document->save();

        return redirect()->route('documents.show', ['id' => $id])->with('success', 'Document has been updated.');
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
