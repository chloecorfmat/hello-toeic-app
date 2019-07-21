<?php

use Illuminate\Database\Seeder;
use Spatie\TranslationLoader\LanguageLine;

class LanguageLinesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /**LanguageLine::create([
            'group' => 'wordings',
            'key' => 'explanation',
            'text' => ['en' => 'Wordings to display in interface.', 'fr' => 'Wordings to display in interface.'],
        ]);

        LanguageLine::create([
            'group' => 'wordings',
            'key' => 'title',
            'text' => ['en' => 'Translations', 'fr' => 'Traductions'],
        ]);

        LanguageLine::create([
            'group' => 'wordings',
            'key' => 'success',
            'text' => ['en' => 'Translations have been saved.', 'fr' => 'Wordings have been saved.'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'login',
            'text' => ['en' => 'Login', 'fr' => 'Connexion'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'logout',
            'text' => ['en' => 'Logout', 'fr' => 'Déconnexion'],
        ]);

        LanguageLine::create([
            'group' => 'app',
            'key' => 'training',
            'text' => ['en' => 'Training', 'fr' => 'Entraînement'],
        ]);

        LanguageLine::create([
            'group' => 'app',
            'key' => 'exercises',
            'text' => ['en' => 'Exercises', 'fr' => 'Exercices'],
        ]);

        LanguageLine::create([
            'group' => 'app',
            'key' => 'games',
            'text' => ['en' => 'Challenges', 'fr' => 'Challenges'],
        ]);

        LanguageLine::create([
            'group' => 'app',
            'key' => 'admin',
            'text' => ['en' => 'Administration', 'fr' => 'Administration'],
        ]);

        LanguageLine::create([
            'group' => 'app',
            'key' => 'manage',
            'text' => ['en' => 'Manage', 'fr' => 'Gérer'],
        ]);

        LanguageLine::create([
            'group' => 'app',
            'key' => 'results',
            'text' => ['en' => 'Results', 'fr' => 'Résultats'],
        ]);

        LanguageLine::create([
            'group' => 'users',
            'key' => 'list',
            'text' => ['en' => 'Users list', 'fr' => 'Liste des utilisateurs'],
        ]);

        LanguageLine::create([
            'group' => 'students',
            'key' => 'list',
            'text' => ['en' => 'Students list', 'fr' => 'Liste des étudiants'],
        ]);

        LanguageLine::create([
            'group' => 'groups',
            'key' => 'list',
            'text' => ['en' => 'Groups list', 'fr' => 'Liste des groupes'],
        ]);

        LanguageLine::create([
            'group' => 'lessons',
            'key' => 'list',
            'text' => ['en' => 'Lessons list', 'fr' => 'Liste des leçons'],
        ]);

        LanguageLine::create([
            'group' => 'documents',
            'key' => 'list',
            'text' => ['en' => 'Documents list', 'fr' => 'Liste des documents'],
        ]);

        LanguageLine::create([
            'group' => 'questions',
            'key' => 'list',
            'text' => ['en' => 'Questions list', 'fr' => 'Liste des questions'],
        ]);

        LanguageLine::create([
            'group' => 'exercises',
            'key' => 'list',
            'text' => ['en' => 'Exercises list', 'fr' => 'Liste des exercices'],
        ]);

        LanguageLine::create([
            'group' => 'composite-tests',
            'key' => 'list',
            'text' => ['en' => 'Composite tests list', 'fr' => 'Liste des tests composés'],
        ]);

        LanguageLine::create([
            'group' => 'parts',
            'key' => 'list',
            'text' => ['en' => 'Parts list', 'fr' => 'Liste des types d\'exercices'],
        ]);

        LanguageLine::create([
            'group' => 'explanations',
            'key' => 'list',
            'text' => ['en' => 'Explanations list', 'fr' => 'Liste des explications'],
        ]);

        LanguageLine::create([
            'group' => 'games',
            'key' => 'list',
            'text' => ['en' => 'Challenges list', 'fr' => 'Liste des challenges'],
        ]);

        LanguageLine::create([
            'group' => 'app',
            'key' => 'permissions',
            'text' => ['en' => 'Permissions', 'fr' => 'Permissions'],
        ]);

        LanguageLine::create([
            'group' => 'app',
            'key' => 'feature-flipping',
            'text' => ['en' => 'Feature flipping', 'fr' => 'Feature flipping'],
        ]);

        LanguageLine::create([
            'group' => 'app',
            'key' => 'configuration',
            'text' => ['en' => 'Configuration', 'fr' => 'Configuration'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'create',
            'text' => ['en' => 'Create', 'fr' => 'Créer'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'edit',
            'text' => ['en' => 'Edit', 'fr' => 'Modifier'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'delete',
            'text' => ['en' => 'Delete', 'fr' => 'Supprimer'],
        ]);

        LanguageLine::create([
            'group' => 'app',
            'key' => 'dashboard',
            'text' => ['en' => 'Dashboard', 'fr' => 'Tableau de bord'],
        ]);

        LanguageLine::create([
            'group' => 'documents',
            'key' => 'unamed',
            'text' => ['en' => 'Unamed document', 'fr' => 'Document sans nom'],
        ]);

        LanguageLine::create([
            'group' => 'games',
            'key' => 'play',
            'text' => ['en' => 'Play', 'fr' => 'Jouer'],
        ]);

        LanguageLine::create([
            'group' => 'app',
            'key' => 'composite-tests',
            'text' => ['en' => 'Composite tests', 'fr' => 'Tests composés'],
        ]);**/

        LanguageLine::create([
            'group' => 'groups',
            'key' => 'assign.title',
            'text' => ['en' => 'Assign students in groups', 'fr' => 'Assign students in groups'],
        ]);

        LanguageLine::create([
            'group' => 'groups',
            'key' => 'import.title',
            'text' => ['en' => 'Import groups', 'fr' => 'Import groups'],
        ]);
    }
}
