import Vuex from 'vuex';
import Vue from 'vue';
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        translations_keys: [],
        translations_values: [],
        apiToken: '',
        ready: false,
    },
    mutations: {
        translations(state, translations) {
            state.translations = translations;
        },
        setApiToken(state, apiToken) {
            state.apiToken = apiToken;
        },
        MUTATE_TRANS (state, data) {
            state.translations_keys = Object.keys(data);
            state.translations_values = Object.values(data);

            state.ready = true;
        }
    },
    actions: {
        loadTranslations({commit, state }) {
                var query = `; ${document.cookie}`.match(`;\\s*${'lang'}=([^;]+)`);
                var lang = query ? query[1] : 'en';

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
        }
    }
});
