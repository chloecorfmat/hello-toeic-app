@extends('layouts.app')

@section('content')
    <div class="main-content">
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
