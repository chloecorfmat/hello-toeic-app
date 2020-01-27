<template>
    <div role="group" class="toggle-states-fieldset">
        <legend>{{ name }}</legend>
        <div class="toggle-states-container">
            <btn-toggle-input
                    v-for="(option, key) in options"
                    :key="key"
                    :index="key"
                    :option="option"
                    :name="name"
                    :initial="isChecked(sync, option)"
            ></btn-toggle-input>
        </div>
    </div>
</template>

<script>
    import store from '../../../store/store';

    import BtnToggleInput from "./BtnToggleInput";

    export default {
        store,
        components: {BtnToggleInput},
        props: ['name', 'sync', 'options'],
        methods: {
            toggle: function() {
                if (this.checked) {
                    this.checked = false;
                    this.class = '';
                } else {
                    this.checked = true;
                    this.class = "checked"
                }
            },
            isChecked: function(arr, value) {
                if (arr.includes(value))
                    return true;

                return false;
            }
        },
        created() {
        },
    }
</script>
