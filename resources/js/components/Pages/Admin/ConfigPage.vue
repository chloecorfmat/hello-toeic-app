<template>
    <div v-bind:class="'main-content content-with-spaces theme-' + this.$store.state.activeTheme">
        <div class="space two-thirds">
            <h2>Update configuration</h2>
            <form method="POST" action="/admin/config">
                <input type="hidden" name="_token" :value="csrf">
                <text-input v-for="config in configs" :key="config.id" :name="config.key" :text="config.name" :initial="config.value" required="required"></text-input>

                <button type="submit" class="btn btn-primary">
                    {{ this.neededTranslations.common_save }}
                </button>
            </form>
        </div>
        <div class="space one-third">
            <h2>Feature flipping</h2>
            <form method="POST" action="/admin/feature-flipping">
                <input type="hidden" name="_token" :value="csrf">
                <switch-input v-for="feature in features" :key="feature.id" :name="feature.key" :text="feature.name" :initial="feature.value"></switch-input>
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
    import SwitchInput from "../../Form/Components/SwitchInput";
    import TextInput from "../../Form/Components/TextInput";

    export default {
        store,
        components: {SwitchInput, TextInput},
        data: function() {
            return {
                csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                features: [],
                configs: [],
                neededTranslations: {
                    "common_save": "Save",
                }
            }
        },
        beforeMount: function () {
          this.loadFeatures();
          this.loadConfigs();
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
            loadFeatures: function() {
                const config = {
                    headers: { Authorization: `Bearer ${this.$store.state.apiToken}` }
                };

                axios
                    .get('/api/feature', config)
                    .then(response => (
                        this.features = response.data
                    ));
            },
            loadConfigs: function() {
                const config = {
                    headers: { Authorization: `Bearer ${this.$store.state.apiToken}` }
                };

                axios
                    .get('/api/config', config)
                    .then(response => (
                        this.configs = response.data
                    ));
            }
        }
    }
</script>
