<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Example extends Model
{
    protected $fillable = [
        'name',
        'image',
    ];

    public $timestamps = false;
}
