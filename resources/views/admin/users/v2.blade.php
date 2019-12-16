@extends('layouts.app')

@section('content')
    <div class="main-content">
        <div class="main-content--header">
            <a href="{{ route('users.create') }}" class="main-content--header-actions">
                <i class="fas fa-plus-circle"></i>
            </a>
        </div>
        <base-table current-user-data="{{ $current_user }}" current-page-data="{{ $current_page }}"></base-table>
    </div>
@endsection
