<template>
    <form method="POST" action="/teacher/composite-tests">
        <div class="field-container">
            <label for="name">Name</label>
            <input type="text" name="name" id="name" v-model="values.name">
        </div>

        <div class="field-container">
            <label for="version">Version</label>
            <input type="number" name="version" id="version" v-model="values.version">
        </div>

        <div class="field-container">
            <input type="checkbox"
                   id="visibility"
                   name="visibility"
                   aria-describedby="visibility-description"
                   v-model="values.visibility"
            >
            <label for="visibility">Visibility</label>
            <p id="visibility-description">1 for public, 0 for private.</p>
        </div>

        <div class="field-container">
            <label for="reading-duration">Reading duration</label>
            <input type="number"
                   name="reading-duration"
                   id="reading-duration"
                   v-model="values.readingDuration"
            >
        </div>

        <fieldset>
            <legend>Composite test composition</legend>
            <p>The listening exercises must all be added before the reading exercises. The timer will start with the audio files when a students starts a test.</p>
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
                ]
            }
        },
        computed: {
        },
        created() {
            this.$store.watch(
                (state, getters) => getters.ready,
                (newValue, oldValue) => {
                    // Manage translations.
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

