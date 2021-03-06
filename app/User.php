<?php
namespace App;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use Notifiable;
    use HasRoles;
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
        'api_token',
        'last_login_at',
        'before_last_login_at',
        'consent_at',
        'status',
        'promo',
        'picture',
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

    public function groups() {
        return $this->belongsToMany('App\Group', 'user_group');
    }

    // "teacher" attribute in Group model.
    public function taughtGroups() {
        return $this->hasMany('App\Group', 'teacher', 'id');
    }

    // Badges
    public function badges() {
        return $this->belongsToMany('App\Badge', 'user_badge')->withPivot(['datetime']);
    }

    public function badge_types() {
        return $this->belongsToMany('App\BadgeType', 'user_badge_type_progression')
            ->withPivot(['nb_repetitions']);
    }

    public function disabilities() {
        return $this->hasMany('App\Disability', 'user_id', 'id');
    }

    public function messages() {
        return $this->hasMany('App\Message', 'from', 'id');
    }
}
