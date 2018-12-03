<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    protected $fillable = [
        'score',
        'datetime',
        'user_id',
        'error_id',
    ];

    public $timestamps = false;

    public function user() {
        return $this->belongsTo('App\User', 'user_id', 'id');
    }

    public function question() {
        return $this->belongsTo('App\Question', 'error_id', 'id');
    }
}
