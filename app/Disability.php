<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Disability extends Model
{
    protected $fillable = [
        'user_id',
        'start_date'
    ];

    public $timestamps = false;

    public function user() {
        return $this->belongsTo('App\User', 'user_id', 'id');
    }
}
