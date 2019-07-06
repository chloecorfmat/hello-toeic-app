@extends('layouts.app')

@section('content')
    <div class="main-content">
        {{ Breadcrumbs::render('users.create') }}
        <h1>Ajouter un utilisateur</h1>
        @if ($errors->any())
            <div>
                <ul class="alert alert-error">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
        <form method="POST" action="{{ route('users.store') }}" enctype="multipart/form-data">
            @csrf

            <div class="field-container">
                <label for="name">Nom <span class="required">*</span></label>
                <input type="text" id="name" name="name" aria-describedby="name-description" required>
                <p class="name-description">Format : LASTNAME Firstname</p>
            </div>

            <div class="field-container">
                <label for="matricule">Matricule <span class="required">*</span></label>
                <input type="number" id="matricule" name="matricule" aria-describedby="matricule-description" min="0" max="99999999999" step="1" required>
                <p class="matricule-description">11 numbers maximum</p>
            </div>

            <div class="field-container">
                <label for="email">E-mail <span class="required">*</span></label>
                <input type="email" id="email" name="email" required>
            </div>

            <div class="field-container">
                <label for="course">Course</label>
                <input type="text" id="course" name="course" aria-describedby="course-description">
                <p class="course-description">Example: IMR2019</p>
            </div>

            <div class="field-container">
                <label for="passed">Toeic success ?</label>
                <input type="date" id="passed" name="passed" aria-describedby="passed-description">
                <p class="passed-description">Date of CLES or TOEIC success</p>
            </div>

            @if($is_admin)
                <fieldset class="form-radio-el">
                    <legend class="role-legend">Role</legend>
                    <div>
                        <label for="admin">
                            <input type="radio" id="admin"
                                   name="role" value="admin" />
                            <span class="radio-el"></span>
                            Admin
                        </label>
                        <label for="teacher">
                            <input type="radio" id="teacher"
                                   name="role" value="teacher" />
                            <span class="radio-el"></span>
                            Teacher
                        </label>
                        <label for="student">
                            <input type="radio" id="student"
                                   name="role" value="student" />
                            <span class="radio-el"></span>
                            Student
                        </label>
                    </div>
                </fieldset>
            @else
                <input type="hidden" name="role" value="student">
            @endif

            <button type="submit" class="btn btn-primary">
                {{ __('Validate') }}
            </button>
        </form>
    </div>
@endsection
