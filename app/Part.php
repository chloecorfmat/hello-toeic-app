<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Part extends Model
{
    protected $fillable = [
        'name',
        'version',
        'type',
        'description',
        'nb_questions',
        'texts',
        'files',
        'questions',
        'nb_answers',
    ];

    public $timestamps = false;

    public function tests() {
        return $this->hasMany('App\Exercise', 'part_id', 'id');
    }

    public function questions() {
        return $this->belongsToMany('App\Question', 'question_part');
    }
}
