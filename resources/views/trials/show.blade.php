@extends('layouts.app')

@section('content')
    @php ($index = ['A', 'B', 'C', 'D'])

    <div class="main-content">
        <h1>Correction</h1>
        <p><span>{{ $datas['trial']->user->firstname }} {{ $datas['trial']->user->lastname }}</span>, le <span>{{ date('d/m/Y à H:i', strtotime($datas['trial']->datetime)) }}</span></p>
        <p>Score : <span>{{ $datas['trial']->score }}</span></p>

        <div>
            <ol>
                @foreach ($datas['trial']->corrections as $key => $correction)
                    <li class="block-question"> {{-- State in class --}}
                        <p class="question-legend">({{ $correction->question->number }}) {{ $correction->question->question }}</p>
                        <ul>
                            @foreach ($correction->question->proposals as $k => $proposal)
                                @php ($class = '')
                                @if ($proposal->id === $correction->question->answer->id)
                                    @php($class .= 'answer-real ')
                                @endif

                                @if (isset($correction->proposal) and $proposal->id === $correction->proposal->id)
                                    @php($class .= 'answer-user')
                                @endif

                                <li
                                    @isset($class)
                                        class="{{$class}}"
                                    @endisset
                                >
                                    {{ $index[$k] }}. {{ $proposal->value }}
                                </li>
                            @endforeach
                        </ul>
                    </li>
                @endforeach
            </ol>
        </div>

        <a href="{{ route('profile') }}" class="btn">Retour</a>
    </div>
@endsection
