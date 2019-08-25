<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Level extends Model
{
    protected $fillable = [
        'name',
        'level',
        'color',
    ];

    public $timestamps = false;

    public function badges() {
        return $this->hasMany('App\Badge', 'level_id', 'id');
    }
}
