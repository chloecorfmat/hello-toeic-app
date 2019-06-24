<?php

namespace App\Services;

/**
 * From : https://gist.githubusercontent.com/jagneshchawla/3803671/raw/faa79cf90086d32b445c75cdfec53719a948b42b/audio%2520length%2520Mp3%2520class-%2520PHP
 * Class Mp3Service
 * @package App\Services
 */

class StringService {
    protected $s;

    public function __construct(string $s)
    {
        $this->s = $s;
    }

    public function normalize() {
        $string = iconv ('UTF-8', 'US-ASCII//TRANSLIT//IGNORE', $this->s);
        $string = preg_replace ('#[^.0-9a-z]+#i', '', $string);
        return strtolower ($string);
    }
}
