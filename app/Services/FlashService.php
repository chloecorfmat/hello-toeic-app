<?php

namespace App\Services;


use Illuminate\Support\Facades\Session;

/**
 * Class FlashService
 * @package App\Services
 */

class FlashService
{
    public function __construct()
    {
    }

    public static function getMessages()
    {
        $messages = [];
        $names = Session::all()['_flash'];
        $vars = ['new', 'old'];

        foreach ($vars as $var) {
            foreach ($names[$var] as $name) {
                $datas = Session::get($name);

                if (is_array($datas->getMessages())) {
                    foreach ($datas->getMessages() as $message) {
                        $messages[$name][] = $message[0];
                    }
                } else {
                    $messages[$name][] = $datas;
                }
            }
        }

        return $messages;
    }
}
