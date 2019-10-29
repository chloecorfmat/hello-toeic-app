<template>
    <div class="table tablev2">
        <div class="table--filters">
            <div class="field-container">
                <label for="search">Search</label>
                <input v-on:keyup="searchUsers" v-model="search" type="text" id="search" name="search" class="search">
            </div>
        </div>

        <div v-if="users.length !== 0">
            <div class="table-container is-visible">
                <table>
                    <caption class="sr-only">Users list</caption>
                    <thead>
                    <th>
                        <button class="sort" v-on:click="sortBy('name')">
                            Name <i class="fas fa-arrows-alt-v"></i>
                        </button>
                    </th>
                    <th>E-mail</th>
                    <th class="numeric-column">Matricule</th>
                    <th>Role</th>
                    <th class="actions-column">Actions</th>
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
                                    <span v-bind:class="'role role-' + role.name"></span>{{ role.name }}
                                </li>
                            </ul>
                        </td>
                        <td class="actions-column">
                            <button>
                                <i class="actions-ico fas fa-ellipsis-h fa-lg"></i>
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div v-else>
            <p>Aucun résultat.</p>
        </div>

        <div class="pagination-container">
            <base-pagination
                    v-on:changePage="changePage"
                    :current-page="this.currentPage"
                    :pages-number="this.pagesNumber"
            ></base-pagination>
        </div>
    </div>
</template>

<script>
    import BasePagination from "../Paginations/BasePagination";
    import axios from "axios";

    export default {
        components: {BasePagination},
        props: ['currentUserData', 'currentPageData'],
        data: function() {
            return {
                users: [],
                usersNb: 0,
                pagesNumber: 1,
                currentPage: 1,
                search: "",
                sorts: [
                    {
                        'name': 'name',
                        'active': false,
                        'type': 'desc'
                    }
                ]
            };
        },
        computed: {
            currentUser: function () {
                return JSON.parse(this.currentUserData);
            },
        },
        beforeMount: function() {
            this.currentPage = parseInt(this.currentPageData);
            this.list();
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
                    .get('/api/users/' + this.currentPage + '?api_token=' + this.currentUser.api_token + '&' + get_url)
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
            }
        }
    }
</script>










