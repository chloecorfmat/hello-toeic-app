<template>
    <ul class="content-header--buttons">
        <li v-for="button in buttons" class="content-header--buttons--item">
            <a v-bind:href="button.url" v-bind:class="button.theme ? 'btn ' + button.theme : 'btn'">{{ button.title }}</a>
        </li>
    </ul>
</template>

<script>
    import store from '../../../store/store';

    export default {
        store,
        props: ['buttonsData'],
        data: function() {
            return {

            }
        },
        computed: {
            buttons: function () {
                return this.buttonsData;
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
