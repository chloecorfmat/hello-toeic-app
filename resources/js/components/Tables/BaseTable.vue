<template>
    <div class="table tablev2">
        <div class="table--filters">
            <div class="field-container">
                <label for="search">{{ this.neededTranslations.common_search }}</label>
                <input v-on:keyup="searchUsers" v-model="search" type="text" id="search" name="search" class="search">
            </div>
        </div>

        <div v-if="users.length !== 0">
            <div class="table-container is-visible">
                <table>
                    <caption class="sr-only">{{ this.neededTranslations.users_list }}</caption>
                    <thead>
                    <th>
                        <button class="sort" v-on:click="sortBy('name')">
                            {{ this.neededTranslations.common_name }} <i class="fas fa-arrows-alt-v"></i>
                        </button>
                    </th>
                    <th>{{ this.neededTranslations.common_email }}</th>
                    <th class="numeric-column">{{ this.neededTranslations.common_matricule }}</th>
                    <th>{{ this.neededTranslations.common_role }}</th>
                    <th class="actions-column">{{ this.neededTranslations.common_actions }}</th>
                    </thead>
                    <tbody>
                    <tr v-for="user in users">
                        <td class="important">{{ user.name }}</td>
                        <td>
                            <a v-bind:href="'mailto:' + user.email">{{ user.email }}</a>
                        </td>
                        <td class="numeric-column">{{ user.matricule }}</td>
                        <td>
                            <ul>
                                <li v-for="role in user.roles">
                                    <span v-bind:class="'role role-' + role.name" v-bind:title="role.name"></span>
                                </li>
                            </ul>
                        </td>
                        <td class="actions-column">
                            <button v-on:click="userActions(user)">
                                <i class="actions-ico fas fa-ellipsis-h fa-lg"></i>
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div v-else>
            <p>{{ this.neededTranslations.common_no_result }}</p>
        </div>

        <div class="pagination-container">
            <base-pagination
                    v-on:changePage="changePage"
                    :current-page="this.currentPage"
                    :pages-number="this.pagesNumber"
            ></base-pagination>
        </div>

        <base-table-actions :user="this.userActionsData" :refresh="this.refreshActions"></base-table-actions>
    </div>
</template>

<script>
    import BasePagination from "../Paginations/BasePagination";
    import BaseTableActions from "./BaseTableActions";
    import axios from "axios";
    import store from '../../store/store';
    import {mapState} from 'vuex';

    export default {
        components: {BasePagination, BaseTableActions},
        store, // Enable store in component.
        props: ['currentUserData', 'currentPageData'],
        data: function() {
            return {
                users: [],
                usersNb: 0,
                pagesNumber: 1,
                currentPage: 1,
                userActionsData: null,
                refreshActions: 0,
                search: "",
                sorts: [
                    {
                        'name': 'name',
                        'active': false,
                        'type': 'desc'
                    }
                ],
                neededTranslations: {
                    "users_list" : "Users list",
                    "common_search": "Search",
                    "common_name": "Name",
                    "common_email": "E-mail",
                    "common_matricule": "Matricule",
                    "common_role": "Role",
                    "common_actions": "Actions",
                    "common_no_result": "No result.",
                }
            };
        },
        computed: {
            ...mapState(['ready']),
            currentUser: function () {
                return JSON.parse(this.currentUserData);
            },
        },
        created() {
            this.$store.watch(
                (state, getters) => getters.ready,
                (newValue, oldValue) => {
                    this.neededTranslations.users_list = this.$store.getters.translationByKey('users_list');
                    this.neededTranslations.common_search = this.$store.getters.translationByKey('common_search');
                    this.neededTranslations.common_name = this.$store.getters.translationByKey('common_name');
                    this.neededTranslations.common_email = this.$store.getters.translationByKey('common_email');
                    this.neededTranslations.common_matricule = this.$store.getters.translationByKey('common_matricule');
                    this.neededTranslations.common_role = this.$store.getters.translationByKey('common_role');
                    this.neededTranslations.common_actions = this.$store.getters.translationByKey('common_actions');
                    this.neededTranslations.common_no_result = this.$store.getters.translationByKey('common_no_result');

                }
            );
        },
        beforeMount: function() {
            this.currentPage = parseInt(this.currentPageData);
            this.list();

            this.$store.commit('setApiToken', this.currentUser.api_token);
            this.$store.dispatch('loadTranslations');
        },
        methods: {
            list: function () {
                let GETParams = this.getGETParameters();
                if (GETParams.search !== 'undefined') {
                    this.search = GETParams.search;
                }

                this.reloadUsers();
                let url = window.location.href.replace(/\/$/, "");;
                let lastParam = url.substring(url.lastIndexOf("/") + 1, url.length);
                if (parseInt(lastParam) !== this.currentPage) {
                    window.history.pushState("", "", url + '/' + this.currentPage);
                }
            },
            changePage: function (page) {
                if (this.currentPage !== page) {
                    this.currentPage = page;
                    this.buildUrl();
                }
            },
            userActions: function (user) {
                if (this.userActionsData == user) {
                    this.refreshActions++;
                } else {
                    this.userActionsData = user;
                }
            },
            reloadUsers: function () {
                let get_url = "";
                let gets = [];

                if (this.search !== '' && this.search !== undefined) {
                    gets.push({'search' : this.search});
                }

                this.sorts.forEach(function(el) {
                    if (el.active) {
                        gets.push({'sortBy' : el.name});
                        gets.push({'orderBy' : el.type });
                    }
                });

                if (gets.length !== 0) {
                    gets.forEach(function(el) {
                        get_url += Object.keys(el)[0] + "=" + Object.values(el)[0] + "&";
                    });
                }

                axios
                    .get('/api/users/' + this.currentPage + '?api_token=' + this.$store.state.apiToken + '&' + get_url)
                    .then(response => (
                        this.users = response.data.users,
                            this.usersNb = response.data.users_nb,
                            this.pagesNumber = Math.ceil(response.data.users_nb/30)
                    ));
            },
            searchUsers: function () {
                this.buildUrl();
            },
            sortBy: function (filter) {
                this.sorts.forEach(function(el) {
                    if (el.name === filter) {
                        el.active = true;
                        el.type = (el.type == 'asc' ? 'desc' : 'asc');
                    } else {
                        el.active = false;
                    }
                });

                this.buildUrl();
            },
            buildUrl: function () {
                let url = window.location.href.replace(/\/$/, "");
                let base_url = url.substring(0, url.lastIndexOf("/"));

                let gets = [];

                base_url += '/' + this.currentPage;

                if (this.search !== '' && this.search !== undefined) {
                    gets.push({'search' : this.search});
                }

                this.sorts.forEach(function(el) {
                    if (el.active) {
                        gets.push({'sortBy' : el.name});
                        gets.push({'orderBy' : el.type });
                    }
                });

                if (gets.length !== 0) {
                    base_url = base_url + "?";

                    gets.forEach(function(el) {
                        base_url += Object.keys(el)[0] + "=" + Object.values(el)[0] + "&";
                    });
                }

                window.history.pushState("", "", base_url);
                this.reloadUsers(gets);
            },
            getGETParameters: function () {
                var prmstr = window.location.search.substr(1);
                return prmstr != null && prmstr != "" ? this.transformToAssocArray(prmstr) : {};
            },
            transformToAssocArray: function (prmstr) {
                var params = {};
                var prmarr = prmstr.split("&");
                for ( var i = 0; i < prmarr.length; i++) {
                    var tmparr = prmarr[i].split("=");
                    params[tmparr[0]] = tmparr[1];
                }
                return params;
            },
        },
    }
</script>










