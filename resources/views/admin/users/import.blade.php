@extends('layouts.app')

@section('content')
    <div class="main-content">
        <form method="POST" action="{{ route('users.storeImport') }}" enctype="multipart/form-data">
            @csrf

            <div class="field-container">
                <label for="file">{{ __('common.file') }} <span class="required">*</span></label>
                <input type="file" id="file" name="file" required>
            </div>

            <div class="field-container">
                <label for="suffix_mail">{{ __('common.email_suffix') }} <span class="required">*</span></label>
                <input type="text" id="suffix_mail" name="suffix_mail" placeholder="@enssat.fr" aria-describedby="suffix-description" required>
                <p id="suffix-description">{{ __('users.import_email_suffix_explanation') }}</p>
            </div>

            @role('admin')
            <div class="field-container">
                <label for="role">{{ __('common.role') }} <span class="required">*</span></label>
                <select
                        name="role"
                        id="role"
                        required
                >
                    <option value="student">{{ __('common.student') }}</option>

                    <option value="teacher">{{ __('common.teacher') }}</option>
                </select>
            </div>
            @endrole

            @role('teacher')
            <input type="hidden" name="role" value="student">
            @endrole

            <button type="submit" class="btn btn-primary">
                {{ __('common.validate') }}
            </button>
        </form>
    </div>
@endsection
