<template>
    <tabs>
        <tab title="Composite tests">

        </tab>
        <tab title="Exercises">

        </tab>
        <tab title="Challenges">

        </tab>
    </tabs>
</template>

<script>
    import store from '../../../store/store';
    import Tab from "../../Tabs/Tab";

    export default {
        components: {Tab},
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
