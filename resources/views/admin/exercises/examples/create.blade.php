@extends('layouts.app')

@section('content')
    <div class="main-content">
        {{ Breadcrumbs::render('exercises.examples.create') }}
        <h1>
            {{ __('examples.add') }}
        </h1>
        @if ($errors->any())
            <div>
                <ul class="alert alert-error">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
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
