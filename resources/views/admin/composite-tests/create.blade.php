@extends('layouts.app')

@section('content')
    <composite-test-create exercises="{{ json_encode($exercises) }}"></composite-test-create>
@endsection
