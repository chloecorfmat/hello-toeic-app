@extends('layouts.app')

@section('content')
    <div class="main-content">
        {{ Breadcrumbs::render('explanations.create') }}
        <h1>Ajouter une explication</h1>
        @if ($errors->any())
            <div>
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
        <form method="POST" action="{{ route('explanations.store') }}" enctype="multipart/form-data">
            @csrf

            <div class="field-container">
                <label for="title">Title <span class="required">*</span></label>
                <input type="text" id="title" name="title" required>
            </div>

            <div class="field-container">
                <label for="explanation">Explanation <span class="required">*</span></label>
                <textarea id="explanation" name="explanation" required></textarea>
            </div>

            <button type="submit" class="btn btn-primary">
                {{ __('Validate') }}
            </button>
        </form>
    </div>
@endsection
