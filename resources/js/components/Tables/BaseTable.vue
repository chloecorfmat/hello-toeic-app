<template>
    <div class="table tablev2">
        <div class="table--filters">
            <div class="field-container">
                <label for="search">Search</label>
                <input v-on:keyup="searchUsers" v-model="search" type="text" id="search" name="search" class="search">
            </div>
        </div>
        
        <div v-if="usersNb !== 0">
            <div class="table-container is-visible">
                <table>
                    <caption class="sr-only">Users list</caption>
                    <thead>
                    <th class="numeric-column">
                        <button class="sort">
                            ID <i class="fas fa-arrows-alt-v"></i>
                        </button>
                    </th>
                    <th>
                        <button class="sort">
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
                        <td class="numeric-column">{{ user.id }}</td>
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
            <div class="pagination-container">
                <base-pagination
                        v-on:changePage="changePage"
                        :current-page="this.currentPage"
                        :pages-number="this.pagesNumber"
                ></base-pagination>
            </div>
        </div>

        <div v-else>
            <p>Aucun résultat.</p>
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
                search: ""
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
                this.reloadUsers();
                let url = window.location.href.replace(/\/$/, "");;
                let lastParam = url.substring(url.lastIndexOf("/") + 1, url.length);
                if (parseInt(lastParam) !== this.currentPage) {
                    window.history.pushState("", "", url + '/' + this.currentPage);
                }
            },
            changePage: function (page) {
                if (this.currentPage !== page) {
                    let url = window.location.href.replace(/\/$/, "");;
                    let base_url = url.substring(0, url.lastIndexOf("/"));
                    window.history.pushState("", "", base_url + '/' + page);
                    this.currentPage = page;
                    this.reloadUsers();
                }
            },
            reloadUsers: function () {
                axios
                    .get('/api/users/' + this.currentPage + '?api_token=' + this.currentUser.api_token)
                    .then(response => (
                        this.users = response.data.users,
                            this.usersNb = response.data.users_nb,
                            this.pagesNumber = Math.ceil(response.data.users_nb/30)
                    ));
            },
            searchUsers: function () {
                axios
                    .get('/api/users/' + this.currentPage + '?api_token=' + this.currentUser.api_token + '&search=' + this.search)
                    .then(response => (
                        this.users = response.data.users,
                            this.usersNb = response.data.users_nb,
                            this.pagesNumber = Math.ceil(response.data.users_nb/30)
                    ));
            }
        }
    }
</script>










