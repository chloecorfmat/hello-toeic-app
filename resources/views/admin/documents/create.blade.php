@extends('layouts.app')

@section('content')
    <div class="main-content">
        @if ($errors->any())
            <div>
                <ul class="alert alert-error">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
        <form method="POST" action="{{ route('documents.store') }}" enctype="multipart/form-data">
            @csrf

            <div class="field-container">
                <label for="name">{{ __('common.name') }} <span class="required">*</span></label>
                <input type="text" id="name" name="name" required>
            </div>

            <div class="field-container">
                <label for="type">{{ __('common.type') }} <span class="required">*</span></label>
                <select name="type" id="type" required>
                    <option value="audio">{{ __('common.audio') }}</option>
                    <option value="image">{{ __('common.image') }}</option>
                    <option value="graphic">{{ __('common.graphic') }}</option>
                </select>
            </div>

            <div class="field-container">
                <label for="file">{{ __('common.file') }} <span class="required">*</span></label>
                <input type="file" id="file" name="file" required>
            </div>


            <button type="submit" class="btn btn-primary">
                {{ __('common.validate') }}
            </button>
        </form>
    </div>
@endsection
