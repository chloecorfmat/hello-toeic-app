<template>
    <label
            :for="name + '-' + index"
            :class="{ 'checked': checked, 'btn-input': 1}"
    >
        <input
                type="checkbox"
                :name="name + '[]'"
                :value="index"
                :id="name + '-' + index"
                :checked="checked"
                v-on:change="toggle"
        >
        <span class="form-label-text">
            {{ option }}
        </span>
    </label>
</template>

<script>
    import store from '../../../store/store';

    export default {
        store,
        props: ['option', 'index', 'name', 'initial'],
        data: function () {
            return {
                checked: this.initial,
            }
        },
        methods: {
            toggle: function() {
                if (this.checked) {
                    this.checked = false;
                } else {
                    this.checked = true;
                }
            },
        },
        created() {
        },
    }
</script>
