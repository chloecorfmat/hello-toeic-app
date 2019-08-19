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

    public function median($temp) {
        $arr = [];
        $i = 0;
        asort($temp);

        foreach ($temp as $value) {
            $arr[$i++] = $value;
        }

        $count = count($arr); //total numbers in array

        if ($count == 0) {
            return 0;
        }

        if ($count%2 == 0) {
            $second = $count/2;
            $first = $second-1;

            $median = ($arr[$first] + $arr[$second]) / 2;
        } else { // even number, calculate avg of 2 medians
            $median = $arr[round($count/2, 0)-1];
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
