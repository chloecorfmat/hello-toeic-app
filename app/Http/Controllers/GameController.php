<?php

namespace App\Http\Controllers;

use App\Game;
use App\Proposal;
use App\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;

class GameController extends Controller
{
    public function __construct()
    {
        $this->middleware(['permission:game-execute'])->only('play', 'continue');
        $this->middleware(['permission:game-list'])->only('index');
    }

    public function index() {
        $user = \Auth::user();

        if ($user->hasPermissionTo('dashboard-students-see')) {
            $games = Game::orderBy('datetime', 'DESC')
                ->get();
        } else {
            // Get all tests passed.
            $games = Game::where('user_id', '=', $user->id)
                ->orderBy('datetime', 'DESC')
                ->get();
        }

        $datas = [
            'user' => $user,
            'games' => $games,
        ];

        return view('games.index', compact('datas'));
    }

    /**
     * Play games
     *
     * @return \Illuminate\Http\Response
     */
    public function play()
    {
        if (is_null(Cookie::get('game_score'))) {
            Cookie::queue(Cookie::make('game_score', 0));
        }

        if (is_null(Cookie::get('game_questions'))) {
            Cookie::queue(Cookie::make('game_questions', serialize([])));
        }

        $question = Question::whereHas('parts', function($q) {
            $q->whereIn('part_id', [6]);
        });

        if (!empty(unserialize(Cookie::get('game_questions')))) {
            $question = $question->whereNotIn('id', unserialize(Cookie::get('game_questions')));
        }

        $question = $question->get();

        if ($question->count() != 0) {
            $question = $question->random(1)[0];

            $datas['question'] = $question;

            return view('games.play', compact('datas'));
        }

        $score = Cookie::get('game_score');

        Game::create([
            'score' => $score,
            'datetime' => now(),
            'user_id' => \Auth()->user()->id,
            'error_id' => null,
        ]);

        Cookie::queue(Cookie::forget('game_score'));
        Cookie::queue(Cookie::forget('game_questions'));

        return redirect()->route('games')->with('success', 'You get ' . $score . ' points and you complete all available questions.');
    }

    public function continue(Request $request) {
        $question = Question::find($request->get('question_id'));
        $score = $request->cookie('game_score');

        if ($question->answer->id == $request->get('question_answer')) {
            Cookie::queue('game_score', $score+5);

            $questions = unserialize($request->cookie('game_questions'));
            $questions[] = $question->id;
            Cookie::queue('game_questions', serialize($questions));

            return redirect()->route('games.play');
        }

        Game::create([
            'score' => $score,
            'datetime' => now(),
            'user_id' => \Auth()->user()->id,
            'error_id' => $request->get('question_id'),
        ]);

        $user_answer = '(No answer submitted)';

        if (!empty($request->get('question_answer'))) {
            $user_answer = Proposal::find($request->get('question_answer'))->value;
        }


        Cookie::queue(Cookie::forget('game_score'));
        Cookie::queue(Cookie::forget('game_questions'));
        return redirect()->route('games')->with('success',
            '<p>You get ' . $score . ' points.</p><br />' .
            '<div class="alert-answer">' .
                '<p class="important">Last question: </p>' .
                '<p>' . $question->question . '</p>' .
                '<p><span class="introducing">Your (false) answer:</span> ' . $user_answer . '</p>' .
            '</div>'
        );
    }
}
