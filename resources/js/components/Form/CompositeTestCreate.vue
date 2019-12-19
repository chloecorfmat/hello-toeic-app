<template>
    <form action="">
        <div>
            <label class="typo__label">Tagging</label>
            <multiselect
                    v-model="value"
                    placeholder="Search"
                    label="name"
                    track-by="code"
                    :options="options"
                    :multiple="true"
                    :taggable="true"
            >
            </multiselect>
        </div>
        <div>
            <label class="typo__label">Tagging</label>
            <multiselect
                    v-model="value"
                    placeholder="Search"
                    label="name"
                    track-by="code"
                    :options="options"
                    :multiple="true"
                    :taggable="true"
            >
            </multiselect>
        </div>
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
                value: [
                    { name: 'Javascript', code: 'js' }
                ],
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

