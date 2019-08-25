<?php

namespace App\Observers;

use App\CompositeTrial;

class CompositeTrialObserver
{
    /**
     * Handle the composite trial "created" event.
     *
     * @param  \App\CompositeTrial  $compositeTrial
     * @return void
     */
    public function created(CompositeTrial $compositeTrial)
    {
        //
    }

    /**
     * Handle the composite trial "updated" event.
     *
     * @param  \App\CompositeTrial  $compositeTrial
     * @return void
     */
    public function updated(CompositeTrial $compositeTrial)
    {
        //
    }

    /**
     * Handle the composite trial "deleted" event.
     *
     * @param  \App\CompositeTrial  $compositeTrial
     * @return void
     */
    public function deleted(CompositeTrial $compositeTrial)
    {
        //
    }

    /**
     * Handle the composite trial "restored" event.
     *
     * @param  \App\CompositeTrial  $compositeTrial
     * @return void
     */
    public function restored(CompositeTrial $compositeTrial)
    {
        //
    }

    /**
     * Handle the composite trial "force deleted" event.
     *
     * @param  \App\CompositeTrial  $compositeTrial
     * @return void
     */
    public function forceDeleted(CompositeTrial $compositeTrial)
    {
        //
    }
}
