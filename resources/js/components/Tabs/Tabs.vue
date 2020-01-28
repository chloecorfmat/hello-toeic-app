<template>
    <tab>
        <template v-slot:content>
            <p>Contenu</p>
        </template>
    </tab>
</template>

<script>
    import store from '../../store/store';

    import Tab from './Tab';

    export default {
        store,
        components: { Tabs },
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
