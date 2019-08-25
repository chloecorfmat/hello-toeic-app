<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BadgeType extends Model
{
    protected $fillable = [
        'name',
        'description',
        'param',
        'method', // Method to call when event is fired.
    ];

    public $timestamps = false;

    // Users
    public function users() {
        return $this->belongsToMany('App\User', 'user_badge_type_progression')
            ->withPivot(['nb_repetitions']);
    }

    public function badges() {
        return $this->hasMany('App\Badge', 'badge_id', 'id');
    }
}
