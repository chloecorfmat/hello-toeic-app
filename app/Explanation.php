<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Explanation extends Model
{
    protected $fillable = [
        'title',
        'explanation',
    ];

    public $timestamps = false;

    public function questions() {
        return $this->hasMany('App\Question', 'explanation_id', 'id');
    }
}
