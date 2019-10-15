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
        'reading_duration',
        'created_at',
    ];

    public $timestamps = false;

    public function exercisePart1() {
        return $this->hasOne('App\Exercise', 'id', 'exercise_part1');
    }

    public function exercisePart2() {
        return $this->hasOne('App\Exercise', 'id', 'exercise_part2');
    }

    public function exercisePart3() {
        return $this->hasOne('App\Exercise', 'id', 'exercise_part3');
    }

    public function exercisePart4() {
        return $this->hasOne('App\Exercise', 'id', 'exercise_part4');
    }

    public function exercisePart5() {
        return $this->hasOne('App\Exercise', 'id', 'exercise_part5');
    }

    public function exercisePart6() {
        return $this->hasOne('App\Exercise', 'id', 'exercise_part6');
    }

    public function exercisePart7() {
        return $this->hasOne('App\Exercise', 'id', 'exercise_part7');
    }

    public function compositeTestId() {
        return $this->hasMany('App\CompositeTrial', 'composite_test_id', 'id');
    }

    public function lessons() {
        return $this->hasMany('App\Lesson', 'composite_test_id', 'id');
    }

    public function max_score() {
        $prefix = "exercise_part";
        $nb_questions = 0;

        for ($i = 1; $i < 8; $i++) {
            $variable = $prefix . $i;
            if (!is_null($this->$variable)) {
                $exercise = Exercise::find($this->$variable);
                $nb_questions += $exercise->part->nb_questions;
            }
        }

        return $nb_questions * 5;
    }
}
