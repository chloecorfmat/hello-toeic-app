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
            'key' => 'assign_title',
            'text' => ['en' => 'Assign students in groups', 'fr' => 'Assign students in groups'],
        ]);

        LanguageLine::create([
            'group' => 'groups',
            'key' => 'import_title',
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
            'key' => 'in-progress_list',
            'text' => ['en' => 'Lessons in progress list', 'fr' => 'Liste des leçons en cours'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'datetime_start',
            'text' => ['en' => 'Start datetime', 'fr' => 'Date et heure de début'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'datetime_end',
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
            'key' => 'results_last',
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
            'key' => 'results_last',
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
            'key' => 'password_update',
            'text' => ['en' => 'Update password', 'fr' => 'Mettre à jour le mot de passe'],
        ]);

        LanguageLine::create([
            'group' => 'profile',
            'key' => 'password_limitation',
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
            'key' => 'password_repeat',
            'text' => ['en' => 'Repeat password', 'fr' => 'Répéter le mot de passe'],
        ]);

        LanguageLine::create([
            'group' => 'exercises',
            'key' => 'results',
            'text' => ['en' => 'Résultats des exercices', 'fr' => 'Résultats des exercices'],
        ]);

        LanguageLine::create([
            'group' => 'composite-tests',
            'key' => 'results',
            'text' => ['en' => 'Résultats des composite tests', 'fr' => 'Résultats des tests composés'],
        ]);

        LanguageLine::create([
            'group' => 'games',
            'key' => 'results',
            'text' => ['en' => 'Résultats des challenges', 'fr' => 'Résultats des challenges'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'role',
            'text' => ['en' => 'Role', 'fr' => 'Rôle'],
        ]);

        LanguageLine::create([
            'group' => 'users',
            'key' => 'edit',
            'text' => ['en' => 'User edit', 'fr' => 'Modifier l\'utilisateur'],
        ]);

        LanguageLine::create([
            'group' => 'users',
            'key' => 'show',
            'text' => ['en' => 'User show', 'fr' => 'Voir l\'utilisateur'],
        ]);

        LanguageLine::create([
            'group' => 'users',
            'key' => 'delete',
            'text' => ['en' => 'User delete', 'fr' => 'Supprimer l\'utilisateur'],
        ]);

        LanguageLine::create([
            'group' => 'users',
            'key' => 'delete-this',
            'text' => ['en' => 'Delete the user :name', 'fr' => 'Supprimer l\'utilisateur :name'],
        ]);

        LanguageLine::create([
            'group' => 'users',
            'key' => 'edit-this',
            'text' => ['en' => 'Edit the user :name', 'fr' => 'Modifier l\'utilisateur :name'],
        ]);

        LanguageLine::create([
            'group' => 'users',
            'key' => 'add',
            'text' => ['en' => 'User add', 'fr' => 'Créer un utilisateur'],
        ]);

        LanguageLine::create([
            'group' => 'users',
            'key' => 'add_limitation',
            'text' => ['en' => 'Teachers can only create students.', 'fr' => 'Teachers can only create students.'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'teacher',
            'text' => ['en' => 'Teacher', 'fr' => 'Enseignant'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'admin',
            'text' => ['en' => 'Admin', 'fr' => 'Administrateur'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'action_irreversible',
            'text' => ['en' => 'Cette action est irréversible.', 'fr' => 'Cette action est irréversible.'],
        ]);

        LanguageLine::create([
            'group' => 'users',
            'key' => 'delete_sure',
            'text' => ['en' => 'Are you sure ?', 'fr' => 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?'],
        ]);

        LanguageLine::create([
            'group' => 'app',
            'key' => 'groups',
            'text' => ['en' => 'Groups', 'fr' => 'Groupes'],
        ]);

        LanguageLine::create([
            'group' => 'users',
            'key' => 'import_title',
            'text' => ['en' => 'Import users', 'fr' => 'Import users'],
        ]);

        LanguageLine::create([
            'group' => 'users',
            'key' => 'import_explanation',
            'text' => ['en' => 'You can import many users in one shot.', 'fr' => 'You can import many users in one shot.'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'file',
            'text' => ['en' => 'File', 'fr' => 'Fichier'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'email_suffix',
            'text' => ['en' => 'E-mail suffix', 'fr' => 'E-mail suffix'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'details',
            'text' => ['en' => 'Details', 'fr' => 'Détails'],
        ]);

        LanguageLine::create([
            'group' => 'permissions',
            'key' => 'manage',
            'text' => ['en' => 'Manage permissions', 'fr' => 'Gérer les permissions'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'save',
            'text' => ['en' => 'Save', 'fr' => 'Sauvegarder'],
        ]);

        LanguageLine::create([
            'group' => 'feature-flipping',
            'key' => 'explanation',
            'text' => ['en' => 'Features to enable or disable.', 'fr' => 'Features to enable or disable.'],
        ]);

        LanguageLine::create([
            'group' => 'config',
            'key' => 'explanation',
            'text' => ['en' => 'Params to configure.', 'fr' => 'Params to configure.'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'correction',
            'text' => ['en' => 'Correction', 'fr' => 'Correction'],
        ]);

        LanguageLine::create([
            'group' => 'users',
            'key' => 'import_email_suffix_explanation',
            'text' => ['en' => 'It will be used to generate e-mail addresses.', 'fr' => 'It will be used to generate e-mail addresses.'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'no-validate',
            'text' => ['en' => 'Not validate', 'fr' => 'Non validé'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'machine-name',
            'text' => ['en' => 'Machine name', 'fr' => 'Nom machine'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'dates',
            'text' => ['en' => 'Dates', 'fr' => 'Dates'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'date_start',
            'text' => ['en' => 'Start date', 'fr' => 'Date de début'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'date_end',
            'text' => ['en' => 'End date', 'fr' => 'Date de fin'],
        ]);

        LanguageLine::create([
            'group' => 'groups',
            'key' => 'show',
            'text' => ['en' => 'Show group', 'fr' => 'Voir le groupe'],
        ]);

        LanguageLine::create([
            'group' => 'groups',
            'key' => 'import_explanation',
            'text' => ['en' => 'You can create many groups by file import.', 'fr' => 'You can create many groups by file import.'],
        ]);

        LanguageLine::create([
            'group' => 'groups',
            'key' => 'add',
            'text' => ['en' => 'Group add', 'fr' => 'Créer un groupe'],
        ]);

        LanguageLine::create([
            'group' => 'groups',
            'key' => 'assign_explanation',
            'text' => ['en' => 'You can assign users in groups by file import.', 'fr' => 'You can assign users in groups by file import.'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'datetime',
            'text' => ['en' => 'Datetime', 'fr' => 'Date et heure'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'group',
            'text' => ['en' => 'Group', 'fr' => 'Groupe'],
        ]);

        LanguageLine::create([
            'group' => 'lessons',
            'key' => 'edit',
            'text' => ['en' => 'Lesson edit', 'fr' => 'Modifier la leçon'],
        ]);

        LanguageLine::create([
            'group' => 'lessons',
            'key' => 'show',
            'text' => ['en' => 'Lesson show', 'fr' => 'Voir la leçon'],
        ]);

        LanguageLine::create([
            'group' => 'lessons',
            'key' => 'delete',
            'text' => ['en' => 'Lesson delete', 'fr' => 'Supprimer la leçon'],
        ]);

        LanguageLine::create([
            'group' => 'form',
            'key' => 'datetime-local_format',
            'text' => ['en' => 'Format : YYYY-MM-DDTHH:MM (2018-06-07T00:00)', 'fr' => 'Format : YYYY-MM-DDTHH:MM (2018-06-07T00:00)'],
        ]);

        LanguageLine::create([
            'group' => 'lessons',
            'key' => 'delete_sure',
            'text' => ['en' => 'Are you sure ?', 'fr' => 'Êtes-vous sûr de vouloir supprimer cette leçon ?'],
        ]);

        LanguageLine::create([
            'group' => 'lessons',
            'key' => 'add',
            'text' => ['en' => 'Lesson add', 'fr' => 'Créer une leçon'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'content',
            'text' => ['en' => 'Content', 'fr' => 'Contenu'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'number',
            'text' => ['en' => 'number', 'fr' => 'Numéro'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'question',
            'text' => ['en' => 'Question', 'fr' => 'Question'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'proposal',
            'text' => ['en' => 'Proposal', 'fr' => 'Proposition'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'questions',
            'text' => ['en' => 'questions', 'fr' => 'questions'],
        ]);

        LanguageLine::create([
            'group' => 'documents',
            'key' => 'add',
            'text' => ['en' => 'Document add', 'fr' => 'Créer un document'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'type',
            'text' => ['en' => 'Type', 'fr' => 'Type'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'audio',
            'text' => ['en' => 'Audio', 'fr' => 'Audio'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'image',
            'text' => ['en' => 'Image', 'fr' => 'Image'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'graphic',
            'text' => ['en' => 'Graphic', 'fr' => 'Graphique / Visuel'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'text',
            'text' => ['en' => 'Text', 'fr' => 'Text'],
        ]);

        LanguageLine::create([
            'group' => 'documents',
            'key' => 'edit',
            'text' => ['en' => 'Document edit', 'fr' => 'Modifier le document'],
        ]);

        LanguageLine::create([
            'group' => 'form',
            'key' => 'no-edit',
            'text' => ['en' => 'Ce champ ne peut pas être modifié.', 'fr' => 'Ce champ ne peut pas être modifié.'],
        ]);

        LanguageLine::create([
            'group' => 'documents',
            'key' => 'text_warning',
            'text' => ['en' => 'Attention à la structure du texte dans le cas d\'un affichage inline (avec liste déroulante).', 'fr' => 'Attention à la structure du texte dans le cas d\'un affichage inline (avec liste déroulante).'],
        ]);

        LanguageLine::create([
            'group' => 'questions',
            'key' => 'delete_sure',
            'text' => ['en' => 'Are you sure ?', 'fr' => 'Êtes-vous sûr de vouloir supprimer cette question ?'],
        ]);

        LanguageLine::create([
            'group' => 'questions',
            'key' => 'add',
            'text' => ['en' => 'Question add', 'fr' => 'Créer une question'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'parts',
            'text' => ['en' => 'Parts', 'fr' => 'Types d\'exercice'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'answer',
            'text' => ['en' => 'Answer', 'fr' => 'Réponse'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'documents',
            'text' => ['en' => 'Documents', 'fr' => 'Documents'],
        ]);

        LanguageLine::create([
            'group' => 'questions',
            'key' => 'none-explanation',
            'text' => ['en' => 'Entrez \'#none\' pour avoir une question vide.', 'fr' => 'Entrez \'#none\' pour avoir une question vide.'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'explanation',
            'text' => ['en' => 'Explanation', 'fr' => 'Explication'],
        ]);

        LanguageLine::create([
            'group' => 'questions',
            'key' => 'edit',
            'text' => ['en' => 'Question edit', 'fr' => 'Modifier la question'],
        ]);

        LanguageLine::create([
            'group' => 'questions',
            'key' => 'show',
            'text' => ['en' => 'Question show', 'fr' => 'Voir la question'],
        ]);

        LanguageLine::create([
            'group' => 'questions',
            'key' => 'delete',
            'text' => ['en' => 'Question delete', 'fr' => 'Supprimer la question'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'statistics',
            'text' => ['en' => 'Statistics', 'fr' => 'Statistiques'],
        ]);

        LanguageLine::create([
            'group' => 'statistics',
            'key' => 'user-choice',
            'text' => ['en' => 'User choice', 'fr' => ' Valeur entrée'],
        ]);

        LanguageLine::create([
            'group' => 'statistics',
            'key' => 'success-rate',
            'text' => ['en' => 'Success rate', 'fr' => ' Taux de réussite'],
        ]);

        LanguageLine::create([
            'group' => 'statistics',
            'key' => 'number-passages',
            'text' => ['en' => 'Number of passages', 'fr' => 'Nombre de passages total'],
        ]);

        LanguageLine::create([
            'group' => 'parts',
            'key' => 'show',
            'text' => ['en' => 'Part show', 'fr' => 'Voir le type d\'exercice'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'visibility',
            'text' => ['en' => 'Visibility', 'fr' => 'Visibilité'],
        ]);

        LanguageLine::create([
            'group' => 'exercises',
            'key' => 'edit',
            'text' => ['en' => 'Exercise edit', 'fr' => 'Modifier l\'exercice'],
        ]);

        LanguageLine::create([
            'group' => 'exercises',
            'key' => 'show',
            'text' => ['en' => 'Exercise show', 'fr' => 'Voir l\'exercice'],
        ]);

        LanguageLine::create([
            'group' => 'exercises',
            'key' => 'delete',
            'text' => ['en' => 'Exercise delete', 'fr' => 'Supprimer l\'exercice'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'visibility_explanation',
            'text' => ['en' => '1 for public, 0 for private.', 'fr' => '1 for public, 0 for private.'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'complete-deletion',
            'text' => ['en' => 'Suppression complète', 'fr' => 'Suppression complète'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'complete-deletion_explanation',
            'text' => ['en' => 'La suppression complète d\'un exercice signifie que les questions / documents rattachés ne sont plus disponibles, y compris dans les modes challenges.', 'fr' => 'La suppression complète d\'un exercice signifie que les questions / documents rattachés ne sont plus disponibles, y compris dans les modes challenges.'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'warning',
            'text' => ['en' => 'Warning', 'fr' => 'Attention'],
        ]);

        LanguageLine::create([
            'group' => 'exercises',
            'key' => 'import_title',
            'text' => ['en' => 'Import an exercise', 'fr' => 'Importer un exercice'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'audios',
            'text' => ['en' => 'Audios', 'fr' => 'Audios'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'answers',
            'text' => ['en' => 'Answers', 'fr' => 'Answers'],
        ]);

        LanguageLine::create([
            'group' => 'form',
            'key' => 'txt-format_required',
            'text' => ['en' => 'Veuillez ajouter un fichier .txt.', 'fr' => 'Veuillez ajouter un fichier .txt.'],
        ]);

        LanguageLine::create([
            'group' => 'form',
            'key' => 'audios-file-format',
            'text' => ['en' => 'Veuillez ajouter un zip s\'il y a plusieurs fichiers audios. Sinon, vous pouvez ajouter un fichier MP3.', 'fr' => 'Veuillez ajouter un zip s\'il y a plusieurs fichiers audios. Sinon, vous pouvez ajouter un fichier MP3.'],
        ]);

        LanguageLine::create([
            'group' => 'composite-tests',
            'key' => 'edit',
            'text' => ['en' => 'Composite test edit', 'fr' => 'Modifier le test composé'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'reading-duration',
            'text' => ['en' => 'Reading duration', 'fr' => 'Durée de lecture'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'reading-duration_explanation',
            'text' => ['en' => 'Duration of reading exercises (in seconds)', 'fr' => 'Duration of reading exercises (in seconds)'],
        ]);

        LanguageLine::create([
            'group' => 'composite-tests',
            'key' => 'composition',
            'text' => ['en' => 'Composition du composite test', 'fr' => 'Composition du test composé'],
        ]);

        LanguageLine::create([
            'group' => 'composite-tests',
            'key' => 'composition_explanation',
            'text' => ['en' => 'Il faut contribuer les exercices de la partie "listening" avant ceux de la partie "reading". Le timer démarre avec les fichiers audios lorsqu\'un test est effectué par un étudiant.', 'fr' => 'Il faut contribuer les exercices de la partie "listening" avant ceux de la partie "reading". Le timer démarre avec les fichiers audios lorsqu\'un test est effectué par un étudiant.'],
        ]);

        LanguageLine::create([
            'group' => 'composite-tests',
            'key' => 'add',
            'text' => ['en' => 'Composite test add', 'fr' => 'Créer un test composé'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'description',
            'text' => ['en' => 'Description', 'fr' => 'Description'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'number-of-questions',
            'text' => ['en' => 'Nombre de questions', 'fr' => 'Nombre de questions'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'number-of-proposals',
            'text' => ['en' => 'Nombre de propositions', 'fr' => 'Nombre de propositions'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'questions-or-texts',
            'text' => ['en' => 'Questions or texts', 'fr' => 'Questions ou textes'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'files',
            'text' => ['en' => 'Files', 'fr' => 'Fichiers'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'listening',
            'text' => ['en' => 'Listening', 'fr' => 'Listening'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'reading',
            'text' => ['en' => 'Reading', 'fr' => 'Reading'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'texts',
            'text' => ['en' => 'Texts', 'fr' => 'Textes'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'inline',
            'text' => ['en' => 'Inline', 'fr' => 'Inline'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'inline_explanation',
            'text' => ['en' => 'Has an impact only for exercises which has texts.', 'fr' => 'Has an impact only for exercises which has texts.'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'yes',
            'text' => ['en' => 'Yes', 'fr' => 'Oui'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'no',
            'text' => ['en' => 'No', 'fr' => 'Non'],
        ]);

        LanguageLine::create([
            'group' => 'parts',
            'key' => 'delete_sure',
            'text' => ['en' => 'Are you sure ?', 'fr' => 'Êtes-vous sûr de vouloir supprimer ce type d\'exercices ?'],
        ]);

        LanguageLine::create([
            'group' => 'parts',
            'key' => 'add',
            'text' => ['en' => 'Part add', 'fr' => 'Créer un type d\'exercice'],
        ]);

        LanguageLine::create([
            'group' => 'explanations',
            'key' => 'add',
            'text' => ['en' => 'Explanation add', 'fr' => 'Créer une explication'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'title',
            'text' => ['en' => 'Title', 'fr' => 'Titre'],
        ]);

        LanguageLine::create([
            'group' => 'explanations',
            'key' => 'delete_sure',
            'text' => ['en' => 'Are you sure ?', 'fr' => 'Êtes-vous sûr de vouloir supprimer cette explication ?'],
        ]);

        LanguageLine::create([
            'group' => 'explanations',
            'key' => 'edit',
            'text' => ['en' => 'Explanation edit', 'fr' => 'Modifier l\'explication'],
        ]);

        LanguageLine::create([
            'group' => 'explanations',
            'key' => 'show',
            'text' => ['en' => 'Explanation show', 'fr' => 'Voir l\'explication'],
        ]);

        LanguageLine::create([
            'group' => 'explanations',
            'key' => 'delete',
            'text' => ['en' => 'Explanation delete', 'fr' => 'Supprimer l\'explication'],
        ]);

        LanguageLine::create([
            'group' => 'form',
            'key' => 'zip-format_required',
            'text' => ['en' => 'Veuillez ajouter un zip comprenant tous les fichiers.', 'fr' => 'Veuillez ajouter un zip comprenant tous les fichiers.'],
        ]);

        LanguageLine::create([
            'group' => 'parts',
            'key' => 'delete',
            'text' => ['en' => 'Part delete', 'fr' => 'Supprimer le type d\'exercice'],
        ]);

        LanguageLine::create([
            'group' => 'games',
            'key' => 'results_last',
            'text' => ['en' => 'Résultats des derniers challenges', 'fr' => 'Résultats des derniers challenges'],
        ]);

        LanguageLine::create([
            'group' => 'students',
            'key' => 'edit',
            'text' => ['en' => 'Student edit', 'fr' => 'Modifier l\'étudiant'],
        ]);

        LanguageLine::create([
            'group' => 'students',
            'key' => 'show',
            'text' => ['en' => 'Student show', 'fr' => 'Voir l\'étudiant'],
        ]);

        LanguageLine::create([
            'group' => 'students',
            'key' => 'delete',
            'text' => ['en' => 'Student delete', 'fr' => 'Supprimer l\'étudiant'],
        ]);

        LanguageLine::create([
            'group' => 'users',
            'key' => 'toeic-attribute-explanation',
            'text' => ['en' => 'Date of CLES or TOEIC success', 'fr' => 'Date of CLES or TOEIC success'],
        ]);

        LanguageLine::create([
            'group' => 'users',
            'key' => 'course-attribute-example',
            'text' => ['en' => 'Example: IMR2019', 'fr' => 'Example: IMR2019'],
        ]);


        LanguageLine::create([
            'group' => 'form',
            'key' => 'name_format',
            'text' => ['en' => 'Format : LASTNAME Firstname', 'fr' => 'Format : LASTNAME Firstname'],
        ]);

        LanguageLine::create([
            'group' => 'form',
            'key' => 'max-number-numbers_format',
            'text' => ['en' => 'Format : :number numbers maximum', 'fr' => 'Format : :number nombres maximum'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'close',
            'text' => ['en' => 'Close', 'fr' => 'Fermer'],
        ]);

        LanguageLine::create([
            'group' => 'questions',
            'key' => 'necessary-image',
            'text' => ['en' => 'Image necessary for this question', 'fr' => 'Image necessary for this question'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'show-image',
            'text' => ['en' => 'Image show', 'fr' => 'Voir l\'image'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'new-window',
            'text' => ['en' => 'Open in new window', 'fr' => 'Ouvrir dans une nouvelle fenêtre'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'back',
            'text' => ['en' => 'Back', 'fr' => 'Retour'],
        ]);

        LanguageLine::create([
            'group' => 'messages',
            'key' => 'get-x-points',
            'text' => ['en' => 'You get :number points.', 'fr' => 'Vous avez eu :number points.'],
        ]);

        LanguageLine::create([
            'group' => 'games',
            'key' => 'messages_complete-all-questions',
            'text' => ['en' => 'You complete all available questions', 'fr' => 'You complete all available questions'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'no-answer-submitted',
            'text' => ['en' => 'No answer submitted', 'fr' => 'No answer submitted'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'last-question',
            'text' => ['en' => 'Last question', 'fr' => 'Dernière question'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'your-false-answer',
            'text' => ['en' => 'Your (false) answer', 'fr' => 'Votre (fausse) réponse'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'other-answers',
            'text' => ['en' => 'Other answers', 'fr' => 'Autres propositions'],
        ]);

        LanguageLine::create([
            'group' => 'composite-tests',
            'key' => 'exercises-order',
            'text' => ['en' => 'Les exercices de type "listening" doivent être avant les exercices de type "reading".', 'fr' => 'Les exercices de type "listening" doivent être avant les exercices de type "reading".'],
        ]);

        LanguageLine::create([
            'group' => 'messages',
            'key' => 'password-updated',
            'text' => ['en' => 'Password has been updated.', 'fr' => 'Password has been updated.'],
        ]);

        LanguageLine::create([
            'group' => 'form',
            'key' => 'password-constraints',
            'text' => ['en' => 'Passwords have to be equals and respect format.', 'fr' => 'Passwords have to be equals and respect format.'],
        ]);

        LanguageLine::create([
            'group' => 'log',
            'key' => 'user-login',
            'text' => ['en' => 'User :name (:email) has been logged.', 'fr' => 'User :name (:email) has been logged.'],
        ]);

        LanguageLine::create([
            'group' => 'composite-tests',
            'key' => 'added',
            'text' => ['en' => 'L\'exercice composé a été créé.', 'fr' => 'L\'exercice composé a été créé.'],
        ]);

        LanguageLine::create([
            'group' => 'composite-tests',
            'key' => 'updated',
            'text' => ['en' => 'L\'exercice composé a bien été mis à jour.', 'fr' => 'L\'exercice composé a bien été mis à jour.'],
        ]);

        LanguageLine::create([
            'group' => 'config',
            'key' => 'updated',
            'text' => ['en' => 'Config has been saved.', 'fr' => 'Config has been saved.'],
        ]);

        LanguageLine::create([
            'group' => 'messages',
            'key' => 'error_config-update',
            'text' => ['en' => 'An error occured on :config update.', 'fr' => 'An error occured on :config update.'],
        ]);

        LanguageLine::create([
            'group' => 'documents',
            'key' => 'added',
            'text' => ['en' => 'Le document a été créé.', 'fr' => 'Le document a été créé.'],
        ]);

        LanguageLine::create([
            'group' => 'documents',
            'key' => 'updated',
            'text' => ['en' => 'Le document a été mis à jour.', 'fr' => 'Le document a été mis à jour.'],
        ]);

        LanguageLine::create([
            'group' => 'exercises',
            'key' => 'added',
            'text' => ['en' => 'L\'exercice a été créé.', 'fr' => 'L\'exercice a été créé.'],
        ]);

        LanguageLine::create([
            'group' => 'exercises',
            'key' => 'updated',
            'text' => ['en' => 'L\'exercice a été mis à jour.', 'fr' => 'L\'exercice a été mis à jour.'],
        ]);

        LanguageLine::create([
            'group' => 'exercises',
            'key' => 'deleted',
            'text' => ['en' => 'L\'exercice a été supprimé.', 'fr' => 'L\'exercice a été supprimé.'],
        ]);

        LanguageLine::create([
            'group' => 'messages',
            'key' => 'error-occured',
            'text' => ['en' => 'An error occured.', 'fr' => 'An error occured.'],
        ]);

        LanguageLine::create([
            'group' => 'exercises',
            'key' => 'imported',
            'text' => ['en' => 'L\'exercice a été importé.', 'fr' => 'L\'exercice a été importé.'],
        ]);

        LanguageLine::create([
            'group' => 'exercises',
            'key' => 'import-part_constraint',
            'text' => ['en' => 'You need to link an exercise to a part.', 'fr' => 'You need to link an exercise to a part.'],
        ]);

        LanguageLine::create([
            'group' => 'explanations',
            'key' => 'added',
            'text' => ['en' => 'L\'explication a été créée.', 'fr' => 'L\'explication a été créée.'],
        ]);

        LanguageLine::create([
            'group' => 'explanations',
            'key' => 'updated',
            'text' => ['en' => 'L\'explication a été mise à jour.', 'fr' => 'L\'explication a été mise à jour.'],
        ]);

        LanguageLine::create([
            'group' => 'explanations',
            'key' => 'deleted',
            'text' => ['en' => 'L\'explication a été supprimée.', 'fr' => 'L\'explication a été supprimée.'],
        ]);

        LanguageLine::create([
            'group' => 'explanations',
            'key' => 'questions_constraint',
            'text' => ['en' => 'Aucune question ne doit être rattachée à cette explication.', 'fr' => 'Aucune question ne doit être rattachée à cette explication.'],
        ]);

        LanguageLine::create([
            'group' => 'feature-flipping',
            'key' => 'updated',
            'text' => ['en' => 'Feature flipping has been saved.', 'fr' => 'Feature flipping has been saved.'],
        ]);

        LanguageLine::create([
            'group' => 'groups',
            'key' => 'added',
            'text' => ['en' => 'Le groupe a été créé.', 'fr' => 'Le groupe a été créé.'],
        ]);

        LanguageLine::create([
            'group' => 'groups',
            'key' => 'updated',
            'text' => ['en' => 'Le groupe a été mis à jour.', 'fr' => 'Le groupe a été mis à jour.'],
        ]);

        LanguageLine::create([
            'group' => 'groups',
            'key' => 'deleted',
            'text' => ['en' => 'Le groupe a été supprimé.', 'fr' => 'Le groupe a été supprimé.'],
        ]);

        LanguageLine::create([
            'group' => 'groups',
            'key' => 'unique_constraint',
            'text' => ['en' => 'A group with this name already exists.', 'fr' => 'A group with this name already exists.'],
        ]);

        LanguageLine::create([
            'group' => 'form',
            'key' => 'start-end-date_constraint',
            'text' => ['en' => 'Start date is after end date.', 'fr' => 'Start date is after end date.'],
        ]);

        LanguageLine::create([
            'group' => 'messages',
            'key' => 'these-groups-not-exist',
            'text' => ['en' => 'Following groups do not exist: ', 'fr' => 'Following groups do not exist : '],
        ]);

        LanguageLine::create([
            'group' => 'messages',
            'key' => 'these-students-not-exist',
            'text' => ['en' => 'Following students do not exist: ', 'fr' => 'Following students do not exist : '],
        ]);

        LanguageLine::create([
            'group' => 'groups',
            'key' => 'imported',
            'text' => ['en' => 'Le groupe a été importé.', 'fr' => 'Le groupe a été importé.'],
        ]);

        LanguageLine::create([
            'group' => 'messages',
            'key' => 'student-deleted-from-groups',
            'text' => ['en' => ':student has been deleted from group ":group".', 'fr' => ':student has been deleted from group ":group".'],
        ]);

        LanguageLine::create([
            'group' => 'messages',
            'key' => 'line-number',
            'text' => ['en' => '(l. :number)', 'fr' => '(l. :number)'],
        ]);

        LanguageLine::create([
            'group' => 'messages',
            'key' => 'user-not-teacher',
            'text' => ['en' => ':name is not a teacher.', 'fr' => ':name n\'est pas enseignant.'],
        ]);

        LanguageLine::create([
            'group' => 'groups',
            'key' => 'imported-in-this-file',
            'text' => ['en' => 'Group ":group" should be already imported in this file.', 'fr' => 'Group ":group" should be already imported in this file.'],
        ]);

        LanguageLine::create([
            'group' => 'lessons',
            'key' => 'added',
            'text' => ['en' => 'La leçon a été créée.', 'fr' => 'La leçon a été créée.'],
        ]);

        LanguageLine::create([
            'group' => 'lessons',
            'key' => 'updated',
            'text' => ['en' => 'La leçon a été mise à jour.', 'fr' => 'La leçon a été mise à jour.'],
        ]);

        LanguageLine::create([
            'group' => 'lessons',
            'key' => 'deleted',
            'text' => ['en' => 'La leçon a été supprimée.', 'fr' => 'La leçon a été supprimée.'],
        ]);

        LanguageLine::create([
            'group' => 'parts',
            'key' => 'added',
            'text' => ['en' => 'Le type d\'exercice a été créé.', 'fr' => 'Le type d\'exercice a été créé.'],
        ]);

        LanguageLine::create([
            'group' => 'parts',
            'key' => 'updated',
            'text' => ['en' => 'Le type d\'exercice a été mis à jour.', 'fr' => 'Le type d\'exercice a été mis à jour.'],
        ]);

        LanguageLine::create([
            'group' => 'parts',
            'key' => 'deleted',
            'text' => ['en' => 'Le type d\'exercice a été supprimé.', 'fr' => 'Le type d\'exercice a été supprimé.'],
        ]);

        LanguageLine::create([
            'group' => 'parts',
            'key' => 'delete_constraint',
            'text' => ['en' => 'Aucun exercice de ce type ne doit exister.', 'fr' => 'Aucun exercice de ce type ne doit exister.'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'inline_constraint',
            'text' => ['en' => 'Inline exercise must have texts and reading type.', 'fr' => 'Inline exercise must have texts and reading type.'],
        ]);

        LanguageLine::create([
            'group' => 'permissions',
            'key' => 'updated',
            'text' => ['en' => 'Permissions are saved.', 'fr' => 'Les permissions ont été mises à jour.'],
        ]);

        LanguageLine::create([
            'group' => 'questions',
            'key' => 'added',
            'text' => ['en' => 'La question a été créée.', 'fr' => 'La question a été créée.'],
        ]);

        LanguageLine::create([
            'group' => 'questions',
            'key' => 'updated',
            'text' => ['en' => 'La question a été mise à jour.', 'fr' => 'La question a été mise à jour.'],
        ]);

        LanguageLine::create([
            'group' => 'questions',
            'key' => 'deleted',
            'text' => ['en' => 'La question a été supprimée.', 'fr' => 'La question a été supprimée.'],
        ]);

        LanguageLine::create([
            'group' => 'questions',
            'key' => 'delete_games-constraint',
            'text' => ['en' => 'Il existe des challenges avec cette erreur.', 'fr' => 'Il existe des challenges avec cette erreur.'],
        ]);

        LanguageLine::create([
            'group' => 'questions',
            'key' => 'delete_trials-constraint',
            'text' => ['en' => 'Il existe des soumissions d\'exercice avec cette question.', 'fr' => 'Il existe des soumissions d\'exercice avec cette question.'],
        ]);

        LanguageLine::create([
            'group' => 'users',
            'key' => 'added',
            'text' => ['en' => 'L\'utilisateur a été créé.', 'fr' => 'L\'utilisateur a été créé.'],
        ]);

        LanguageLine::create([
            'group' => 'users',
            'key' => 'updated',
            'text' => ['en' => 'L\'utilisateur a été mis à jour.', 'fr' => 'L\'utilisateur a été mis à jour.'],
        ]);

        LanguageLine::create([
            'group' => 'users',
            'key' => 'deleted',
            'text' => ['en' => 'L\'utilisateur a été supprimé.', 'fr' => 'L\'utilisateur a été supprimé.'],
        ]);

        LanguageLine::create([
            'group' => 'students',
            'key' => 'deleted',
            'text' => ['en' => 'L\'étudiant a été supprimé.', 'fr' => 'L\'étudiant a été supprimé.'],
        ]);

        LanguageLine::create([
            'group' => 'users',
            'key' => 'unique_constraint',
            'text' => ['en' => 'Cet utilisateur existe déjà.', 'fr' => 'Cet utilisateur existe déjà.'],
        ]);

        LanguageLine::create([
            'group' => 'users',
            'key' => 'unique_constraints',
            'text' => ['en' => 'Un utilisateur avec ce matricule ou cette adresse e-mail existe déjà.', 'fr' => 'Un utilisateur avec ce matricule ou cette adresse e-mail existe déjà.'],
        ]);

        LanguageLine::create([
            'group' => 'users',
            'key' => 'imported',
            'text' => ['en' => 'Les utilisateurs ont été créés.', 'fr' => 'Les utilisateurs ont été créés.'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'already-exists',
            'text' => ['en' => 'already exists', 'fr' => 'existe déjà'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'not-passed',
            'text' => ['en' => 'Not passed', 'fr' => 'Non réalisé'],
        ]);

        LanguageLine::create([
            'group' => 'statistics',
            'key' => 'min-score',
            'text' => ['en' => 'min score', 'fr' => 'score minimal'],
        ]);

        LanguageLine::create([
            'group' => 'statistics',
            'key' => 'max-score',
            'text' => ['en' => 'max score', 'fr' => 'score maximal'],
        ]);

        LanguageLine::create([
            'group' => 'statistics',
            'key' => 'average',
            'text' => ['en' => 'average', 'fr' => 'moyenne'],
        ]);

        LanguageLine::create([
            'group' => 'statistics',
            'key' => 'standard-deviation',
            'text' => ['en' => 'standard deviation', 'fr' => 'écart-type'],
        ]);

        LanguageLine::create([
            'group' => 'statistics',
            'key' => 'median',
            'text' => ['en' => 'median', 'fr' => 'médiane'],
        ]);

        LanguageLine::create([
            'group' => 'statistics',
            'key' => 'title',
            'text' => ['en' => 'Statistics', 'fr' => 'Statistiques'],
        ]);

        LanguageLine::create([
            'group' => 'common',
            'key' => 'already-done',
            'text' => ['en' => 'Already done', 'fr' => 'Déjà réalisé'],
        ]);**/

        // @TODO : Here
        LanguageLine::create([
            'group' => 'common',
            'key' => 'number-trials',
            'text' => ['en' => 'Number of trials', 'fr' => 'Nombre de passages'],
        ]);
    }
}
