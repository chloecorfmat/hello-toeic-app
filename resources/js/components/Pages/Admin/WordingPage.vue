<template>
    <div v-bind:class="'main-content content-with-spaces theme-' + this.$store.state.activeTheme">
        <div class="space">
            <h2>Translate interface</h2>
            <form method="POST" action="/admin/wordings">
                <input type="hidden" name="_token" :value="csrf">

                <div v-for="wording in wordings" :key="wording.id">
                    <fieldset>
                        <legend>{{ wording.group }}.{{ wording.key}}</legend>
                        <div class="fields">
                            <text-input
                                    v-for="(value, lang) in wording.text"
                                    :key="lang"
                                    :name="wording.group + '.' + wording.key + '.' + lang"
                                    :text="lang"
                                    :initial="value"
                                    :required="true"
                            ></text-input>
                        </div>
                    </fieldset>
                </div>
                
                <button type="submit" class="btn btn-primary">
                    {{ this.neededTranslations.common_save }}
                </button>
            </form>
        </div>
    </div>
</template>

<script>
    import store from '../../../store/store';
    import axios from "axios";
    import TextInput from "../../Form/Components/TextInput";

    export default {
        store,
        components: {TextInput},
        data: function() {
            return {
                csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                wordings: [],
                neededTranslations: {
                    "common_save": "Save",
                }
            }
        },
        beforeMount: function () {
          this.loadTranslations();
        },
        created() {
            this.$store.watch(
                (state, getters) => getters.ready,
                (newValue, oldValue) => {
                    this.neededTranslations.common_save = this.$store.getters.translationByKey('common_save');
                }
            );
        },
        methods: {
            loadTranslations: function() {
                axios
                    .get('/api/wording?api_token=' + this.$store.state.apiToken)
                    .then(response => (
                        this.wordings = response.data
                    ));
            },
        }
    }
</script>
