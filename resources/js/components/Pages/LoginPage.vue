<template>
    <main :style="cssVars" class="login-page">
        <div class="container login-container">
            <div v-bind:class="[loginClasses]">
                <div class="form-container">
                    <h1>{{ this.neededTranslations.common_login }}</h1>

                    <div v-show="hasErrors" class="alert alert-error">
                        <ul>
                            <li v-for="error in JSON.parse(this.errors)">
                                <span class="important">{{ neededTranslations.common_error }}!</span> {{ error }}
                            </li>
                        </ul>
                    </div>

                    <form method="POST" action="/login">
                        <input type="hidden" name="_token" :value="csrf">
                        <div class="field-container">
                            <label for="email">{{ this.neededTranslations.common_email }} <span class="required">*</span></label>
                            <input type="email" id="email" name="email" required autofocus v-focus>
                        </div>

                        <div class="field-container">
                            <label for="password">{{ this.neededTranslations.common_password }} <span class="required">*</span></label>
                            <input type="password" id="password" name="password" required>
                        </div>

                        <button type="submit" class="btn btn-primary">
                            {{ this.neededTranslations.common_login }}
                        </button>
                    </form>

                    <a class="forgot-password" href="/password/reset">{{ this.neededTranslations.common_forgot_password }}</a>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
    import store from '../../store/store';

    export default {
        store,
        props: ['background', 'errors'],
        data: function() {
            return {
                csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                neededTranslations: {
                    "common_login": "Login",
                    "common_email": "E-mail",
                    "common_password": "Password",
                    "common_error": "Error",
                    "common_forgot_password": "Forgot your password?"
                }
            }
        },
        computed: {
            loginClasses() {
                var data = JSON.parse(this.background);
                return data.type + ' login';
            },
            cssVars() {
                var data = JSON.parse(this.background);
                return {
                    '--bg-image': 'url(\'/storage/' + data.url + '\')',
                    '--color': data.color,
                }
            },
            hasErrors() {
                var errors = JSON.parse(this.errors);
                if (errors.length > 0) {
                    return true;
                }
                return false;
            }
        },
        created() {
            this.$store.watch(
                (state, getters) => getters.ready,
                (newValue, oldValue) => {
                    this.neededTranslations.common_login = this.$store.getters.translationByKey('common_login');
                    this.neededTranslations.common_email = this.$store.getters.translationByKey('common_email');
                    this.neededTranslations.common_password = this.$store.getters.translationByKey('common_password');
                    this.neededTranslations.common_error = this.$store.getters.translationByKey('common_error');
                    this.neededTranslations.common_forgot_password = this.$store.getters.translationByKey('common_forgot_password');
                }
            );
        },
    }
</script>

<style scoped>
    main {
        color: var(--color);
        background-image: var(--bg-image);
        background-size: cover;
    }

    main * {
        font-family: 'Montserrat' !important;
    }

    .container {
        background: none;
    }

    @media screen and (min-width: 1020px) {
        .login.right {
            justify-content: flex-end;
        }

        .login.left {
            justify-content: flex-start;
        }

        .login.center {
            justify-content: center;
        }
    }


    .login .form-container {
        border-color: var(--color);
    }

    .field-container label,
    .field-container input,
    .field-container select,
    .field-container textarea {
        color: var(--color);
    }

    .btn {
        background-color: var(--color);
    }

    .btn:hover {
        filter: brightness(85%);
    }

    a {
        color: var(--color);
    }

    a:hover {
        filter: brightness(85%);
    }
</style>
