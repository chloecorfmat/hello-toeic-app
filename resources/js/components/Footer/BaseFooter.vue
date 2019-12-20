<template>
    <footer v-bind:class="'footer theme-' + this.$store.state.activeTheme">
        <ul>
            <li><a href="/contact" class="footer--link">{{ this.neededTranslations.app_contact }}</a></li>
            <li>
                <a href="/files/gdpr.pdf" target="_blank" class="footer--link">
                    {{ this.neededTranslations.common_privacy_policy }} <i class="footer--ico fas fa-external-link-alt fa-xs" aria-hidden="true"></i>
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
                neededTranslations: {
                    "app_contact": "Contact",
                    "common_privacy_policy": "Privacy policy"
                }
            }
        },
        computed: {
        },
        created() {
            this.$store.watch(
                (state, getters) => getters.ready,
                (newValue, oldValue) => {
                    this.neededTranslations.app_contact = this.$store.getters.translationByKey('app_contact');
                    this.neededTranslations.common_privacy_policy = this.$store.getters.translationByKey('common_privacy_policy');
                }
            );
        },
        methods: {

        },

    }
</script>
