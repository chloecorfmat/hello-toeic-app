<template>
    <div class="field-container">
        <label :for="this.name" class="form-label-text">
            <span>{{ this.text }}</span>
        </label>
        <input type="text" :name="this.name" v-model="value" :id="this.name" :required="this.required">
    </div>
</template>

<script>
    import store from '../../../store/store';

    export default {
        store,
        props: ['name', 'text', 'initial', 'required'],
        data: function() {
            return {
                value: this.initial,
            }
        },
        methods: {
        },
        created() {
        },
    }
</script>
