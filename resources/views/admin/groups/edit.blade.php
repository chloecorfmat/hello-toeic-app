@extends('layouts.app')

@section('content')
    <div class="main-content">
        <form method="POST" action="{{ route('groups.update', ['id' => $group->id]) }}" enctype="multipart/form-data">
            @csrf
            {{ method_field('PUT')}}

            <div class="field-container">
                <label for="name">{{ __('common.name') }} <span class="required">*</span></label>
                <input type="text" id="name" name="name" value="{{ $group->name }}" required>
            </div>

            <div class="field-container">
                <label for="teacher">{{ __('common.teacher') }} <span class="required">*</span></label>
                <select name="teacher" id="teacher" required>
                    @foreach($teachers as $teacher)
                        <option
                                value="{{ $teacher->id }}"
                                @if ($group->teacher === $teacher->id) selected @endif
                        >
                            {{ $teacher->name }}
                        </option>

                    @endforeach
                </select>
            </div>

            <div class="field-container">
                <label for="start">{{ __('common.date_start') }} <span class="required">*</span></label>
                <input type="date" id="start" name="start" value="{{ $group->start_date }}" required>
            </div>

            <div class="field-container">
                <label for="end">{{ __('common.date_end') }} <span class="required">*</span></label>
                <input type="date" id="end" name="end" value="{{ $group->end_date }}" required>
            </div>

            <button type="submit" class="btn btn-primary">
                {{ __('common.validate') }}
            </button>
        </form>
    </div>
@endsection
