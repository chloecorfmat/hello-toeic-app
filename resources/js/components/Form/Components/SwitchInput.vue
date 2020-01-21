<template>
    <fieldset class="switch-container">
        <label :class="'form-label-text ' + this.class">
            <span>{{ this.text }}</span>
            <input
                    type="checkbox"
                    class="switch-input"
                    v-bind:name="this.name"
                    v-bind:id="this.name"
                    v-on:change="toggle()"
                    v-bind:checked="this.checked"
            >
        </label>
    </fieldset>
</template>

<script>
    import store from '../../../store/store';

    export default {
        store,
        props: ['name', 'text', 'initial'],
        data: function() {
            return {
                checked: this.initial,
                class: this.initial == 'true' ? 'checked' : ''
            }
        },
        methods: {
            toggle: function() {
                if (this.checked) {
                    this.checked = false;
                    this.class = '';
                } else {
                    this.checked = true;
                    this.class = "checked"
                }
            }
        },
        created() {
        },
    }
</script>
