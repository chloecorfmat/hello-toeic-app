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

                if (is_array($datas)) {
                    $messages[$name] = array_merge($messages[$name], $datas);
                } else {
                    $messages[$name][] = $datas;
                }
            }
        }

        return $messages;
    }
}
