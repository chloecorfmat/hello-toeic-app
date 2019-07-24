<?php

namespace App\Services;

use App\Setting;

/**
 * Class RenderService
 * @package App\Services
 */

class StatsService {

    public function average($arr) {
        $num_of_elements = count($arr);

        if ($num_of_elements == 0) {
            return 0;
        }

        return array_sum($arr) / $num_of_elements;
    }

    public function median($arr) {
        $count = count($arr); //total numbers in array

        if ($count == 0) {
            return 0;
        }

        $middleval = floor(($count - 1) / 2); // find the middle value, or the lowest middle value
        if($count % 2) { // odd number, middle is the median
            $median = $arr[$middleval];
        } else { // even number, calculate avg of 2 medians
            $low = $arr[$middleval];
            $high = $arr[$middleval + 1];
            $median = (($low + $high) / 2);
        }
        return $median;
    }

    function standard_deviation($arr)
    {
        $num_of_elements = count($arr);
        $variance = 0.0;

        if ($num_of_elements <= 1) {
            return 0;
        }

        // calculating mean using array_sum() method
        $average = array_sum($arr)/$num_of_elements;

        foreach($arr as $i)
        {
            $variance += pow(($i - $average), 2);
        }

        return (float)sqrt($variance/$num_of_elements);
    }
}
