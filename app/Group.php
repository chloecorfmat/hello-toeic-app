<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    protected $fillable = [
        'name',
        'start_date',
        'end_date',
        'teacher'
    ];

    public $timestamps = false;

    public function users() {
        return $this->belongsToMany('App\User', 'user_group');
    }

    public function teacher() {
        return $this->belongsTo('App\User', 'teacher', 'id');
    }

    public function lessons() {
        return $this->hasMany('App\Lesson', 'group_id', 'id');
    }
}
