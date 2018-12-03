<?php

use App\Part;
use Illuminate\Database\Seeder;

class PartTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $parts = [
            [
                'name' => 'Complete',
                'version' => 2017,
                'type' => 'all',
                'description' => 'A complete TOEIC test.',
            ],
            [
                'name' => 'Part 1',
                'version' => 2017,
                'type' => 'listening',
                'description' => 'For each question in this part, you will hear four statements about a picture in your test book. When you hear the statements, you must select the one statement that best describes what you see in the picture. The statements will not be printed in your test book and will be spoken only one time.',
            ],
            [
                'name' => 'Part 2',
                'version' => 2017,
                'type' => 'listening',
                'description' => 'You will hear a question or statement and three responses spoken in English. They will not be printed in your test book and will be spoken only one time. Select the best response to the question or statement',
            ],
            [
                'name' => 'Part 3',
                'version' => 2017,
                'type' => 'listening',
                'description' => 'You will hear some conversations between two people. You will be asked to answer three questions about what the speakers say in each conversation. Select the best response to each question. The conversations will not be printed and will be spoken only one time.',
            ],
            [
                'name' => 'Part 4',
                'version' => 2017,
                'type' => 'listening',
                'description' => 'You will hear some talks given by a single speaker. You will asked to answer three questions about what the speaker says in each talk. Select the best response to each question. The talks will not be printed and will be spoken only one time.',
            ],
            [
                'name' => 'Part 5',
                'version' => 2017,
                'type' => 'reading',
                'description' => 'A word or phrase is missing in each of the sentences below. Four answer choices are given below each sentence. Select the best answer to complete the sentence.',
            ],
            [
                'name' => 'Part 6',
                'version' => 2017,
                'type' => 'reading',
                'description' => 'Read the texts that follow. A word or phrase is missing in some of the sentences. Four answer choices are given below each of the sentences. Select the best answer to complete the text.',
            ],
            [
                'name' => 'Part 7',
                'version' => 2017,
                'type' => 'reading',
                'description' => 'In this part you will read a selection of texts, such as magazine and newspaper articles, letters, and advertisements. Each text is followed by several questions. Select the best answer for each question.',
            ]
        ];

        foreach ($parts as $part) {
            Part::create(
                [
                    'name' => $part['name'],
                    'version' => $part['version'],
                    'type' => $part['type'],
                    'description' => $part['description'],
                ]
            );
        }
    }
}
