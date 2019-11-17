<template>
    <div>
        <div v-if="this.$store.getters.getRolesNumber > 1" class="profile--menu">
            <ul class="profile--menu-list">
                <li v-if="this.$store.getters.hasRole('student')" class="profile--menu-item student--item">
                    <a href="/profile" class="profile--menu-link">
                        <span v-bind:class="{ important: this.$store.state.activeMenu === 'student'}">Student</span>
                    </a>
                </li>
                <li v-if="this.$store.getters.hasRole('teacher')" class="profile--menu-item teacher--item">
                    <a href="/teacher" class="profile--menu-link">
                        <span v-bind:class="{ important: this.$store.state.activeMenu === 'teacher'}">Teacher</span>
                    </a>
                </li>
                <li v-if="this.$store.getters.hasRole('admin')" class="profile--menu-item admin--item">
                    <a href="/admin" class="profile--menu-link">
                        <span v-bind:class="{ important: this.$store.state.activeMenu === 'admin'}">Admin</span>
                    </a>
                </li>
            </ul>
        </div>

        <header class="header">
            <div class="header--part header--logo">
                <a href="/profile">
                    <img src="/svg/hello-toeic-small.svg" alt="">
                    Hello Toeic
                </a>
            </div>
            <div class="header--part header--menu">
                <nav v-if="Object.keys(this.$store.state.currentUser).length !== 0">
                    <ul v-if="this.$store.state.activeMenu === 'admin'">
                        <li><a class="active" href="/admin">Admin</a></li>
                    </ul>
                    <ul v-else-if="this.$store.state.activeMenu === 'teacher'">
                        <li><a class="active" href="/teacher">Teacher</a></li>
                    </ul>
                    <ul v-else>
                        <!-- Add class="active" -->
                        <li><a href="/composite-tests">Composite tests</a></li>
                        <li><a href="/exercises">Exercises</a></li>
                        <li><a href="/games">Challenge mode</a></li>
                    </ul>
                </nav>
            </div>
            <div class="header--part">
                <ul class="header--actions-list">
                    <li v-if="Object.keys(this.$store.state.currentUser).length === 0" class="header--actions-list-item">
                        <a href="/login">
                            <span>Login</span>
                        </a>
                    </li>

                    <li v-if="Object.keys(this.$store.state.currentUser).length !== 0" class="header--actions-list-item">
                        <a v-bind:href="'/teacher/users/' + this.$store.state.currentUser.id">
                            <div v-if="this.$store.state.currentUser.picture" class="user-picture--container user-picture--header">
                                <img v-bind:src="this.$store.state.currentUser.picture" alt="" class="user-picture">
                            </div>
                            <i v-else class="user-ico fas fa-user-circle fa-lg"></i>

                            <span class="legend-ico">Profile</span>
                        </a>
                    </li>
                    <li v-if="Object.keys(this.$store.state.currentUser).length !== 0" class="header--actions-list-item">
                        <a href="/contact">
                            <i class="fas fa-info-circle fa-lg"></i>
                            <span class="legend-ico">Contact</span>
                        </a>
                    </li>
                    <li v-if="Object.keys(this.$store.state.currentUser).length !== 0" class="header--actions-list-item">
                        <a href="/logout">
                            <i class="fas fa-power-off fa-lg"></i>
                            <span class="legend-ico">Logout</span>
                        </a>
                    </li>

                </ul>
            </div>
        </header>
    </div>
</template>

<script>
    import store from '../../store/store';
    import {mapState} from 'vuex';

    export default {
        store,
        props: ['currentUserData'],
        data: function() {
            return {

            }
        },
        created() {
            this.$store.watch(
                (state, getters) => getters.ready,
                (newValue, oldValue) => {
                    // Manage translations.
                }
            );
        },
        beforeMount: function() {
            if (this.currentUser) {
                this.$store.commit('setCurrentUser', this.currentUser);
                this.$store.commit('setApiToken', this.currentUser.api_token);
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

        }
    }
</script>
