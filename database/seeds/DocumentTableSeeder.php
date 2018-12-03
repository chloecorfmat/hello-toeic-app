<?php

use App\Document;
use Illuminate\Database\Seeder;

class DocumentTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $documents = [
            [
                'name' => 'Memo',
                'type' => 'image',
                'url' => 'documents/T001_Q141143.png',
            ],
            [
                'name' => 'Notice : Obtaining Certificed Vital Records',
                'type' => 'image',
                'url' => 'documents/T001_Q181185_01.png',
            ],
            [
                'name' => 'Letter',
                'type' => 'image',
                'url' => 'documents/T001_Q181185_02.png',
            ],
        ];

        foreach ($documents as $document) {
            Document::create([
                'name' => $document['name'],
                'type' => $document['type'],
                'url' => $document['url'],
            ]);
        }
    }
}
