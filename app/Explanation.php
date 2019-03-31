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

    public function question() {
        return $this->hasOne('App\Question', 'explanation_id', 'id');
    }
}
