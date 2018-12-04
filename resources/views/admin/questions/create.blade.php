@extends('layouts.app')

@section('content')
    @php ($index = ['A', 'B', 'C', 'D'])
    <div class="main-content">
        <h1>Ajouter une question</h1>
        @if ($errors->any())
            <div>
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
        <form method="POST" action="{{ route('questions.store') }}">
            @csrf

            <div class="field-container">
                <label for="question">Question <span class="required">*</span></label>
                <input type="text" id="question" name="question" required>
            </div>

            <div class="field-container">
                <label for="version">Version <span class="required">*</span></label>
                <input type="number" id="version" name="version" min="1960" max="2200" required>
            </div>

            <div class="field-container">
                <label for="parts">Parts <span class="required">*</span></label>
                <select name="parts[]" id="parts" multiple required>
                    @foreach ($parts as $part)
                    <option
                            value="{{ $part->id }}"
                    >
                        {{ $part->name }} ({{ $part->version }})
                    </option>
                    @endforeach
                </select>
            </div>

            <div class="field-container">
                <label for="number">Numéro</label>
                <input type="number" id="number" name="number" min="0" max="200">
            </div>

            <div>
                @for ($i = 0; $i < 4; $i++)
                    <div class="field-container">
                        <label for="proposal{{ $index[$i] }}">
                            Proposal {{ $index[$i] }}
                            @if ($i != 3)
                                <span class="required">*</span>
                            @endif
                        </label>

                        <input
                                type="text"
                                name="proposals[]"
                                id="proposal{{ $index[$i] }}"

                                @if ($i != 3)
                                    required
                                @endif
                        >
                    </div>
                @endfor
            </div>

            <div class="field-container">
                <label for="answer">Answer <span class="required">*</span></label>
                <select
                        name="answer"
                        id="answer"
                        required
                >
                    @for ($i = 0; $i < 4; $i++)

                        <option
                                value="{{ $i }}"
                        >
                            Proposal {{ $index[$i] }}
                        </option>
                    @endfor
                </select>
            </div>

            <div class="field-container">
                <label for="documents">Documents</label>
                <select name="documents[]" id="documents" multiple>
                    @foreach ($documents as $document)
                        <option
                                value="{{ $document->id }}"
                        >
                            {{ $document->name }}
                        </option>
                    @endforeach
                </select>
            </div>

            <button type="submit" class="btn btn-primary">
                {{ __('Validate') }}
            </button>
        </form>
    </div>
@endsection
