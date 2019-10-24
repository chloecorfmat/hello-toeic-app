@extends('layouts.app')

@section('content')
    <div class="main-content">
        {{ Breadcrumbs::render('gdpr.collect-consent') }}

        <h1>{{__('gdpr.collect-consent')}}</h1>

        <div>
            <div>
                <p>{{ __('gdpr.refuse consent') }}</p>
                <a href="{{ route('refuse-consent') }}">Je refuse</a>
            </div>

            <a href="{{ route('validate-consent') }}">J'accepte</a>
        </div>

    </div>
@endsection
