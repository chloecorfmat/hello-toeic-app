@extends('layouts.app')

@section('content')
    <div class="main-content list-tests">
        @if ($message = Session::get('success'))
            <div class="alert alert-success">
                <p>{{ $message }}</p>
            </div>
        @elseif ($message = Session::get('error'))
            <div class="alert alert-error">
                <p>{{ $message }}</p>
            </div>
        @endif

        <div class="table" id="messages">
            <div class="table--filters">
                <div class="field-container">
                    <label for="search">{{ __('common.search') }}</label>
                    <input type="text" id="search" name="search" class="search">
                </div>
            </div>
            <div class="table-container is-visible">
                <table>
                    <caption class="sr-only">{{ __('messages.list') }}</caption>
                    <thead>
                    <tr>
                        <th scope="col">
                            <button class="sort" data-sort="datetime">
                                {{ __('common.datetime') }} <i class="fas fa-arrows-alt-v"></i>
                            </button>
                        </th>
                        <th scope="col">
                            <button class="sort" data-sort="subject">
                                {{ __('common.subject') }} <i class="fas fa-arrows-alt-v"></i>
                            </button>
                        </th>
                        <th scope="col">
                            <button class="sort" data-sort="from">
                                {{ __('common.from') }} <i class="fas fa-arrows-alt-v"></i>
                            </button>
                        </th>
                        <th scope="col">
                            <button class="sort" data-sort="status">
                                {{ __('messages.handle_by') }} <i class="fas fa-arrows-alt-v"></i>
                            </button>
                        </th>
                    </tr>
                    </thead>
                    <tbody class="list">
                    @foreach ($messages as $key => $message)
                        <tr>
                            <td class="datetime">{{ $message->datetime }}</td>
                            <td class="subject">{{ $message->subject }}</td>
                            <td class="from">{{ $message->from()->first()->name }}</td>
                            <td class="status">
                                @if ($message->status)
                                    {{ $message->handle_by()->first()->name }}
                                @else
                                    <a class="tag" href="{{ route('messages.handle', [$message->id]) }}">Handle the message</a>
                                @endif
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>

            <div class="container-pagination">
                <button class="btn-pagination" id="js-pagination-prev">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <ul class="pagination"></ul>
                <button class="btn-pagination" id="js-pagination-next">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>

        <div class="container-empty-search" id="js-empty-search" aria-hidden="true">
            <p class="emphasis">{{ __('common.no-result') }}</p>
        </div>
    </div>
@endsection
