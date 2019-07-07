@extends('layouts.app')

@section('content')
    <div class="main-content">
        {{ Breadcrumbs::render('documents.edit', $document) }}
        <h1>Modifier le document</h1>
        @if ($errors->any())
            <div>
                <ul class="alert alert-error">
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
                <label for="name">Nom</label>
                <input type="text" id="name" name="name" value="{{ $document->name }}">
            </div>

            <div class="field-container">
                <label for="type">Type <span class="required">*</span></label>
                <select name="type" id="type" required disabled>
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
                            value="text"
                            @if ($document->type == 'text')
                                selected
                            @endif
                    >Text</option>
                </select>
                <p>Ce champ ne peut pas être modifié.</p>
            </div>

            @if ($document->type != 'text')
            <div class="field-container">
                <label for="file">Fichier</label>
                <input type="file" id="file" name="file">
                <div class="file--preview">
                    @if ($document->type == 'image')
                    <img src="{{ url('storage/'.$document->url) }}"/>
                    @endif
                    <p>{{ $document->url }}</p>
                </div>
            </div>
            @else
                <div class="field-container">
                    <textarea name="content" id="content" cols="30" rows="10" aria-describedby="content-description">{{ $document->content }}</textarea>
                    <p id="content-description">Attention à la structure du texte dans le cas d'un affichage inline (avec liste déroulante).</p>
                </div>
            @endif


            <button type="submit" class="btn btn-primary">
                {{ __('Validate') }}
            </button>
        </form>
    </div>
@endsection
