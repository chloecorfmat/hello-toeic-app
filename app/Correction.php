<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Correction extends Model
{
    protected $fillable = [
        'state',
        'trial_id',
        'question_id',
        'proposal_id',
    ];

    public $timestamps = false;

    public function trial() {
        return $this->belongsTo('App\Trial', 'trial_id', 'id');
    }

    public function proposal() {
        return $this->belongsTo('App\Proposal', 'proposal_id', 'id');
    }

    public function question() {
        return $this->belongsTo('App\Question', 'question_id', 'id');
    }
}
