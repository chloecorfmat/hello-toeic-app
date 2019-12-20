<template>
        <transition name="actions--fade">
            <div v-if="this.displayed" class="table--actions">
                <button v-on:click="hideActions" class="btn-close" :title="this.neededTranslations.common_close" id="actions--btn-close" v-focus>
                    <i class="fas fa-times fa-2x"></i>
                </button>
                <h3>{{ this.neededTranslations.common_actions }}</h3>
                <div class="actions--content">
                    <div class="actions--details">
                        <p><span class="important">{{ user.name }}</span> <a v-bind:href="'mailto:' + user.email" v-bind:class="'actions--email'">{{ user.email }}</a></p>

                    </div>
                    <div class="actions--list">
                        <ul>
                            <li>
                                <a v-bind:href="this.baseUrl + '/teacher/users/' + user.id">
                                    <i class="fas fa-eye"></i> {{ this.neededTranslations.users_show }}
                                </a>
                            </li>
                            <li v-if="this.isStudent">
                                <a v-bind:href="this.baseUrl + '/teacher/users/' + user.id + '/edit'">
                                    <i class="fas fa-pencil-alt"></i> {{ this.neededTranslations.users_edit }}
                                </a>
                            </li>
                            <li v-if="this.isStudent">
                                <a v-bind:href="this.baseUrl + '/teacher/users/delete/' + user.id">
                                    <i class="fas fa-trash"></i> {{ this.neededTranslations.users_delete }}
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
                neededTranslations: {
                    "common_actions": "Actions",
                    "users_show": "User show",
                    "users_edit": "User edit",
                    "users_delete": "User delete",
                    "common_close": "Close"
                }
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

                    if ((user.roles.length === 1) && user.roles[0].name === 'student' ) {
                        this.isStudent = true;
                    }

                    this.displayActions();
                }
            },
            refresh: function() {
                this.displayActions();
            }
        },
        created() {
            this.$store.watch(
                (state, getters) => getters.ready,
                (newValue, oldValue) => {
                    this.neededTranslations.common_actions = this.$store.getters.translationByKey('common_actions');
                    this.neededTranslations.users_show = this.$store.getters.translationByKey('users_show');
                    this.neededTranslations.users_edit = this.$store.getters.translationByKey('users_edit');
                    this.neededTranslations.users_delete = this.$store.getters.translationByKey('users_delete');
                    this.neededTranslations.common_close = this.$store.getters.translationByKey('common_close');
                }
            );
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
