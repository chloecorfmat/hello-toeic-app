<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = [
        'subject',
        'message',
        'from',
        'to',
        'datetime',
        'status',
        'handle_by',
    ];

    public $timestamps = false;

    public function from() {
        return $this->belongsTo('App\User', 'from', 'id');
    }

    public function to() {
        return $this->belongsTo('Spatie\Permission\Models\Role', 'to', 'id');
    }

    public function handle_by() {
        return $this->belongsTo('App\User', 'handle_by', 'id');
    }
}
