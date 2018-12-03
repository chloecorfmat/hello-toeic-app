<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Test extends Model
{
    protected $fillable = [
        'name',
        'version',
        'part_id',
    ];

    public $timestamps = false;

    public function trials() {
        return $this->hasMany('App\Trial', 'trial_id', 'id');
    }

    public function part() {
        return $this->belongsTo('App\Part', 'part_id', 'id');
    }

    public function questions() {
        return $this->belongsToMany('App\Question', 'Test_Question')->withPivot(['number']);
    }
}
