<template>
    <form method="POST" action="/teacher/composite-tests">
        <div class="field-container">
            <label for="name">{{ this.neededTranslations.common_name }}</label>
            <input type="text" name="name" id="name" v-model="values.name">
        </div>

        <div class="field-container">
            <label for="version">{{ this.neededTranslations.common_version }}</label>
            <input type="number" name="version" id="version" v-model="values.version">
        </div>

        <div class="field-container">
            <input type="checkbox"
                   id="visibility"
                   name="visibility"
                   aria-describedby="visibility-description"
                   v-model="values.visibility"
            >
            <label for="visibility">{{ this.neededTranslations.common_visibility }}</label>
            <p id="visibility-description">{{ this.neededTranslations.common_visibility_explanation}}</p>
        </div>

        <div class="field-container">
            <label for="reading-duration">{{ this.neededTranslations.common_reading_duration }}</label>
            <input type="number"
                   name="reading-duration"
                   id="reading-duration"
                   v-model="values.readingDuration"
            >
        </div>

        <fieldset>
            <legend>{{ this.neededTranslations.composite_tests_composition}}</legend>
            <p>{{ this.neededTranslations.composite_tests_composition_explanation }}</p>
            <div v-for="n in 7" class="field-container">
                <label class="typo__label" :for="'exercise-' + n">Exercise {{ n }}</label>
                <multiselect
                    :id="'exercise-' + n "
                    :v-model="'values.exercise' + n"
                    placeholder="Search"
                    label="name"
                    track-by="code"
                    :options="options"
                    :multiple="true"
                    :taggable="true"
                >
                </multiselect>
            </div>
        </fieldset>
    </form>
</template>

<script>
    import store from '../../store/store';
    import Multiselect from 'vue-multiselect';

    export default {
        store,
        components: {Multiselect},
        props: [],
        data: function() {
            return {
                values: {
                    name: '',
                    version: '',
                    visibility: 0,
                    readingDuration: 0,
                    exercise1: '',
                    exercise2: '',
                    exercise3: '',
                    exercise4: '',
                    exercise5: '',
                    exercise6: '',
                    exercise7: '',
                },
                options: [
                    { name: 'Vue.js', code: 'vu' },
                    { name: 'Javascript', code: 'js' },
                    { name: 'Open Source', code: 'os' }
                ],
                neededTranslations: {
                    "common_name" : "Name",
                    "common_version" : "Version",
                    "common_visibility" : "Visibility",
                    "common_visibility_explanation" : "1 for public, 0 for private.",
                    "common_reading_duration" : "Reading duration",
                    "composite_tests_composition" : "Composition du composite test",
                    "composite_tests_composition_explanation" : "The listening exercises must all be added before the reading exercises. The timer will start with the audio files when a students starts a test.",
                }
            }
        },
        computed: {
        },
        created() {
            this.$store.watch(
                (state, getters) => getters.ready,
                (newValue, oldValue) => {
                    this.neededTranslations.common_name = this.$store.getters.translationByKey('common_name');
                    this.neededTranslations.common_version = this.$store.getters.translationByKey('common_version');
                    this.neededTranslations.common_visibility = this.$store.getters.translationByKey('common_visibility');
                    this.neededTranslations.common_visibility_explanation = this.$store.getters.translationByKey('common_visibility_explanation');
                    this.neededTranslations.common_reading_duration = this.$store.getters.translationByKey('common_reading_duration');
                    this.neededTranslations.composite_tests_composition = this.$store.getters.translationByKey('composite_tests_composition');
                    this.neededTranslations.composite_tests_composition_explanation = this.$store.getters.translationByKey('composite_tests_composition_explanation');
                }
            );
        },
        methods: {
        },

    }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
    form {
        flex-grow: 1;
    }

    .multiselect__tag {
        background: #66a810;
    }
</style>

