@extends('layouts.app')

@section('content')
    <div class="main-content">
        <form method="POST" action="{{ route('groups.store') }}" enctype="multipart/form-data">
            @csrf

            <div class="field-container">
                <label for="name">{{ __('common.name') }} <span class="required">*</span></label>
                <input type="text" id="name" name="name" required>
            </div>

            <div class="field-container">
                <label for="teacher">{{ __('common.teacher') }} <span class="required">*</span></label>
                <select name="teacher" id="teacher" required>
                    @foreach($teachers as $teacher)
                        <option value="{{ $teacher->id }}">{{ $teacher->name }}</option>
                    @endforeach
                </select>
            </div>

            <div class="field-container">
                <label for="start">{{ __('common.date_start') }} <span class="required">*</span></label>
                <input type="date" id="start" name="start" required>
            </div>

            <div class="field-container">
                <label for="end">{{ __('common.date_end') }} <span class="required">*</span></label>
                <input type="date" id="end" name="end" required>
            </div>

            <div class="field-container">
                <label for="students">{{ __('common.students') }}</label>
                <select name="students[]" id="students" multiple>
                    @foreach($students as $student)
                        <option value="{{ $student->id }}">{{ $student->name }}</option>
                    @endforeach
                </select>
            </div>

            <button type="submit" class="btn btn-primary">
                {{ __('common.validate') }}
            </button>
        </form>
    </div>
@endsection
