<?php

namespace App\Http\Controllers\Admin;

use App\Explanation;
use DaveJamesMiller\Breadcrumbs\Facades\Breadcrumbs;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ExplanationController extends Controller
{
    /**
     * Constructor.
     */
    public function __construct()
    {
        $this->middleware(['permission:explanations-manage']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $explanations = Explanation::orderBy('title')->get();

        $common_data['active_trail'] = 'teacher-exercises';
        $common_data['header'] = [
            'title' => trans('explanations.list'),
            'breadcrumb' => Breadcrumbs::generate('explanations.index'),
            'theme' => 'colored-background',
        ];

        return view('admin.explanations.index', compact('explanations', 'common_data'));
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
            'title' => trans('explanations.add'),
            'breadcrumb' => Breadcrumbs::generate('explanations.create'),
            'theme' => 'colored-background',
        ];

        return view('admin.explanations.create', compact('common_data'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Explanation::create([
            'title' => $request->get('title'),
            'explanation' => $request->get('explanation'),
        ]);

        return redirect()->route('explanations.index')->with('success', trans('explanations.added'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $explanation = Explanation::find($id);

        if (is_null($explanation)) {
            abort(404);
        }

        $common_data['active_trail'] = 'teacher-exercises';
        $common_data['header'] = [
            'title' => trans('common.details') . ': ' . $explanation->title,
            'breadcrumb' => Breadcrumbs::generate('explanations.show', $explanation),
            'theme' => 'colored-background',
        ];

        return view('admin.explanations.show', compact('explanation', 'common_data'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $explanation = Explanation::find($id);

        if (is_null($explanation)) {
            abort(404);
        }

        $common_data['active_trail'] = 'teacher-exercises';
        $common_data['header'] = [
            'title' => trans('common.edit') . ': ' . $explanation->title,
            'breadcrumb' => Breadcrumbs::generate('explanations.edit', $explanation),
            'theme' => 'colored-background',
        ];

        return view('admin.explanations.edit', compact('explanation', 'common_data'));
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
        $explanation = Explanation::find($id);

        if (is_null($explanation)) {
            abort(404);
        }

        $explanation->title = $request->get('title');
        $explanation->explanation = $request->get('explanation');

        $explanation->save();

        return redirect()->route('explanations.index')->with('success', trans('explanations.updated'));
    }

    /**
     * Display a confirmation form before destroy model.
     *
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $explanation = Explanation::find($id);

        if (is_null($explanation)) {
            abort(404);
        }

        $common_data['active_trail'] = 'teacher-exercises';
        $common_data['header'] = [
            'title' => trans('common.delete') . ': ' . $explanation->title,
            'breadcrumb' => Breadcrumbs::generate('explanations.delete', $explanation),
            'theme' => 'colored-background',
        ];

        return view('admin.explanations.delete', compact('explanation', 'common_data'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $explanation = Explanation::find($id);

        if (is_null($explanation)) {
            abort(404);
        }

        $count = $explanation->questions()->count();

        if ($count == 0) {
            $explanation->delete();
            return redirect()->route('explanations.index')->with('success', trans('explanations.deleted'));
        }

        return redirect()->route('explanations.index')->with('error', trans('explanations.questions_constraint'));
    }
}
