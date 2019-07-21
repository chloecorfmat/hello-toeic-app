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

        /**LanguageLine::create([
            'group' => 'groups',
            'key' => 'assign.title',
            'text' => ['en' => 'Assign students in groups', 'fr' => 'Assign students in groups'],
        ]);

        LanguageLine::create([
            'group' => 'groups',
            'key' => 'import.title',
            'text' => ['en' => 'Import groups', 'fr' => 'Import groups'],
        ]);**/

        /**LanguageLine::create([
            'group' => 'composite-tests',
            'key' => 'all',
            'text' => ['en' => 'All composite tests', 'fr' => 'Tous les tests composés'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'search',
            'text' => ['en' => 'Search', 'fr' => 'Rechercher'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'name',
            'text' => ['en' => 'Name', 'fr' => 'Nom'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'version',
            'text' => ['en' => 'Version', 'fr' => 'Version'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'actions',
            'text' => ['en' => 'Actions', 'fr' => 'Actions'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'no-result',
            'text' => ['en' => 'No result.', 'fr' => 'Aucun résultats.'],
        ]);

        LanguageLine::create([
            'group' => 'exercises',
            'key' => 'all',
            'text' => ['en' => 'All exercises', 'fr' => 'Tous les exercices'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'part',
            'text' => ['en' => 'Part', 'fr' => 'Type d\'exercice'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'best-scores',
            'text' => ['en' => 'Best scores', 'fr' => 'Meilleurs scores'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'best-scores-of',
            'text' => ['en' => ':number best scores of :type', 'fr' => ':number meilleurs scores des :type'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'students',
            'text' => ['en' => 'students', 'fr' => 'étudiants'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'position',
            'text' => ['en' => 'Position', 'fr' => 'Position'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'student',
            'text' => ['en' => 'Student', 'fr' => 'Étudiant'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'score',
            'text' => ['en' => 'Score', 'fr' => 'Score'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'scores',
            'text' => ['en' => 'Scores', 'fr' => 'Scores'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'own-scores',
            'text' => ['en' => 'Your own scores', 'fr' => 'Vos scores'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'date',
            'text' => ['en' => 'Date', 'fr' => 'Date'],
        ]);

        LanguageLine::create([
            'group' => 'app',
            'key' => 'profile',
            'text' => ['en' => 'Profile', 'fr' => 'Profil'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'learn-more',
            'text' => ['en' => 'Learn more', 'fr' => 'En savoir plus'],
        ]);

        LanguageLine::create([
            'group' => 'composite-tests',
            'key' => 'done',
            'text' => ['en' => 'composite tests done', 'fr' => 'tests composés réalisés'],
        ]);

        LanguageLine::create([
            'group' => 'exercises',
            'key' => 'done',
            'text' => ['en' => 'exercises done', 'fr' => 'exercices réalisés'],
        ]);

        LanguageLine::create([
            'group' => 'games',
            'key' => 'done',
            'text' => ['en' => 'challenges done', 'fr' => 'challenges réalisés'],
        ]);

        LanguageLine::create([
            'group' => 'lessons',
            'key' => 'in-progress',
            'text' => ['en' => 'Lessons in progress', 'fr' => 'Leçons en cours'],
        ]);

        LanguageLine::create([
            'group' => 'lessons',
            'key' => 'in-progress.list',
            'text' => ['en' => 'Lessons in progress list', 'fr' => 'Liste des leçons en cours'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'datetime.start',
            'text' => ['en' => 'Start datetime', 'fr' => 'Date et heure de début'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'datetime.end',
            'text' => ['en' => 'End datetime', 'fr' => 'Date et heure de fin'],
        ]);

        LanguageLine::create([
            'group' => 'app',
            'key' => 'composite-test',
            'text' => ['en' => 'Composite test', 'fr' => 'Test composé'],
        ]);

        LanguageLine::create([
            'group' => 'composite-tests',
            'key' => 'execute',
            'text' => ['en' => 'Execute composite test', 'fr' => 'Exécuter le test composé'],
        ]);

        LanguageLine::create([
            'group' => 'exercises',
            'key' => 'results.last',
            'text' => ['en' => 'Résultats des derniers exercices', 'fr' => 'Résultats des derniers exercices'],
        ]);

        LanguageLine::create([
            'group' => 'correction',
            'key' => 'limitation',
            'text' => ['en' => 'La correction des questions liées aux parties de compréhension orale n\'est pas affichée.', 'fr' => 'La correction des questions liées aux parties de compréhension orale n\'est pas affichée.'],
        ]);

        LanguageLine::create([
            'group' => 'exercises',
            'key' => 'execute',
            'text' => ['en' => 'Execute exercise', 'fr' => 'Exécuter l\'exercice'],
        ]);

        LanguageLine::create([
            'group' => 'correction',
            'key' => 'show',
            'text' => ['en' => 'Show solution', 'fr' => 'Voir la solution'],
        ]);

        LanguageLine::create([
            'group' => 'composite-tests',
            'key' => 'results.last',
            'text' => ['en' => 'Résultats des derniers tests composés', 'fr' => 'Résultats des derniers tests composés'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'matricule',
            'text' => ['en' => 'Matricule', 'fr' => 'Matricule'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'email',
            'text' => ['en' => 'E-mail', 'fr' => 'E-mail'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'course',
            'text' => ['en' => 'Course', 'fr' => 'Filière'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'toeic',
            'text' => ['en' => 'Toeic', 'fr' => 'Toeic'],
        ]);

        LanguageLine::create([
            'group' => 'profile',
            'key' => 'password.update',
            'text' => ['en' => 'Update password', 'fr' => 'Mettre à jour le mot de passe'],
        ]);

        LanguageLine::create([
            'group' => 'profile',
            'key' => 'password.limitation',
            'text' => [
                'en' => 'Password should contain at least 1 lowercase, 1 uppercase, 1 number, 1 special char and contain between 6 and 16 characters.',
                'fr' => 'Password should contain at least 1 lowercase, 1 uppercase, 1 number, 1 special char and contain between 6 and 16 characters'
            ],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'validate',
            'text' => ['en' => 'Validate', 'fr' => 'Valider'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'password',
            'text' => ['en' => 'Password', 'fr' => 'Mot de passe'],
        ]);

        LanguageLine::create([
            'group' => 'profile',
            'key' => 'password.repeat',
            'text' => ['en' => 'Repeat password', 'fr' => 'Répéter le mot de passe'],
        ]);**/

        // @TODO :  HERE !
    }
}
