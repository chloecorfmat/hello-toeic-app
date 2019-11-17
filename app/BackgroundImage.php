<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BackgroundImage extends Model
{
    protected $fillable = [
        'url',
        'form_position',
        'source',
        'color',
        'enable',
    ];

    public $timestamps = false;
}
