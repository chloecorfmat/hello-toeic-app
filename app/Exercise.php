<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Exercise extends Model
{
    protected $fillable = [
        'name',
        'part_id',
        'status',
        'visible',
        'updated_at',
        'duration',
        'example_id',
    ];

    public $timestamps = false;

    public function trials() {
        return $this->hasMany('App\Trial', 'trial_id', 'id');
    }

    public function part() {
        return $this->belongsTo('App\Part', 'part_id', 'id');
    }

    public function questions() {
        return $this->belongsToMany('App\Question', 'exercise_question')->withPivot(['number']);
    }

    public function testPart1() {
        return $this->hasMany('App\CompositeTest', 'exercise_part1', 'id');
    }

    public function testPart2() {
        return $this->hasMany('App\CompositeTest', 'exercise_part2', 'id');
    }

    public function testPart3() {
        return $this->hasMany('App\CompositeTest', 'exercise_part3', 'id');
    }

    public function testPart4() {
        return $this->hasMany('App\CompositeTest', 'exercise_part4', 'id');
    }

    public function testPart5() {
        return $this->hasMany('App\CompositeTest', 'exercise_part5', 'id');
    }

    public function testPart6() {
        return $this->hasMany('App\CompositeTest', 'exercise_part6', 'id');
    }

    public function testPart7() {
        return $this->hasMany('App\CompositeTest', 'exercise_part7', 'id');
    }

    public function example() {
        return $this->belongsTo('App\ExerciseExample', 'example_id', 'id');
    }

}
