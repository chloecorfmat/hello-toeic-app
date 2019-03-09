<?php

namespace App\Services;

class Mp3Service {

    public static function getMp3Duration($filename) {
        $bitrate = 128;
        $x = filesize($filename);
        $fileDirectory = fopen($filename, "r");
        $blockMax = 1024;
        $tell = ftell($fileDirectory)-$blockMax - 1;

        $KBps = ($bitrate * 1000)/8;
        $datasize = ($x - ($tell/8));
        $length = $datasize / $KBps;

        return $length;
    }
}
