<?php

namespace App\Http\Controllers;

use App\Setting;
use App\Trial;
use App\CompositeTrial;
use App\Game;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware(['permission:test-execute'])->only('train');
    }

    /**
     * Show the user profile dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function home() {
        return redirect()->route('profile');
    }

    /**
     * Show the user profile dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = \Auth::user();

        $scores = [
            'low' => Setting::where('key', 'config.score.low')->first()->value,
            'intermediate' => Setting::where('key', 'config.score.intermediate')->first()->value
        ];

        if ($user->hasPermissionTo('dashboard-students-see')) {
            $trials = Trial::where('composite_trial_id', NULL)
                ->orderBy('datetime', 'DESC')
                ->get();
        } else {
            // Get all tests passed.
            $trials = Trial::where('user_id', '=', $user->id)
                ->where('composite_trial_id', NULL)
                ->orderBy('datetime', 'DESC')
                ->get();
        }

        /**$PARTS = [
            [
                'id' => 1,
                'label' => 'Test complet',
                'nb_questions' => 200,
                'color' => '#4b3f72',
            ],
            [
                'id' => 2,
                'label' => 'Part 1',
                'nb_questions' => 10,
                'color' => '#ffc857',
            ],
            [
                'id' => 3,
                'label' => 'Part 2',
                'nb_questions' => 30,
                'color' => '#f00072',
            ],
            [
                'id' => 4,
                'label' => 'Part 3',
                'nb_questions' => 30,
                'color' => '#006d91',
            ],
            [
                'id' => 5,
                'label' => 'Part 4',
                'nb_questions' => 30,
                'color' => '#f25e23',
            ],
            [
                'id' => 6,
                'label' => 'Part 5',
                'nb_questions' => 40,
                'color' => '#6fa939',
            ],
            [
                'id' => 7,
                'label' => 'Part 6',
                'nb_questions' => 12,
                'color' => '#2bb8d7',
            ],
            [
                'id' => 8,
                'label' => 'Part 7',
                'nb_questions' => 48,
                'color' => '#e03131',
            ],
        ];

        $axisY = [];
        $axisX = [];**/

        // For all parts and complete tests.
        /**for ($i = 0; $i < 8; $i++) {
            $part = $PARTS[$i];

            $concerned_tests = DB::table('exercises')
                ->select('id')
                ->where('part_id', $part['id'])
                ->get();

            $concerned_tests_id = [];
            foreach ($concerned_tests as $test) {
                $concerned_tests_id[] = $test->id;
            }**/

            /**
             * SELECT YEAR(datetime), MONTH(datetime), GROUP_CONCAT(t.id), COUNT(t.id), AVG(score)
            FROM trials t
            WHERE t.user_id = 2 AND t.id IN (SELECT tests.id FROM tests WHERE tests.part_id = 2)
            GROUP BY YEAR(t.datetime), MONTH(t.datetime) DESC
             */
            /**$stats_tests = DB::table('trials')
                ->selectRaw('YEAR(datetime) as y, MONTH(datetime) as m, GROUP_CONCAT(id), COUNT(id), AVG(score) as avg')
                ->where('user_id', $user->id)
                ->whereIn('exercise_id', $concerned_tests_id)
                ->groupBy(DB::raw('YEAR(datetime), MONTH(datetime)'))
                ->get();

            if (!empty($stats_tests->all())) {
                $month = $stats_tests[0]->m;
                $year = $stats_tests[0]->y;
                $counter = 0;
                $data = [];

                while ($counter < sizeof($stats_tests)) {
                    $date = '"' . $year . '/' . $month . '"';
                    if (!in_array($date, $axisX)) {
                        $axisX[] = $date;
                    }

                    if ($stats_tests[$counter]->m == $month && $stats_tests[$counter]->y == $year) {
                        $data[$date] = $stats_tests[$counter]->avg * 100 / ($part['nb_questions'] * 5);
                        $counter++;
                    }

                    if ($month == 12) {
                        $month = 1;
                        $year++;
                    } else {
                        $month++;
                    }
                }

                $object = [
                    'label' => $part['label'],
                    'backgroundColor' => 'transparent',
                    'borderColor' => $part['color'],
                    'data' => $data
                ];

                $axisY[$part['id']] = $object;
            }
        }

        // Complete datas with 0 values.
        sort($axisX);

        foreach ($PARTS as $part) {
            if (isset($axisY[$part['id']])) {
                foreach ($axisX as $k) {
                    if (!isset($axisY[$part['id']]['data'][$k])) {
                        $axisY[$part['id']]['data'][$k] = 0;
                    }
                }

                ksort($axisY[$part['id']]['data']);

                $axisY[$part['id']]['data'] = array_values($axisY[$part['id']]['data']);
            } else {
                $nb = sizeof($axisX);

                $axisY[$part['id']]['label'] = $part['label'];
                $axisY[$part['id']]['backgroundColor'] = 'transparent';
                $axisY[$part['id']]['borderColor'] = $part['color'];

                for ($i = 0; $i < $nb; $i++) {
                    $axisY[$part['id']]['data'][] = 0;
                }
            }
        }

        $datas = [
            'user' => $user,
            'trials' => $trials,
            'axisX' => implode(', ', $axisX),
            'axisY' => json_encode($axisY)
        ];**/
        $stats['composite-trials'] = CompositeTrial::where('user_id', $user->id)->count();
        $stats['trials'] = Trial::where('user_id', $user->id)->where('composite_trial_id', NULL)->count();
        $stats['games'] = Game::where('user_id', $user->id)->count();

        $datas = [
            'user' => $user,
            'trials' => $trials,
            'stats' => $stats,
        ];

        return view('profile', compact('datas', 'stats', 'scores'));
    }
}
