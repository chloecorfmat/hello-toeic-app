<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    protected $fillable = [
        'name',
        'start_datetime',
        'end_datetime',
        'name',
        'group_id',
        'composite_test_id'
    ];

    public $timestamps = false;

    public function group() {
        return $this->belongsTo('App\Group', 'group_id', 'id');
    }

    public function composite_test() {
        return $this->belongsTo('App\CompositeTest', 'composite_test_id', 'id');
    }
}
