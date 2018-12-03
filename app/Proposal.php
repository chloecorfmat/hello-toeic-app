<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Proposal extends Model
{
    protected $fillable = [
        'value',
        'question_id',
    ];

    public $timestamps = false;

    public function corrections() {
        return $this->hasMany('App\Correction', 'proposal_id', 'id');
    }

    public function question() {
        return $this->belongsTo('App\Question', 'question_id', 'id');
    }

    public function answer() {
        return $this->hasOne('App\Question', 'answer_id', 'id');
    }
}
