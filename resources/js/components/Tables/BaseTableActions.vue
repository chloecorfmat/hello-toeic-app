<template>
        <transition name="actions--fade">
            <div v-if="this.displayed" class="table--actions">
                <button v-on:click="hideActions" class="btn-close" title="Close actions" id="actions--btn-close" v-focus>
                    <i class="fas fa-times fa-2x"></i>
                </button>
                <h3>Actions</h3>
                <div class="actions--content">
                    <div class="actions--details">
                        <p><span class="important">{{ user.name }}</span> <a v-bind:href="'mailto:' + user.email" v-bind:class="'actions--email'">{{ user.email }}</a></p>

                    </div>
                    <div class="actions--list">
                        <ul>
                            <li>
                                <a v-bind:href="this.baseUrl + '/admin/users/' + user.id">
                                    <i class="fas fa-eye"></i> Show
                                </a>
                            </li>
                            <li>
                                <a v-bind:href="this.baseUrl + '/admin/users/' + user.id + '/edit'">
                                    <i class="fas fa-pencil-alt"></i> Edit
                                </a>
                            </li>
                            <li v-if="this.isStudent">
                                <a v-bind:href="this.baseUrl + '/admin/users/delete/' + user.id">
                                    <i class="fas fa-trash"></i> Delete
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </transition>
</template>

<script>
    export default {
        props: ['user', 'refresh'],
        data: function() {
            return {
                displayed: false,
                isStudent: false,
            }
        },
        computed: {
          baseUrl: function() {
              return window.location.origin;
          }
        },
        watch: {
            user: function(user) {
                if (user) {
                    this.isStudent = false;

                    for (var i = 0; i < user.roles.length; i++) {
                        if (user.roles[i].name === 'student') {
                            this.isStudent = true;
                        }
                    }

                    this.displayActions();
                }
            },
            refresh: function() {
                this.displayActions();
            }
        },
        methods: {
            hideActions: function() {
                this.displayed = false;
            },
            displayActions: function() {
                this.displayed = true;

                if (document.getElementById('actions--btn-close')) {
                    document.getElementById('actions--btn-close').focus();
                }
            }
        }
    }
</script>
