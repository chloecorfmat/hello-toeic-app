<?php

use App\Document;
use App\Part;
use App\Proposal;
use App\Question;
use App\Exercise;
use Illuminate\Database\Seeder;

class QuestionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tests = [
            // One test.
            [
                'name' => 'Tactics for TOEIC',
                'version' => 2017,
                'parts' => [
                    // Part 1.
                    [],
                    // Part 2.
                    [],
                    // Part 3.
                    [],
                    // Part 4.
                    [],
                    // Part 5.
                    [
                        // Questions
                        [
                            'question' => 'The travel agency will make your travel <...> and send your tickets to the office by the end of the week.',
                            'year' => 2017,
                            'number' => 101,
                            // Proposals
                            'proposals' => [
                                'reservations', // Good answer.
                                'release',
                                'experiences',
                                'diagram',
                            ],
                            'answer' => 'reservations',
                        ],
                        [
                            'question' => 'Dr. Viella Diop is best known for her <...> contributions to the field of physics.',
                            'year' => 2017,
                            'number' => 102,
                            'proposals' => [
                                'significant', // Good answer.
                                'signify',
                                'significance',
                                'significantly',
                            ],
                            'answer' => 'significant',
                        ],
                        [
                            'question' => 'Because of the severe weather, Mr. Kim asked if <...> could leave the office a little earlier than usual.',
                            'year' => 2017,
                            'number' => 103,
                            'proposals' => [
                                'he', // Good answer.
                                'him',
                                'himself',
                                'his',
                            ],
                            'answer' => 'he',
                        ],
                        [
                            'question' => 'If you <...> additional assistance, please do not hesitate to contact us.',
                            'year' => 2017,
                            'number' => 104,
                            'proposals' => [
                                'require',
                                'to require',
                                'requiring',
                                'requires',
                            ],
                            'answer' => 'require',
                        ],
                        [
                            'question' => 'The Smithson Bank is well-known for the <...> welcome that it extends to all new employees.',
                            'year' => 2017,
                            'number' => 105,
                            'proposals' => [
                                'warm',
                                'warmth',
                                'warmly',
                                'warmed',
                            ],
                            'answer' => 'warm',
                        ]
                    ],
                    // Part 6.
                    [
                        [
                            'question' => 'Refer to the following memo.',
                            'year' => 2017,
                            'number' => 141,
                            'proposals' => [
                                'This', // Good answer.
                                'Any',
                                'She',
                                'What'
                            ],
                            'answer' => 'This',
                            'documents' => [
                                'documents/T001_Q141143.png',
                            ],
                        ],
                        [
                            'question' => 'Refer to the following memo.',
                            'year' => 2017,
                            'number' => 142,
                            'proposals' => [
                                'access', // Good answer.
                                'permission',
                                'opening',
                                'inclusion'
                            ],
                            'answer' => 'access',
                            'documents' => [
                                'documents/T001_Q141143.png'
                            ],
                        ],
                        [
                            'question' => 'Refer to the following memo.',
                            'year' => 2017,
                            'number' => 143,
                            'proposals' => [
                                'alternative', // Good answer.
                                'consequent',
                                'replaceable',
                                'capable'
                            ],
                            'answer' => 'alternative',
                            'documents' => [
                                'documents/T001_Q141143.png'
                            ],
                        ],
                    ],
                    // Part 7.
                    [
                        [
                            'question' => 'What is the main purpose of the notice ?',
                            'year' => 2017,
                            'number' => 181,
                            'proposals' => [
                                'To explain how to obtain certain official records',
                                'To announce a recent price increase',
                                'To provide directions to an office',
                                'To describe a new government facility'
                            ],
                            'answer' => 'To explain how to obtain certain official records',
                            'documents' => [
                                'documents/T001_Q181185_01.png',
                                'documents/T001_Q181185_02.png',
                            ],
                        ],
                        [
                            'question' => 'What information must accompany each request ?',
                            'year' => 2017,
                            'number' => 182,
                            'proposals' => [
                                'Identification that includes a photograph',
                                'Two copies of recent tax returns',
                                'The applicant\'s telephone number',
                            ],
                            'answer' => 'Identification that includes a photograph',
                            'documents' => [
                                'documents/T001_Q181185_01.png',
                                'documents/T001_Q181185_02.png',
                            ],
                        ],
                        [
                            'question' => 'On what day does the Vital Records Office close at 5:30 ?',
                            'year' => 2017,
                            'number' => 183,
                            'proposals' => [
                                'Thursday',
                                'Monday',
                                'Tuesday',
                                'Wednesday',
                            ],
                            'answer' => 'Thursday',
                            'documents' => [
                                'documents/T001_Q181185_01.png',
                                'documents/T001_Q181185_02.png',
                            ],
                        ],
                        [
                            'question' => 'What does John Heinrich request a copy of ?',
                            'year' => 2017,
                            'number' => 184,
                            'proposals' => [
                                'A marriage license',
                                'A birth certificate',
                                'A passport',
                                'A health record',
                            ],
                            'answer' => 'A marriage license',
                            'documents' => [
                                'documents/T001_Q181185_01.png',
                                'documents/T001_Q181185_02.png',
                            ],
                        ],
                        [
                            'question' => 'Why does John Heinrich enclose a check for $25 ?',
                            'year' => 2017,
                            'number' => 185,
                            'proposals' => [
                                'He wants to receive a document quickly.',
                                'He wants two copies of a document.',
                                'He is requesting a very old record.',
                                'He is asking to have his records sent to an overseas address.'
                            ],
                            'answer' => 'He wants to receive a document quickly.',
                            'documents' => [
                                'documents/T001_Q181185_01.png',
                                'documents/T001_Q181185_02.png',
                            ],
                        ],
                    ],
                ],
            ],
        ];

        $ps = Part::all();
        $parts = [];
        foreach ($ps as $p) {
            $parts[] = $p->id;
        }

        foreach ($tests as $test) {
            $part_index = 0;
            $question_index = 1;

            $t = Exercise::create([
                'name' => $test['name'],
                'version' => $test['version'],
                'part_id' => Part::find($parts[$part_index])->id,
            ]);

            $part_index++;
            foreach ($test['parts'] as $part) {
                foreach ($part as $question) {
                    $q = Question::create([
                        'version' => $question['year'],
                        'question' => $question['question'],
                        'number' => $question['number']
                    ]);

                    $p = Part::find($parts[$part_index]);
                    $q->parts()->attach($p);

                    foreach ($question['proposals'] as $proposal) {
                        $p = $q->proposals()->create(['value' => $proposal]);

                        // @TODO : CHECK.
                        if ($proposal = $question['answer']) {
                            $q->answer()->associate($p)->save();
                        }
                    }

                    if (isset($question['documents']) && !empty($question['documents'])) {
                        $d = [];

                        foreach ($question['documents'] as $doc) {
                            $d[] = Document::where('url', $doc)
                                ->take(1)
                                ->get()
                                ->first()->id;
                        }

                        if (!empty($d) && !is_null($d)) {
                            $q->documents()->sync($d);
                        }
                    }
                    $t->questions()->attach($q, ['number' => $question_index++]);
                }
                $part_index++;
            }
        }
    }
}
