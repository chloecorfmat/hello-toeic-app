/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import Vue from 'vue';
import 'es6-promise/auto';

import store from './store/store';

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))
Vue.component('base-footer', require('./components/Footer/BaseFooter.vue').default);
Vue.component('base-header', require('./components/Header/BaseHeader.vue').default);
Vue.component('content-flashs', require('./components/Content/Flashs/ContentFlashs').default);
Vue.component('content-header', require('./components/Content/Header/ContentHeader').default);
Vue.component('content-header-buttons', require('./components/Content/Header/ContentHeaderButtons').default);
Vue.component('breadcrumb', require('./components/Content/Header/Breadcrumb').default);
Vue.component('login-page', require('./components/Pages/LoginPage.vue').default);
Vue.component('base-table', require('./components/Tables/BaseTable.vue').default);

Vue.component('composite-test-create', require('./components/Form/CompositeTestCreate.vue').default);

Vue.directive('focus', {
    inserted: function (el) {
        el.focus()
    }
});

Vue.directive('click-outside', {
    bind: function (el, binding, vnode) {
        el.clickOutsideEvent = function (event) {
            // here I check that click was outside the el and his childrens
            if (!(el == event.target || el.contains(event.target))) {
                // and if it did, call method provided in attribute value
                vnode.context[binding.expression](event);
            }
        };
        document.body.addEventListener('click', el.clickOutsideEvent)
    },
    unbind: function (el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
    },
});

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    store,
});
