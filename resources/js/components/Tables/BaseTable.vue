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
                        <td>{{ user.name }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="pagination-container">
            <base-pagination v-on:test="toutou"></base-pagination>
        </div>
    </div>
</template>

<script>
    import BasePagination from "../Paginations/BasePagination";
    export default {
        components: {BasePagination},
        props: ['currentUserData'],
        data: function() {
            return {
                users: [],
                usersNb: [],
                currentPage: 1,
            };
        },
        computed: {
            // un accesseur (getter) calculé
            pagesNumber: function () {
                return Math.ceil(this.usersNb.length/30);
            },
            currentUser: function () {
                return JSON.parse(this.currentUserData);
            }
        },
        beforeMount: function() {
            this.list();
        },
        methods: {
            list: function () {
                axios
                    .get('/api/users/' + this.currentPage + '?api_token=' + this.currentUser.api_token)
                    .then(response => (
                        this.users = response.data.users,
                        this.usersNb = response.data.users_nb
                    ));
            },
            toutou: function (value) {
                this.currentPage = this.currentPage + 1;
            }
        }
    }
</script>










