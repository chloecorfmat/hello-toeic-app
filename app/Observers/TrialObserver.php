<?php

namespace App\Observers;

use App\Trial;

class TrialObserver
{
    /**
     * Handle the trial "created" event.
     *
     * @param  \App\Trial  $trial
     * @return void
     */
    public function created(Trial $trial)
    {
        //
    }

    /**
     * Handle the trial "updated" event.
     *
     * @param  \App\Trial  $trial
     * @return void
     */
    public function updated(Trial $trial)
    {
        //
    }

    /**
     * Handle the trial "deleted" event.
     *
     * @param  \App\Trial  $trial
     * @return void
     */
    public function deleted(Trial $trial)
    {
        //
    }

    /**
     * Handle the trial "restored" event.
     *
     * @param  \App\Trial  $trial
     * @return void
     */
    public function restored(Trial $trial)
    {
        //
    }

    /**
     * Handle the trial "force deleted" event.
     *
     * @param  \App\Trial  $trial
     * @return void
     */
    public function forceDeleted(Trial $trial)
    {
        //
    }
}
