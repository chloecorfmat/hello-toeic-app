<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CompositeTest extends Model
{
    protected $fillable = [
        'name',
        'version',
        'visible',
        'exercise_part1',
        'exercise_part2',
        'exercise_part3',
        'exercise_part4',
        'exercise_part5',
        'exercise_part6',
        'exercise_part7',
        'updated_at',
    ];

    public $timestamps = false;

    public function testPart1() {
        return $this->hasOne('App\Exercise', 'exercise_part1', 'id');
    }

    public function testPart2() {
        return $this->hasOne('App\Exercise', 'exercise_part2', 'id');
    }

    public function testPart3() {
        return $this->hasOne('App\Exercise', 'exercise_part3', 'id');
    }

    public function testPart4() {
        return $this->hasOne('App\Exercise', 'exercise_part4', 'id');
    }

    public function testPart5() {
        return $this->hasOne('App\Exercise', 'exercise_part5', 'id');
    }

    public function testPart6() {
        return $this->hasOne('App\Exercise', 'exercise_part6', 'id');
    }

    public function testPart7() {
        return $this->hasOne('App\Exercise', 'exercise_part7', 'id');
    }

    public function compositeTestId() {
        return $this->hasMany('App\CompositeTrial', 'composite_test_id', 'id');
    }

    public function lessons() {
        return $this->hasMany('App\Lesson', 'composite_test_id', 'id');
    }
}
