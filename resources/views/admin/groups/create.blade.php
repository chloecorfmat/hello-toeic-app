@extends('layouts.app')

@section('content')
    <div class="main-content">
        {{ Breadcrumbs::render('groups.create') }}
        <h1>Créer un groupe</h1>
        @if ($errors->any())
            <div>
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
        <form method="POST" action="{{ route('groups.store') }}" enctype="multipart/form-data">
            @csrf

            <div class="field-container">
                <label for="name">Name <span class="required">*</span></label>
                <input type="text" id="name" name="name" required>
            </div>

            <div class="field-container">
                <label for="teacher">Teacher <span class="required">*</span></label>
                <select name="teacher" id="teacher" required>
                    @foreach($teachers as $teacher)
                        <option value="{{ $teacher->id }}">{{ $teacher->name }}</option>
                    @endforeach
                </select>
            </div>

            <div class="field-container">
                <label for="start">Start date <span class="required">*</span></label>
                <input type="date" id="start" name="start" required>
            </div>

            <div class="field-container">
                <label for="end">End date <span class="required">*</span></label>
                <input type="date" id="end" name="end" required>
            </div>

            <div class="field-container">
                <label for="students">Students <span class="required">*</span></label>
                <select name="students[]" id="students" required multiple>
                    @foreach($students as $student)
                        <option value="{{ $student->id }}">{{ $student->name }}</option>
                    @endforeach
                </select>
            </div>

            <button type="submit" class="btn btn-primary">
                {{ __('Validate') }}
            </button>
        </form>
    </div>
@endsection
