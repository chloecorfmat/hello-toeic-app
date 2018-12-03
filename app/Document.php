<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $fillable = [
        'name',
        'type',
        'url',
    ];

    public $timestamps = false;

    public function questions() {
        return $this->belongsToMany('App\Question', 'question_document');
    }
}
