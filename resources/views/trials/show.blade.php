@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>Correction</h1>
        <p><span>{{ $datas['trial']->user->firstname }} {{ $datas['trial']->user->lastname }}</span>, le <span>{{ date('d/m/Y à H:i', strtotime($datas['trial']->datetime)) }}</span></p>
        <p>Score : <span>{{ $datas['trial']->score }}/1000</span></p>

        <div>
            <ol>
                @foreach ($datas['trial']->corrections as $key => $correction)
                    <li> {{-- State in class --}}
                        ({{ $correction->question->number }}) {{ $correction->question->question }}
                        <ul>
                            @foreach ($correction->question->proposals as $k => $proposal)
                                <li>
                                    {{ $proposal->value }}
                                    @if ($proposal->id === $correction->question->answer->id)
                                        -> Good answer
                                    @endif

                                    @if ($proposal->id === $correction->proposal->id)
                                        -> User answer
                                    @endif
                                </li>
                            @endforeach
                        </ul>
                    </li>
                @endforeach
            </ol>
        </div>

        <a href="{{ route('profile') }}">Retour</a>
    </div>
@endsection
