@extends('layouts.app')

@section('content')
    <div class="main-content">
        <nav>
            <ul>
                <li><a href="/teacher/users">Users list</a></li>
                <li><a href="/admin/permissions">Permissions</a></li>
                <li><a href="/admin/wordings">Translations</a></li>
                <li><a href="/admin/config">Configuration & feature flipping</a></li>
            </ul>
        </nav>
    </div>
@endsection
