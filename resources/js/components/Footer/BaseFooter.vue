<template>
    <footer>
        <ul>
            <li><a href="">Contact</a></li>
            <li><a href="">Privacy policy</a></li>
            <li>2019</li>
        </ul>
    </footer>
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
