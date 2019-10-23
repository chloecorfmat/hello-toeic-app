<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CompositeTrial extends Model
{
    protected $fillable = [
        'score',
        'datetime',
        'composite_test_id',
        'user_id',
    ];

    public $timestamps = false;

    public function composite_test() {
        return $this->hasOne('App\CompositeTest', 'id', 'composite_test_id');
    }

    public function user() {
        return $this->belongsTo('App\User', 'user_id', 'id');
    }

    public function trials() {
        return $this->hasMany('App\Trial', 'composite_trial_id', 'id');
    }
}
