<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Trial extends Model
{
    protected $fillable = [
        'score',
        'datetime',
        'test_id',
        'user_id',
        'composite_trial_id',
    ];

    public $timestamps = false;

    public function user() {
        return $this->belongsTo('App\User', 'user_id', 'id');
    }

    public function corrections() {
        return $this->hasMany('App\Correction', 'trial_id', 'id');
    }

    public function test() {
        return $this->belongsTo('App\Test', 'test_id', 'id');
    }
}
