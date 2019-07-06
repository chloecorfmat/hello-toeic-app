@extends('layouts.app')

@section('content')
    <div class="main-content">
        {{ Breadcrumbs::render('users.edit', $user) }}
        <h1>Modifier un utilisateur : {{ $user->name }}</h1>
        @if ($errors->any())
            <div>
                <ul class="alert alert-error">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        @if ($message = Session::get('success'))
            <div class="alert alert-success">
                <p>{{ $message }}</p>
            </div>
        @elseif ($message = Session::get('warning'))
            <div class="alert alert-warning">
                {!! html_entity_decode($message) !!}
            </div>
        @elseif ($message = Session::get('error'))
            <div class="alert alert-error">
                <p>{{ $message }}</p>
            </div>
        @endif

        <form method="POST" action="{{ route('users.update', ['id' => $user->id]) }}" enctype="multipart/form-data">
            @csrf
            {{ method_field('PUT')}}

            <div class="field-container">
                <label for="name">Nom <span class="required">*</span></label>
                <input
                        type="text"
                        id="name"
                        name="name"
                        aria-describedby="name-description"
                        value="{{ $user->name }}"
                        required
                >
                <p class="name-description">Format : LASTNAME Firstname</p>
            </div>

            <div class="field-container">
                <label for="matricule">Matricule <span class="required">*</span></label>
                <input
                        type="number"
                        id="matricule"
                        name="matricule"
                        aria-describedby="matricule-description"
                        min="0"
                        max="99999999999"
                        step="1"
                        value="{{ $user->matricule }}"
                        required
                >
                <p class="matricule-description">11 numbers maximum</p>
            </div>

            <div class="field-container">
                <label for="email">E-mail <span class="required">*</span></label>
                <input
                        type="email"
                        id="email"
                        name="email"
                        value="{{ $user->email }}"
                        required
                >
            </div>

            <div class="field-container">
                <label for="course">Course</label>
                <input
                       type="text"
                       id="course"
                       name="course"
                       aria-describedby="course-description"
                       value="{{ $user->course }}"
                >
                <p class="course-description">Example: IMR2019</p>
            </div>

            <div class="field-container">
                <label for="passed">Toeic success ?</label>
                <input
                        type="date"
                        id="passed"
                        name="passed"
                        aria-describedby="passed-description"
                        value="{{ $user->passed }}"
                >
                <p class="passed-description">Date of CLES or TOEIC success</p>
            </div>

            @if ($is_student)
                <div class="field-container">
                    <label for="groups">Groups</label>
                    <select id="groups" name="groups[]" multiple="">
                        <option></option>
                        @foreach ($groups as $group)
                            <option
                                    value="{{ $group->id }}"
                                    @if (in_array($group->id, $current_groups))
                                        selected
                                    @endif
                            >
                                {{ $group->name }}
                            </option>
                        @endforeach
                    </select>
                </div>
            @endif

            <button type="submit" class="btn btn-primary">
                {{ __('Validate') }}
            </button>
        </form>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const choices = new Choices('#groups', {
                removeItemButton: true,
                searchChoices: true,
            });
        });
    </script>
@endsection
