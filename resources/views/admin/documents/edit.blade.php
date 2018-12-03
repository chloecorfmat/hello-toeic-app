@extends('layouts.app')

@section('content')
    <div class="main-content">
        <h1>Modifier le document</h1>
        @if ($errors->any())
            <div>
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
        <form method="POST" action="{{ route('documents.update', ['id' => $document->id]) }}" enctype="multipart/form-data">
            @csrf
            {{ method_field('PUT')}}

            <div class="field-container">
                <label for="name">Nom <span class="required">*</span></label>
                <input type="text" id="name" name="name" value="{{ $document->name }}" required>
            </div>

            <div class="field-container">
                <label for="type">Type <span class="required">*</span></label>
                <select name="type" id="type" required>
                    <option
                            value="audio"

                            @if ($document->type == 'audio')
                                selected
                            @endif
                    >Audio</option>
                    <option
                            value="image"
                            @if ($document->type == 'image')
                                selected
                            @endif
                    >Image</option>
                    <option
                            value="graphic"
                            @if ($document->type == 'graphic')
                                selected
                            @endif
                    >Graphic</option>
                </select>
            </div>

            <div class="field-container">
                <label for="file">Fichier</label>
                <input type="file" id="file" name="file">
                <div class="file--preview">
                    <img src="{{ url('storage/'.$document->url) }}"/>
                    <p>{{ $document->url }}</p>
                </div>
            </div>


            <button type="submit" class="btn btn-primary">
                {{ __('Validate') }}
            </button>
        </form>
    </div>
@endsection
