@extends('layouts.app')

@section('content')
    <div class="main-content">
        <form method="POST" action="{{ route('examples.store') }}" enctype="multipart/form-data">
            @csrf

            <div class="field-container">
                <label for="name">{{ __('common.name') }} <span class="required">*</span></label>
                <input type="text" id="name" name="name" required>
            </div>

            <div class="field-container">
                <label for="image">{{ __('common.image') }} <span class="required">*</span></label>
                <input type="file" id="image" name="image" required>
            </div>

            <button type="submit" class="btn btn-primary">
                {{ __('common.validate') }}
            </button>
        </form>
    </div>
@endsection
