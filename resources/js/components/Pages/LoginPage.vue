<template>
    <main :style="cssVars" class="login-page">
        <div class="container">
            <div v-bind:class="[loginClasses]">
                <div class="form-container">
                    <h1>Login</h1>

                    <form method="POST" action="/login">
                        <input type="hidden" name="_token" :value="csrf">
                        <div class="field-container">
                            <label for="email">E-mail <span class="required">*</span></label>
                            <input type="email" id="email" name="email" required autofocus v-focus>
                        </div>

                        <div class="field-container">
                            <label for="password">Password <span class="required">*</span></label>
                            <input type="password" id="password" name="password" required>
                        </div>

                        <button type="submit" class="btn btn-primary">
                            Login
                        </button>
                    </form>

                    <a class="forgot-password" href="/password/reset">Forgot your password?</a>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
    export default {
        props: ['background'],
        data: function() {
            return {
                csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content')
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
            }
        },
        methods: {
        }
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
