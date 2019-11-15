<template>
    <div>
        <div v-if="this.$store.getters.getRolesNumber > 1" class="profile--menu">
            <ul class="profile--menu-list">
                <li v-if="this.$store.getters.hasRole('student')" class="profile--menu-item student--item">
                    <a href="./profile" class="profile--menu-link">
                        <span>Student</span>
                    </a>
                </li>
                <li v-if="this.$store.getters.hasRole('teacher')" class="profile--menu-item teacher--item">
                    <a href="./profile" class="profile--menu-link">
                        <span>Teacher</span>
                    </a>
                </li>
                <li v-if="this.$store.getters.hasRole('admin')" class="profile--menu-item admin--item">
                    <a href="./profile" class="profile--menu-link">
                        <span>Admin</span>
                    </a>
                </li>
            </ul>
        </div>

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
