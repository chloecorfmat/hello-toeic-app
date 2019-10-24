@extends('layouts.app')

@section('content')
    <div class="main-content">
        {{ Breadcrumbs::render('gdpr.collect-consent') }}

        <h1>{{__('app.gdpr')}}</h1>

        <p>{{ __('gdpr.refuse-consent') }}</p>
        <a href="{{ route('refuseConsent') }}" class="btn btn-inverted">{{ __('common.refuse') }}</a>
        <a href="{{ route('validateConsent') }}" class="btn">{{ __('common.accept') }}</a>

    </div>
@endsection
