<template>
    <div class="main-header">
        <div v-if="this.$store.getters.getRolesNumber > 1" class="profile--menu">
            <ul class="profile--menu-list">
                <li v-if="this.$store.getters.hasRole('student')" class="profile--menu-item student--item">
                    <a href="/profile" class="profile--menu-link">
                        <span v-bind:class="{ important: this.$store.state.activeProfile === 'student'}">{{ this.neededTranslations.common_student }}</span>
                    </a>
                </li>
                <li v-if="this.$store.getters.hasRole('teacher')" class="profile--menu-item teacher--item">
                    <a href="/teacher" class="profile--menu-link">
                        <span v-bind:class="{ important: this.$store.state.activeProfile === 'teacher'}">{{ this.neededTranslations.common_teacher }}</span>
                    </a>
                </li>
                <li v-if="this.$store.getters.hasRole('admin')" class="profile--menu-item admin--item">
                    <a href="/admin" class="profile--menu-link">
                        <span v-bind:class="{ important: this.$store.state.activeProfile === 'admin'}">{{ this.neededTranslations.common_admin }}</span>
                    </a>
                </li>
            </ul>
        </div>

        <header v-bind:class="'header theme-' + this.$store.state.activeTheme">
            <div class="header--part header--logo">
                <a href="/profile">
                    <img src="/svg/hello-toeic-small.svg" alt="">
                    Hello Toeic
                </a>
            </div>
            <div class="header--part header--menu" v-click-outside="closeSubmenu">
                <nav v-if="Object.keys(this.$store.state.currentUser).length !== 0">
                    <ul v-if="this.$store.state.activeProfile === 'admin'">
                        <li class="header--menu-item" id="adminMenu">
                            <a href="/admin" v-bind:class="this.$store.state.activeTrail == 'admin' ? 'active' : ''">
                                {{ this.neededTranslations.common_admin }}
                            </a>
                        </li>
                    </ul>
                    <ul v-else-if="this.$store.state.activeProfile === 'teacher'">
                        <!-- Add class="active" -->
                        <li class="header--menu-item" id="teacherUsersMenu">
                            <button v-on:click="toggleSubmenu('teacherUsersSubmenu')" v-bind:class="this.$store.state.activeTrail == 'teacher-users' ? 'active' : ''">
                                {{ this.neededTranslations.users_manage }}
                            </button>
                            <ul class="submenu" id="teacherUsersSubmenu">
                                <li class="submenu--item">
                                    <a href="/teacher/users">Users list</a>
                                </li>
                                <li class="submenu--item">
                                    <a href="/teacher/students">Students list</a>
                                </li>
                                <li class="submenu--item">
                                    <a href="/teacher/groups">Groups list</a>
                                </li>
                                <li class="submenu--item">
                                    <a href="/teacher/lessons">Lessons list</a>
                                </li>
                                <li class="submenu--item">
                                    <a href="/teacher/messages">Messages list</a>
                                </li>
                            </ul>
                        </li>
                        <li class="header--menu-item" id="teacherExercisesMenu">
                            <button v-on:click="toggleSubmenu('teacherExercisesSubmenu')" v-bind:class="this.$store.state.activeTrail == 'teacher-exercises' ? 'active' : ''">
                                {{ this.neededTranslations.exercises_manage }}
                            </button>
                            <ul class="submenu" id="teacherExercisesSubmenu">
                                <li class="submenu--item">
                                    <a href="/teacher/exercises">Exercises list</a>
                                </li>
                                <li class="submenu--item">
                                    <a href="/teacher/composite-tests">Composite tests list</a>
                                </li>
                                <li class="submenu--item">
                                    <a href="/teacher/parts">Parts list</a>
                                </li>
                                <li class="submenu--item">
                                    <a href="/teacher/questions">Questions list</a>
                                </li>
                                <li class="submenu--item">
                                    <a href="/teacher/documents">Documents list</a>
                                </li>
                                <li class="submenu--item">
                                    <a href="/teacher/explanations">Explanations list</a>
                                </li>
                            </ul>
                        </li>
                        <li class="header--menu-item" id="teacherResultsMenu">
                            <button v-on:click="toggleSubmenu('teacherResultsSubmenu')" v-bind:class="this.$store.state.activeTrail == 'teacher-results' ? 'active' : ''">
                                {{ this.neededTranslations.app_see_results }}
                            </button>
                            <ul class="submenu" id="teacherResultsSubmenu">
                                <li class="submenu--item">
                                    <a href="/teacher/results/exercises">Résultats des exercices</a>
                                </li>
                                <li class="submenu--item">
                                    <a href="/teacher/results/composite-tests">Résultats des tests composés</a>
                                </li>
                                <li class="submenu--item">
                                    <a href="/teacher/results/games">Résultats des challenges</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <ul v-else>
                        <!-- Add class="active" -->
                        <li class="header--menu-item" id="studentCompositeTestsMenu">
                            <a href="/composite-tests" v-bind:class="this.$store.state.activeTrail == 'student-composite-tests' ? 'active' : ''">Composite tests</a>
                        </li>
                        <li class="header--menu-item" id="studentExercisesMenu">
                            <a href="/exercises" v-bind:class="this.$store.state.activeTrail == 'student-exercises' ? 'active' : ''">Exercises</a>
                        </li>
                        <li class="header--menu-item" id="studentChallengesMenu">
                            <a href="/games" v-bind:class="this.$store.state.activeTrail == 'student-challenges' ? 'active' : ''">Challenge mode</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="header--part">
                <ul class="header--actions-list">
                    <li v-if="Object.keys(this.$store.state.currentUser).length === 0" class="header--actions-list-item">
                        <a href="/login">
                            <span>{{ this.neededTranslations.common_login }}</span>
                        </a>
                    </li>

                    <li v-if="Object.keys(this.$store.state.currentUser).length !== 0" class="header--actions-list-item">
                        <a v-bind:href="'/teacher/users/' + this.$store.state.currentUser.id">
                            <div v-if="this.$store.state.currentUser.picture" class="user-picture--container user-picture--header">
                                <img v-bind:src="this.$store.state.currentUser.picture" alt="" class="user-picture">
                            </div>
                            <i v-else class="user-ico fas fa-user-circle fa-lg"></i>

                            <span class="legend-ico">{{ this.neededTranslations.app_profile }}</span>
                        </a>
                    </li>
                    <li v-if="Object.keys(this.$store.state.currentUser).length !== 0" class="header--actions-list-item">
                        <a href="/logout">
                            <i class="fas fa-power-off fa-lg"></i>
                            <span class="legend-ico">{{ this.neededTranslations.common_logout }}</span>
                        </a>
                    </li>
                    <li class="header--actions-list-item">
                        <a v-if="lang == 'fr'" href="/locale/en">
                            <country-flag country='gb'/>
                            <span class="legend-ico">English</span>
                        </a>
                        <a v-if="lang == 'en'" href="/locale/fr">
                            <country-flag country='fr'/>
                            <span class="legend-ico">Français</span>
                        </a>
                    </li>
                </ul>
            </div>
        </header>
    </div>
