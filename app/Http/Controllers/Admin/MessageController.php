<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Message;
use App\Services\FlashService;
use DaveJamesMiller\Breadcrumbs\Facades\Breadcrumbs;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function __construct()
    {
        $this->middleware(['role:teacher|admin']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $roles = \Auth::user()->roles()->pluck('id')->toArray();
        $messages = Message::whereIn('to', $roles)
            ->orderBy('datetime', 'desc')
            ->get();

        $common_data['active_trail'] = 'teacher-users';
        $common_data['header'] = [
            'title' => trans('messages.list'),
            'breadcrumb' => Breadcrumbs::generate('messages.index'),
            'theme' => 'colored-background',
        ];
        $common_data['flashs'] = FlashService::getMessages();

        return view(
            'admin.messages.index',
            compact(
                'messages',
                'common_data'
            )
        );
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
        //
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

    public function handle(Request $request, $id) {
        $message = Message::find($id);

        if (!$message->status) {
            $message->status = 1;
            $message->handle_by = \Auth::user()->id;
            $message->save();

            return redirect()->route('messages.index')->with('success', trans('messages.handled'));
        }

        return redirect()->route('messages.index');
    }
}
