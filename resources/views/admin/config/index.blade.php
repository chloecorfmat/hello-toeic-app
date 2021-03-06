@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="main-content">
            <div class="main-content--header">
                {{ Breadcrumbs::render('config.index') }}
                <h1>
                    {{ __('app.configuration') }}
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

            <p>{{ __('config.explanation') }}</p>
            <form method="POST" action="{{ route('config.store') }}">
                    @csrf
                    @foreach ($configs as $key => $config)
                        <div class="field-container">
                            <label class="form-label-text" for="{{ $config->key }}">
                                <span>{{ $config->name }}</span>
                            </label>
                            <input
                                    type="text"
                                    name="{{ $config->key }}"
                                    value="{{ $config->value }}"
                                    id="{{ $config->key }}"
                                    required
                            >
                        </div>
                    @endforeach
                    <div>
                        <button type="submit" class="btn btn-primary">
                            {{ __('common.save') }}
                        </button>
                    </div>
                </form>
        </div>
    </div>
@endsection
