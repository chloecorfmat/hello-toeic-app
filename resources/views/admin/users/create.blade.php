@extends('layouts.app')

@section('content')
    <div class="main-content">
        @if ($errors->any())
            <div>
                <ul class="alert alert-error">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        @if(!$is_admin)
            <p>{{ __('users.add_limitation') }}</p>
        @endif

        <form method="POST" action="{{ route('users.store') }}" enctype="multipart/form-data">
            @csrf

            <div class="field-container">
                <label for="name">{{ __('common.name') }} <span class="required">*</span></label>
                <input type="text" id="name" name="name" aria-describedby="name-description" required>
                <p class="name-description">{{ __('form.name_format') }}</p>
            </div>

            <div class="field-container">
                <label for="matricule">{{ __('common.matricule') }} <span class="required">*</span></label>
                <input type="number" id="matricule" name="matricule" aria-describedby="matricule-description" min="0" max="99999999999" step="1" required>
                <p class="matricule-description">{{ __('form.max-number-numbers_format', ['number' => 11]) }}</p>
            </div>

            <div class="field-container">
                <label for="email">{{ __('common.email') }} <span class="required">*</span></label>
                <input type="email" id="email" name="email" required>
            </div>

            <div class="field-container">
                <label for="course">{{ __('common.course') }}</label>
                <input type="text" id="course" name="course" aria-describedby="course-description">
                <p class="course-description">{{ __('users.course-attribute-example') }}</p>
            </div>

            <div class="field-container">
                <label for="passed">{{ __('common.toeic') }}</label>
                <input type="date" id="passed" name="passed" aria-describedby="passed-description">
                <p class="passed-description">{{ __('users.toeic-attribute-explanation') }}</p>
            </div>

            @if($is_admin)
                <fieldset class="form-radio-el">
                    <legend class="role-legend">{{ __('common.role') }}</legend>
                    <div>
                        <label for="admin">
                            <input type="radio" id="admin"
                                   name="role" value="admin" />
                            <span class="radio-el"></span>
                            {{ __('common.admin') }}
                        </label>
                        <label for="teacher">
                            <input type="radio" id="teacher"
                                   name="role" value="teacher" />
                            <span class="radio-el"></span>
                            {{ __('common.teacher') }}
                        </label>
                        <label for="student">
                            <input type="radio" id="student"
                                   name="role" value="student" />
                            <span class="radio-el"></span>
                            {{ __('common.student') }}
                        </label>
                    </div>
                </fieldset>
            @else
                <input type="hidden" name="role" value="student">
            @endif

            <button type="submit" class="btn btn-primary">
                {{ __('common.validate') }}
            </button>
        </form>
    </div>
@endsection
