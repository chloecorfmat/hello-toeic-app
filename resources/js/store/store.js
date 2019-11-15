import Vuex from 'vuex';
import Vue from 'vue';
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        translations_keys: [],
        translations_values: [],
        apiToken: '',
        roles: [],
        ready: false,
        currentUser: {},
        authenticated: false,
        activeMenu: 'student',
    },
    mutations: {
        translations(state, translations) {
            state.translations = translations;
        },
        setApiToken(state, apiToken) {
            state.apiToken = apiToken;
        },
        setCurrentUser(state, currentUser) {
            state.currentUser = currentUser;

            if (state.currentUser !== {}) {
                state.authenticated = true;
                state.activeMenu = window.location.pathname.split('/')[1];

                state.currentUser.roles.forEach(function(el) {
                    state.roles.push(el.name);
                });


            }
        },
        MUTATE_TRANS (state, data) {
            state.translations_keys = Object.keys(data);
            state.translations_keys.forEach(el => el.replace('-', '_'));
            state.translations_values = Object.values(data);

            state.ready = true;
        }
    },
    actions: {
        loadTranslations({commit, state }) {
                 return axios
                    .get('/api/translations?api_token=' + state.apiToken)
                    .then(response => (
                        commit('MUTATE_TRANS', response.data)
                    ));
        }
    },
    getters: {
        ready: state => state.ready,
        translationByKey: state => (key) => {
            const index = state.translations_keys.indexOf(key);
            return state.translations_values[index];
        },
        hasRole: state => (role) => {
            return state.roles.includes(role);
        },
        getRolesNumber: state => {
            return state.roles.length;
        }
    }
});
