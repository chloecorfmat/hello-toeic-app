@extends('layouts.app')

@section('content')
    <div class="main-content">
        {{ Breadcrumbs::render('groups.assign') }}
        <h1>Assign students in groups</h1>
        @if ($errors->any())
            <div>
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
        <form method="POST" action="{{ route('groups.storeAssign') }}" enctype="multipart/form-data">
            @csrf

            <div class="field-container">
                <label for="data">Data <span class="required">*</span></label>
                <input type="file" id="data" name="data" required>
            </div>


            <button type="submit" class="btn btn-primary">
                {{ __('Validate') }}
            </button>
        </form>
    </div>
@endsection