</template>

<script>
    import CountryFlag from 'vue-country-flag'

    import store from '../../store/store';
    import {mapState} from 'vuex';

    export default {
        store,
        components: {CountryFlag},
        props: ['currentUserData', 'activeTrailData', 'lang'],
        data: function() {
            return {
                'isOpened': null,
                'isActive': null,
                neededTranslations: {
                    "common_student" : "Student",
                    "common_teacher" : "Teacher",
                    "common_admin" : "Admin",
                    "users_manage": "Manage users",
                    "exercises_manage": "Manage exercises",
                    "app_see_results": "Show results",
                    "common_login": "Login",
                    "common_logout": "Logout",
                    "app_profile": "Profile"
                }
            }
        },
        created() {
            this.$store.watch(
                (state, getters) => getters.ready,
                (newValue, oldValue) => {
                    // Manage translations.
                    this.neededTranslations.common_student = this.$store.getters.translationByKey('common_student');
                    this.neededTranslations.common_teacher = this.$store.getters.translationByKey('common_teacher');
                    this.neededTranslations.common_admin = this.$store.getters.translationByKey('common_admin');
                    this.neededTranslations.exercises_manage = this.$store.getters.translationByKey('exercises_manage');
                    this.neededTranslations.users_manage = this.$store.getters.translationByKey('users_manage');
                    this.neededTranslations.app_see_results = this.$store.getters.translationByKey('app_see_results');
                }
            );
        },
        beforeMount: function() {
            if (this.currentUser) {
                this.$store.commit('setLang', this.lang);
                this.$store.commit('setCurrentUser', this.currentUser);
                this.$store.commit('setApiToken', this.currentUser.api_token);
                this.$store.commit('setActiveTrail', this.activeTrailData);
                this.$store.dispatch('loadTranslations');
            }
        },
        computed: {
            ...mapState(['ready']),
            currentUser: function () {
                return JSON.parse(this.currentUserData);
            },
        },
        methods: {
            toggleSubmenu: function (id) {
                if (id === null) {
                    if (this.isOpened !== null) {
                        document.getElementById(this.isOpened).classList.remove('opened');
                        document.getElementById(this.isOpened).previousElementSibling.classList.toggle('submenu-opened');
                        document.getElementById(id).parentElement.classList.toggle('submenu-opened');
                    }
                    this.isOpened = null;
                } else {
                    if (this.isOpened === id) {
                        this.isOpened = null;
                    } else {
                        if (this.isOpened !== null) {
                            document.getElementById(this.isOpened).classList.remove('opened');
                            document.getElementById(this.isOpened).previousElementSibling.classList.toggle('submenu-opened');
                            document.getElementById(id).parentElement.classList.toggle('submenu-opened');
                        }
                        this.isOpened = id;
                    }

                    document.getElementById(id).classList.toggle('opened');
                    document.getElementById(id).previousElementSibling.classList.toggle('submenu-opened');
                    document.getElementById(id).parentElement.classList.toggle('submenu-opened');
                }
            },
            closeSubmenu: function () {
                if (this.isOpened !== null) {
                    document.getElementById(this.isOpened).classList.remove('opened');
                    document.getElementById(this.isOpened).previousElementSibling.classList.remove('submenu-opened');
                    document.getElementById(this.isOpened).parentElement.classList.remove('submenu-opened');
                    this.isOpened = null;
                }
            }
        }
    }
</script>

<style scoped>
    .main-header {
        position: relative;
    }

    .header--menu-item {
        position: relative;
        width: 100%;
        text-align: center;
    }

    .header--menu-item button {
        padding: .5rem 0;
    }

    .submenu {
        display: none;
    }

    .submenu.opened {
        display: block;
        position: initial;
        width: 100%;
        z-index: 1;
        text-align: left;
    }

    .submenu--item {
        display: block;
        margin: 0;
        padding: 0;
    }

    .submenu--item a {
        display: block;
        padding: .75rem 1rem;
        color: #fff;
        font-size: .8rem;
    }

    @media screen and (min-width: 1020px) {
        .header--menu-item {
            padding: 0;
            border: 0;
            width: 14rem;
        }

        .header--menu-item button {
            padding: 0;
        }

        .submenu.opened {
            position: absolute;
            top: 3rem;
            width: 14rem;
        }
    }
</style>
