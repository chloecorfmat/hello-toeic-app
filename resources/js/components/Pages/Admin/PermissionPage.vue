<template>
    <div v-bind:class="'main-content content-with-spaces theme-' + this.$store.state.activeTheme">
        <div class="space">
            <h2>Update permissions</h2>
            <form method="POST" action="/admin/permissions">
                <input type="hidden" name="_token" :value="csrf">

                <btns-toggle-input
                        v-for="(sync, permission) in permissions"
                        :key="permission"
                        :name="permission"
                        :sync="sync"
                        :options="$store.state.roles"
                        >
                        </btns-toggle-input>

                <button type="submit" class="btn btn-primary">
                    {{ this.neededTranslations.common_save }}
                </button>
            </form>
        </div>
    </div>
</template>

<script>
    import store from '../../../store/store';
    import axios from "axios";
    import BtnsToggleInput from "../../Form/Components/BtnsToggleInput";

    export default {
        store,
        components: {BtnsToggleInput},
        data: function() {
            return {
                csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                permissions: [],
                neededTranslations: {
                    "common_save": "Save",
                }
            }
        },
        beforeMount: function () {
          this.loadTranslations();
        },
        created() {
            this.$store.watch(
                (state, getters) => getters.ready,
                (newValue, oldValue) => {
                    this.neededTranslations.common_save = this.$store.getters.translationByKey('common_save');
                }
            );
        },
        methods: {
            loadTranslations: function() {
                const config = {
                    headers: { Authorization: `Bearer ${this.$store.state.apiToken}` }
                };

                axios
                    .get('/api/permission', config)
                    .then(response => (
                        this.permissions = response.data
                    ));
            },
        }
    }
</script>
