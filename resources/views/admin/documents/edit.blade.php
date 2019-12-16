@extends('layouts.app')

@section('content')
    <div class="main-content">
        <form method="POST" action="{{ route('documents.update', ['id' => $document->id]) }}" enctype="multipart/form-data">
            @csrf
            {{ method_field('PUT')}}

            <div class="field-container">
                <label for="name">{{ __('common.name') }}</label>
                <input type="text" id="name" name="name" value="{{ $document->name }}">
            </div>

            <div class="field-container">
                <label for="type">{{ __('common.type') }} <span class="required">*</span></label>
                <select name="type" id="type" required disabled>
                    <option
                            value="audio"

                            @if ($document->type == 'audio')
                                selected
                            @endif
                    >{{ __('common.audio') }}</option>
                    <option
                            value="image"
                            @if ($document->type == 'image')
                                selected
                            @endif
                    >{{ __('common.image') }}</option>
                    <option
                            value="text"
                            @if ($document->type == 'text')
                                selected
                            @endif
                    >{{ __('common.text') }}</option>
                </select>
                <p>{{ __('form.no-edit') }}</p>
            </div>

            @if ($document->type != 'text')
            <div class="field-container">
                <label for="file">{{ __('common.file') }}</label>
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
                    <p id="content-description">{{ __('documents.text_warning') }}</p>
                </div>
            @endif


            <button type="submit" class="btn btn-primary">
                {{ __('common.validate') }}
            </button>
        </form>
    </div>
@endsection
