<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Question extends Model
{
    protected $fillable = [
      'version',
      'question',
      'number',
      'answer_id',
    ];

    public $timestamps = false;

    public function games() {
        return $this->hasMany('App\Game', 'error_id', 'id');
    }

    public function corrections() {
        return $this->hasMany('App\Correction', 'question_id', 'id');
    }

    public function proposals() {
        return $this->hasMany('App\Proposal', 'question_id', 'id');
    }

    public function answer() {
        return $this->belongsTo('App\Proposal', 'answer_id', 'id');
    }

    public function documents() {
        return $this->belongsToMany('App\Document', 'question_document');
    }

    public function parts() {
        return $this->belongsToMany('App\Part', 'question_part');
    }

    public function tests() {
        return $this->belongsToMany('App\Test', 'test_question')->withPivot(['number']);
    }

    public function getStatistics() {
        $statistics = [];
        $question_answer = $this->answer()->get()->first()->id;

        // SELECT question_id, proposal_id, count(id) as count FROM corrections WHERE question_id = 1 GROUP BY proposal_id, question_id;
        $datas = DB::table('corrections')
            ->select(['proposal_id'])
            ->selectRaw('count(id) as count')
            ->where('question_id', $this->id)
            ->groupBy(DB::raw('proposal_id WITH ROLLUP'))
            ->get();

        foreach ($datas as $key => $statistic) {

            if (is_null($statistic->proposal_id)) {
                $total = $statistic->count;
                $statistics['total'] = $total;
            } else {
                $proposal = Proposal::find($statistic->proposal_id);
                $statistic->proposal = $proposal->value;

                if ($statistic->proposal_id === $question_answer) {
                    $answer = $statistic->count;
                }
            }
        }

        $statistics['answers'] = $datas;
        $statistics['success'] = $answer ?? null;
        if (!is_null($statistics['success'])) {
            $statistics['percent'] = ($answer / $total) * 100;
        }

        return $statistics;
    }
}
