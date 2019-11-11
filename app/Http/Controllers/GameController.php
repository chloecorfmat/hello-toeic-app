<?php

namespace App\Http\Controllers;

use App\Badge;
use App\BadgeType;
use App\Game;
use App\Proposal;
use App\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;

class GameController extends Controller
{
    /**
     * Constructor.
     */
    public function __construct()
    {
        $this->middleware(['permission:games-achieve']);
    }

    public function index() {
        $user = \Auth::user();

        $games = Game::where('user_id', '=', $user->id)
            ->orderBy('datetime', 'DESC')
            ->get();

        $games_data = $games;

        $i = 1;
        $axisX = [];
        $axisY = [];
        /**foreach(array_reverse($games->all()) as $game) {
            $axisX[] = $i++;
            $axisY[] = $game->score;
        }**/

        // Best scores.
        $best_scores = Game::orderBy('score', 'DESC')
            ->limit(10)
            ->get();

        $datas = [
            'user' => $user,
            'games' => $games_data,
            'axisX' => implode(', ', $axisX),
            'axisY' => json_encode($axisY),
        ];

        return view('games.index', compact('datas', 'best_scores'));
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
            $q->where('parts.name', 'like', '%Part 5%');
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

        $game = Game::create([
            'score' => $score,
            'datetime' => now(),
            'user_id' => \Auth()->user()->id,
            'error_id' => null,
        ]);

        Cookie::queue(Cookie::forget('game_score'));
        Cookie::queue(Cookie::forget('game_questions'));

        $this->comeXTimesInChallengeTop($game->id);

        return redirect()->route('games')
            ->with('success', trans('messages.get-x-points', ['number' => $score]) . ' ' . trans('games.messages_complete-all-questions'));
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

        $game = Game::create([
            'score' => $score,
            'datetime' => now(),
            'user_id' => \Auth()->user()->id,
            'error_id' => $request->get('question_id'),
        ]);

        $user_answer = '(' . trans('common.no-answer-submitted') . ')';

        if (!empty($request->get('question_answer'))) {
            $answers = Proposal::where('question_id', $question->id)->get();
            $other_answers = "";

            foreach ($answers as $answer) {
                if ($answer->id == $request->get('question_answer')) {
                    $user_answer = $answer->value;
                } else {
                    $temp = '<li class="list-item">' . $answer->value . '</li>';
                    $other_answers .= $temp;
                }
            }
        } else {
            $answers = Proposal::where('question_id', $question->id)->get();
            $other_answers = "";

            foreach ($answers as $answer) {
                $temp = '<li class="list-item">' . $answer->value . '</li>';
                $other_answers .= $temp;
            }
        }

        Cookie::queue(Cookie::forget('game_score'));
        Cookie::queue(Cookie::forget('game_questions'));

        $this->comeXTimesInChallengeTop($game->id);

        //\App\Game::select('id')->orderBy('score', 'desc')->take(10)->get()->toArray()

        return redirect()->route('games')->with('success',
            '<p>' . trans('messages.get-x-points', ['number' => $score]) . '</p><br />' .
            '<div class="alert-answer">' .
                '<p class="important">' . trans('common.last-question') . ': </p>' .
                '<p>' . $question->question . '</p>' .
                '<p><span class="introducing">' . trans('common.your-false-answer') . ':</span> ' . $user_answer . '</p>' .
                '<p><span class="introducing">' . trans('common.other-answers') .':</span></p>' .
                '<ul>' . $other_answers .'</ul>' .
            '</div>'
        );
    }

    /**
     * To allow users to acquire badge "comeXTimesInChallengeTop".
     * @param int $id
     */
    private function comeXTimesInChallengeTop(int $id) {
        $top = Game::orderBy('score', 'desc')->take(10)->pluck('id')->toArray();

        if (in_array($id, $top)) {
            $user = Auth::user();
            $key = 'comeXTimesInChallengeTop';
            $badge_type = BadgeType::where('method', $key)->get()->first();
            $user_badge_type = $user->badge_types()->where('method', $key)->get()->first();

            if (!is_null($user_badge_type)) {
                $pivot = $user_badge_type->pivot->nb_repetitions + 1;
                $user->badge_types()->updateExistingPivot($badge_type, ['nb_repetitions' => $pivot]);
            } else {
                // Init badge_type.
                $pivot = 1;
                $user->badge_types()->attach($badge_type, ['nb_repetitions' => $pivot]);
            }

            // Manage badges.
            $badges = Badge::where('badge_type_id', $badge_type->id)
                ->where('nb_repetitions', '<=', $pivot)
                ->pluck('badges.id')
                ->toArray();

            if (!empty($badges)) {
                $user_badges = $user->badges()->where('badge_type_id', $badge_type->id)->get();

                foreach ($user_badges as $user_badge) {
                    if (in_array($user_badge->id, $badges)) {
                        unset($badges[array_search($user_badge->id, $badges)]);
                    }
                }
            }

            if (!empty($badges)) {
                foreach ($badges as $badge) {
                    $user->badges()->attach($badge, ['datetime' => (new \DateTime())]);
                }
            }
        }
    }
}
