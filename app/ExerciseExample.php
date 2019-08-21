<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ExerciseExample extends Model
{
    protected $fillable = [
        'name',
        'image',
    ];

    public $timestamps = false;
}
