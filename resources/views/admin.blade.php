@extends('layouts.app')

@section('content')
    <div class="main-content">
        <h1>Admin menu</h1>
        <nav>
            <ul>
                <li><a href="/teacher/users">Users list</a></li>
                <li><a href="/admin/permissions">Permissions</a></li>
                <li><a href="/admin/feature-flipping">Feature flipping</a></li>
                <li><a href="/admin/wordings">Translations</a></li>
                <li><a href="/admin/config">Configuration</a></li>
            </ul>
        </nav>
    </div>
@endsection
