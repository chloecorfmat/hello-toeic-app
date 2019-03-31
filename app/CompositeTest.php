<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CompositeTest extends Model
{
    protected $fillable = [
        'name',
        'version',
        'test_part1',
        'test_part2',
        'test_part3',
        'test_part4',
        'test_part5',
        'test_part6',
        'test_part7',
    ];

    public $timestamps = false;

    public function testPart1() {
        return $this->hasOne('App\Test', 'test_part1', 'id');
    }

    public function testPart2() {
        return $this->hasOne('App\Test', 'test_part2', 'id');
    }

    public function testPart3() {
        return $this->hasOne('App\Test', 'test_part3', 'id');
    }

    public function testPart4() {
        return $this->hasOne('App\Test', 'test_part4', 'id');
    }

    public function testPart5() {
        return $this->hasOne('App\Test', 'test_part5', 'id');
    }

    public function testPart6() {
        return $this->hasOne('App\Test', 'test_part6', 'id');
    }

    public function testPart7() {
        return $this->hasOne('App\Test', 'test_part7', 'id');
    }

    public function compositeTestId() {
        return $this->hasMany('App\CompositeTrial', 'composite_test_id', 'id');
    }
}
