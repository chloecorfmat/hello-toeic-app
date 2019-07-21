@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="main-content list-tests">

            <div class="main-content--header">
                {{ Breadcrumbs::render('feature-flipping.index') }}

                <h1>
                    {{ __('app.feature-flipping') }}
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

            <p>{{ __('feature-flipping.explanation') }}</p>
            <form method="POST" action="{{ route('feature-flipping.store') }}">
                    @csrf
                    @foreach ($features as $key => $feature)
                        <fieldset class="feature">
                            <span class="form-label-text">
                                <span>{{ $feature->name }}</span>
                            </span>
                            <input
                                    type="checkbox"
                                    name="{{ $feature->key }}"
                                    value="true"
                                    id="{{ $feature->key }}"
                                    @if($feature->value === "true")
                                    checked
                                    @endif
                            >
                        </fieldset>
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
