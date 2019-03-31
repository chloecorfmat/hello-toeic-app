<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CompositeTrial extends Model
{
    protected $fillable = [
        'score',
        'datetime',
        'composite_test_id',
    ];

    public $timestamps = false;

    public function compositeTestId() {
        return $this->hasOne('App\CompositeTest', 'composite_test_id', 'id');
    }
}
