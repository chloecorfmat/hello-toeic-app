@extends('layouts.app')

@section('content')
    @inject('render', 'App\Services\RenderService')
    <div class="container">
        <div class="main-content">
            <div class="main-content--header">
                {{ Breadcrumbs::render('wordings.index') }}
                <h1>
                    {{ $render->t('wording.wordings.index.title') }}
                </h1>
            </div>
            @if ($message = Session::get('success'))
                <div class="alert alert-success">
                    <p>{{ $message }}</p>
                </div>
            @elseif ($message = Session::get('error'))
                <div class="alert alert-error">
                    <p>{{ $message }}</p>
                </div>
            @endif
            <h2>{{ $render->t('wording.wordings.index.explanation') }}</h2>

            <form method="POST" action="{{ route('wordings.store') }}" class="form-wordings">
                    @csrf
                    @foreach ($wordings as $key => $wording)
                        <div class="field-container">
                            <label class="form-label-text" for="{{ $wording->key }}">
                                <span>{{ $wording->key }}</span>
                            </label>
                            <input
                                    type="text"
                                    name="{{ $wording->key }}"
                                    value="{{ $wording->value }}"
                                    id="{{ $wording->key }}"
                                    required
                            >
                            <p>{{ $wording->value }}</p>
                        </div>
                    @endforeach
                    <div>
                        <button type="submit" class="btn btn-primary">
                            {{ __('Save') }}
                        </button>
                    </div>
                </form>
        </div>

    </div>
@endsection
