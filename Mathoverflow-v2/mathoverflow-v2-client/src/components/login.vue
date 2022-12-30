<template>
    <v-container fill-height>
        <v-row justify="center" align="center">
            <v-col justify="center" align="center">
                <v-card flat class="mt-15">
                    <v-img> </v-img>
                    <v-card-title
                        :class="[
                            'justify-center',
                            'text-h4',
                            'font-weight-light',
                            'blue--text',
                        ]"
                    >
                        {{ logInText }}
                    </v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-row justify="center" align="center">
                                <v-col cols="12" md="4">
                                    <v-text-field
                                        required
                                        v-model="username"
                                        :rules="usernameRules"
                                        label="Username"
                                        prepend-icon="mdi-account"
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row justify="center" align="center">
                                <v-col cols="12" md="4">
                                    <v-text-field
                                        v-if="inSignUp"
                                        required
                                        v-model="email"
                                        :rules="emailRules"
                                        label="Username"
                                        prepend-icon="mdi-email"
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row justify="center" align="center">
                                <v-col cols="12" md="4">
                                    <v-text-field
                                        required
                                        v-model="password"
                                        :rules="passwordRules"
                                        label="Password"
                                        prepend-icon="mdi-lock"
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            v-if="inLogIn"
                            @click="login"
                            small
                            class="px-11 py-2"
                            outlined
                            color="blue"
                        >
                            Login
                        </v-btn>
                        <v-btn
                            v-else-if="inSignUp"
                            @click="signUp"
                            small
                            class="px-11 py-2"
                            outlined
                            color="blue"
                        >
                            Sign Up
                        </v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                    <!--  -->
                    <v-row>
                        <v-col class="text-body-2">
                            <span v-if="inLogIn">
                                Don't have an account?
                                <span
                                    class="blue--text"
                                    style="cursor: pointer"
                                    @click="changeToSignUp"
                                    >Sign Up</span
                                >
                            </span>
                            <span v-else-if="inSignUp">
                                Already have an account?
                                <span
                                    class="blue--text"
                                    style="cursor: pointer"
                                    @click="changeToLogIn"
                                    >Login</span
                                >
                                &nbsp;
                            </span>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import router from "@/router";
