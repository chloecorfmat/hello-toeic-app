<template>
    <div v-bind:class="'theme-' + this.$store.state.activeTheme">
        <form method="POST" action="/teacher/composite-tests">
            <input type="hidden" name="_token" :value="csrf">

            <div class="field-container">
                <label for="name">{{ this.neededTranslations.common_name }} <span class="required">*</span></label>
                <input type="text" name="name" id="name" v-model="values.name" required>
            </div>

            <div class="field-container">
                <label for="version">{{ this.neededTranslations.common_version }} <span class="required">*</span></label>
                <input type="number" name="version" id="version" v-model="values.version" required>
            </div>

            <div class="field-container">
                <input type="checkbox"
                       id="visibility"
                       name="visible"
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

                <div v-for="n in 7">
                    <label class="typo__label" :for="'exercise_' + n">Exercise {{ n }}</label>
                    <multiselect
                            :id="'exercise_' + n "
                            v-model="values.exercises[n]"
                            placeholder="Search"
                            label="name"
                            track-by="id"
                            :options="options"
                            :multiple="true"
                            :taggable="true"
                    >
                    </multiselect>
                </div>
            </fieldset>

            <input type="hidden" :value="JSON.stringify(values.exercises)" name="exercises">

            <button type="submit" class="btn">
                Validate
            </button>
        </form>
    </div>
</template>

<script>
    import store from '../../../store/store';
    import Multiselect from 'vue-multiselect';

    export default {
        store,
        components: {Multiselect},
        props: ['exercises'],
        data: function() {
            return {
                csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                values: {
                    name: '',
                    version: '',
                    visibility: 0,
                    readingDuration: 0,
                    exercises: []
                },
                neededTranslations: {
                    "common_name" : "Name",
                    "common_version" : "Version",
                    "common_visibility" : "Visibility",
                    "common_visibility_explanation" : "1 for public, 0 for private.",
                    "common_reading_duration" : "Reading duration",
                    "composite_tests_composition" : "Composition du composite test",
                    "composite_tests_composition_explanation" : "The listening exercises must all be added before the reading exercises. The timer will start with the audio files when a students starts a test."
                }
            }
        },
        computed: {
            options: function () {
                let obj = [];
                JSON.parse(this.exercises).forEach(function (el){
                    obj.push({ id: el.id, name: el.name })
                });
                return obj;
            }
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

