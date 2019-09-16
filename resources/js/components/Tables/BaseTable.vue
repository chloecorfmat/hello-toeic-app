<template>
    <div class="table">
        <div class="table--filters">

        </div>
        <div class="table-container is-visible">
            <table>
                <caption class="sr-only">Users list</caption>
                <thead>
                    <th>Matricule</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Actions</th>
                </thead>
                <tbody>
                    <tr v-for="user in users">
                        <td>{{ user.matricule }}</td>
                        <td>{{ user.name }}</td>
                        <td>Role</td>
                        <td>Actions</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="pagination-container">
            <base-pagination
                    v-on:changePage="changePage"
                    :current-page-data="this.currentPage"
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
            }
        }
    }
</script>










