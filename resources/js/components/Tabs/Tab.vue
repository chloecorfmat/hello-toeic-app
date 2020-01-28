<template>
    <h1>Tab</h1>
    <slot name="content"></slot>
</template>

<script>
    import store from '../../store/store';

    export default {
        store,
        props: [],
        data: function() {
            return {

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
