@extends('layouts.app')

@section('content')
    <div class="main-content">
        <div class="main-content--header">
            <h1>
                Import users
            </h1>
        </div>

        <form method="POST" action="{{ route('users.storeImport') }}" enctype="multipart/form-data">
            @csrf

            <div class="field-container">
                <label for="file">File <span class="required">*</span></label>
                <input type="file" id="file" name="file" required>
            </div>

            <div class="field-container">
                <label for="suffix_mail">Suffix mail <span class="required">*</span></label>
                <input type="text" id="suffix_mail" name="suffix_mail" placeholder="@enssat.fr" required>
            </div>

            <div class="field-container">
                <label for="role">Rôle <span class="required">*</span></label>
                <select
                        name="role"
                        id="role"
                        required
                        @if (!Auth::user()->hasRole('admin')) disabled @endif
                >
                    <option value="student">Student</option>
                    @role('admin')
                    <option value="teacher">Teacher</option>
                    @endrole
                </select>
            </div>

            <button type="submit" class="btn btn-primary">
                {{ __('Validate') }}
            </button>
        </form>
    </div>
@endsection
