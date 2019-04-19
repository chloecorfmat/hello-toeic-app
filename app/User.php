<?php
namespace App;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Traits\HasRoles;
use QCod\Gamify\Gamify;

class User extends Authenticatable
{
    use Notifiable;
    use HasRoles;
    use Gamify;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'matricule',
        'email',
        'password',
        'course',
        'passed',
    ];
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function games() {
        return $this->hasMany('App\Game', 'user_id', 'id');
    }

    public function trials() {
        return $this->hasMany('App\Trial', 'user_id', 'id');
    }

    public function composite_trials() {
        return $this->hasMany('App\CompositeTrial', 'user_id', 'id');
    }
}
