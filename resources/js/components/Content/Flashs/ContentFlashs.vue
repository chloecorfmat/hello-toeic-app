<template>
    <div class="content-flashs">
        <ul v-for="(messages, type) in this.flashs" v-bind:class="'alert alert-' + type">
            <li v-for="message in messages">
                <span class="important">{{ label(type) }}!</span> <span v-html="message"></span>
            </li>
        </ul>
    </div>
</template>

<script>
    import store from '../../../store/store';

    export default {
        components: {Flash},
        store,
        props: ['flashsData'],
        data: function() {
            return {

            }
        },
        computed: {
            flashs: function () {
                return JSON.parse(this.flashsData);
            },
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
            label: function (type) {
                switch (type) {
                    case 'errors' :
                        return "Error";
                        break;
                    case 'successes':
                    case 'success':
                        return "Success";
                        break;
                }
            },
        },

    }
</script>
