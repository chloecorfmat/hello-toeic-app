<template>
    <footer v-bind:class="'footer theme-' + this.$store.state.activeTheme">
        <ul>
            <li><a href="/contact" class="footer--link">Contact</a></li>
            <li>
                <a href="/files/gdpr.pdf" target="_blank" class="footer--link">
                    Privacy policy <i class="footer--ico fas fa-external-link-alt fa-xs" aria-hidden="true"></i>
                </a>
            </li>
            <li><p>2019</p></li>
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
