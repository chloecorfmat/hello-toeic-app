<template>
    <div v-bind:class="'content-header ' + this.theme + ' theme-' + this.$store.state.activeTheme">
        <breadcrumb v-if="this.breadcrumb" v-bind:breadcrumbData="this.breadcrumb"></breadcrumb>
        <h1>{{ this.title }}</h1>
        <p class="subtitle">{{ this.subtitle }}</p>
        <p v-if="this.description">{{ this.description }}</p>
        <content-header-buttons v-if="this.buttons"></content-header-buttons>
    </div>
</template>

<script>
    import Breadcrumb from "./Breadcrumb";
    import ContentHeaderButtons from "./ContentHeaderButtons";
    import store from '../../../store/store';

    export default {
        components: {ContentHeaderButtons, Breadcrumb},
        store,
        props: ['headerData'],
        data: function() {
            return {

            }
        },
        computed: {
            header: function () {
                return JSON.parse(this.headerData);
            },
            title: function () {
                return this.header.title;
            },
            subtitle: function () {
                return this.header.subtitle;
            },
            description: function () {
                return this.header.description;
            },
            breadcrumb: function () {
                return this.header.breadcrumb;
            },
            buttons: function () {
                return this.header.buttons;
            },
            theme: function () {
                return this.header.theme;
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
        methods: {

        },

    }
</script>

<style>

</style>
