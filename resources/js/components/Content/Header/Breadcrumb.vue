<template>
    <ol class="breadcrumb">
        <li v-for="(item, index) in this.breadcrumb" class="breadcrumb-item">
            <a v-if="index < counter-1 " v-bind:href="item.url">{{ item.title }}</a>
            <p v-else>{{ item.title }}</p>
        </li>
    </ol>
</template>

<script>
    import store from '../../../store/store';

    export default {
        store,
        props: ['breadcrumbData'],
        data: function() {
            return {

            }
        },
        computed: {
            breadcrumb: function () {
                return this.breadcrumbData;
            },
            counter: function () {
                return this.breadcrumb.length;
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
