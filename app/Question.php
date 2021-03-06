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
      'explanation_id',
      'difficulty_rate',
      'trials_nb',
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

    public function exercises() {
        return $this->belongsToMany('App\Exercise', 'exercise_question')->withPivot(['number']);
    }

    public function explanation() {
        return $this->belongsTo('App\Explanation', 'explanation_id', 'id');
    }

    public function getStatistics() {
        $statistics = [];
        $question_answer = $this->answer()->get()->first()->id;

        // SELECT question_id, proposal_id, count(id) as count FROM corrections WHERE question_id = 1 GROUP BY proposal_id, question_id;
        $datas = DB::table('corrections')
            ->select(['proposal_id'])
            ->selectRaw('count(id) as count')
            ->where('question_id', $this->id)
            ->groupBy(['proposal_id', 'question_id'])
            ->get();

        foreach ($datas as $key => $statistic) {
            if (!is_null($statistic->proposal_id)) {
                $proposal = Proposal::find($statistic->proposal_id);
                $statistic->proposal = $proposal->value;

                if ($statistic->proposal_id === $question_answer) {
                    $answer = $statistic->count;
                }
            } else {
                $statistic->proposal = 'NULL';
            }
        }

        $statistics['total'] = DB::table('corrections')
            ->selectRaw('count(id) as c')
            ->where('question_id', $this->id)
            ->first()
            ->c;

        $statistics['answers'] = $datas;
        $statistics['success'] = $answer ?? null;
        if (!is_null($statistics['success'])) {
            $statistics['percent'] = ($answer / $statistics['total']) * 100;
        }

        return $statistics;
    }
}
