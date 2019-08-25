<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Badge extends Model
{
    protected $fillable = [
        'badge_type_id',
        'level_id',
        'image',
        'nb_repetitions',
        'param',
    ];

    public $timestamps = false;

    public function users() {
        return $this->belongsToMany('App\User', 'user_badge')->withPivot(['datetime']);
    }

    public function level() {
        return $this->belongsTo('App\Level', 'level_id', 'id');
    }

    public function badgeType() {
        return $this->belongsTo('App\BadgeType', 'badge_type_id', 'id');
    }
}