import Vue, { PropType } from "vue";
import VueRouter from "vue-router";
import { getUsers, isLogged, postUserReputation, signIn, signUp } from "./functions";
//import User from "../user/user";
//import { nullObject, isNullObject, nullObjectConst } from "./null_object";
//import { storeCredentials, clearCredentials, getCredentials } from "./login";
export default Vue.extend({
    props: {
        /*user: {
            type: Object as PropType<User>,
            default: () => {
                const user: User | nullObject = nullObjectConst
                return user;
            }
        },*/
        flat: {
            type: Boolean,
            default: false
        },
        useSignUp: {
            type: Boolean,
            default: false
        },
        useLogin: {
            type: Boolean,
            default: true
        },
        showSnackbar: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        loginFormValid: false,
        loggingIn: false,
        loginText: false,
        falseLoginText: false,
        username: "",
        password: "",
        email: "",
        showPassword: false,
        usernameRules: [(value: string) => !!value || "Username cannot be empty."],
        passwordRules: [(value: string) => !!value || "Password cannot be empty."],
        emailRules: [(value: string) => !!value || "Email cannot be empty."],
        remember: false,
        inSignUp: false,
        inLogIn: true,
        snackbar: false,
        routerPath: '' as any
    }),
    watch: {
        useSignUp() {
            this.inSignUp = this.useSignUp;
        },
        useLogIn() {
            this.inLogIn = this.useLogin;
        },
        showSnackbar() {
            this.snackbar = this.showSnackbar;
            console.log(this.snackbar, "this is the value of snackbar")
        },

        $route(value: any) {
            console.log(value, "the router value")
            if (value.path === '/login') {
                this.inLogIn = true;
                this.inSignUp = false;
            } else if (value.path === '/signup') {
                this.inLogIn = false;
                this.inSignUp = true;
            }
        }

    },
    computed: {
        formIsValid(): string | false {
            return this.username != "" && this.password! + "";
        },
        passwordText(): string {
            return this.showPassword ? "text" : "password"
        },
        passwordIcon(): string {
            return this.showPassword ? "mdi-eye" : "mdi-eye-off";
        },
        logInText() {
            return this.inSignUp ? "Sign Up" : "Login"
        },
        icon() {
            return this.inSignUp ? "mdi-account-plus" : "mdi-login"
        }
    },
    methods: {
        async login() {
            if (this.inLogIn === true) {
                // guard
                if (!this.formIsValid) return;

                //  // creds
                //  const username = this.username;
                //  const password = this.password;
                //state bool reset
                this.loggingIn = true;
                const data = {
                    username: this.username,
                    password: this.password
                }
                //sign in
                const signedIn = await signIn(data);
                console.log(signedIn, "the signed in");
                // state bool reset
                this.loggingIn = false;
                //prpei na ow OTAN einai true to logged in in
                // if (logged in) {
                //bug me logged in
                const isLoggedIn = await isLogged();
                console.log(isLogged, "the is logged")
                this.$store.commit("setContent", true)
                this.$router.push('/questions');
                // }

                // if (signedIn.status === 200) console.log("user is signed in")
                //  //store creds
                //  if (signedIn && this.remember) storeCredentials(this.username, this.password);
                //  //this.inLogIn = false;
            }
        },
        async signUp() {
            if (this.inSignUp === true) {
                if (!this.formIsValid) return;

                // // creds
                // const username = this.username;
                // const password = this.password;
                //state bool reset
                this.loggingIn = true;
                const data = {
                    username: this.username,
                    email: this.email,
                    password: this.password
                }
                //sign up
                const signedUp = await signUp(data);
                console.log(signedUp, "the signed up ")
                // state bool reset
                this.loggingIn = false;
                if (signedUp.status === 200) {
                    this.inSignUp = false;
                    // this.useSignUp=false;
                    this.inLogIn = true
                    // create first user's reputation
                    // logged in the user in order to create the first reputation 
                    // await this.login()
                    const users = await getUsers()
                    console.log(users, 'th eusers in sign up')
                    const user = users.find((el: any) => el.username === this.username && el.password === this.password)
                    const userId = user.user_id
                    await this.createReputation(userId);
                }
            }
        },
        passwordIconClicked() {
            this.showPassword = !this.showPassword;
        },
        async createReputation(userId: number) {
            const initialReputation = 10
            const data = { value: initialReputation, userId: userId }
            await postUserReputation(data);
        },
        rememberMe(remember: boolean) {
            // this.remember = remember;
            //if (remember !== true) clearCredentials();
        },
        /*async init() {
            // state bool set
            this.loggingIn = true;
            //get creds
            const creds = getCredentials();
            //
            if (isNullObject(this.user)) {
                console.error("login: user is null")
                this.loggingIn = false;
                return;
            } else if (creds === null) {
                this.loggingIn = false;
                return;
            }
            //remember me
            this.remember = true;
            //sign in
            await this.user.signIn(creds);
            //reset bool state
            this.loggingIn = false;
        },*/
        changeToSignUp() {
            this.inLogIn = false;
            this.inSignUp = true;
            //
            this.$router.push('/signup');

        },
        changeToLogIn() {
            this.inSignUp = false;
            this.inLogIn = true;
            //
            this.$router.push('/login');
            // console.log(this.$router.match(), 'router matching')
        },

        clickSnackbar() {
            this.snackbar = false;
            console.log(this.snackbar, "this is the value of snackbar")
        }
    },
    mounted() {
        //this.init();
        this.routerPath = this.$router.currentRoute.path
        if (this.$router.currentRoute.path === '/signup') {
            this.inLogIn = false;
            this.inSignUp = true;
        } else if (this.$router.currentRoute.path === '/login') {
            this.inLogIn = true;
            this.inSignUp = false;
        }

    }
});
</script>
<style>
/* .v-input__slot::before {
    border-style: initial !important;
} */
</style>

