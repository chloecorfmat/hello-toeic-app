@extends('layouts.app')

@section('content')
    <div class="main-content">
        {{ Breadcrumbs::render('groups.import') }}
        <h1>{{ __('groups.import_title') }}</h1>
        @if ($errors->any())
            <div>
                <ul class="alert alert-error">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
        <p>{{ __('groups.import_explanation') }}</p>
        <form method="POST" action="{{ route('groups.storeImport') }}" enctype="multipart/form-data">
            @csrf

            <div class="field-container">
                <label for="data">{{ __('common.file') }} <span class="required">*</span></label>
                <input type="file" id="data" name="data" required>
            </div>


            <button type="submit" class="btn btn-primary">
                {{ __('common.validate') }}
            </button>
        </form>
    </div>
@endsection
