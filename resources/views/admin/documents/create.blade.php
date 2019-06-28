@extends('layouts.app')

@section('content')
    <div class="main-content">
        {{ Breadcrumbs::render('documents.create') }}
        <h1>Ajouter un document</h1>
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
                <label for="name">Nom <span class="required">*</span></label>
                <input type="text" id="name" name="name" required>
            </div>

            <div class="field-container">
                <label for="type">Type <span class="required">*</span></label>
                <select name="type" id="type" required>
                    <option value="audio">Audio</option>
                    <option value="image">Image</option>
                    <option value="graphic">Graphic</option>
                </select>
            </div>

            <div class="field-container">
                <label for="file">Fichier <span class="required">*</span></label>
                <input type="file" id="file" name="file" required>
            </div>


            <button type="submit" class="btn btn-primary">
                {{ __('Validate') }}
            </button>
        </form>
    </div>
@endsection
