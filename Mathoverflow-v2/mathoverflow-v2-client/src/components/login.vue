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
                            'font-weight-medium',
                            ,
                        ]"
                        style="
                            color: #40f0ea !important;
                            font-family: 'Courier New' Courier, monospace !important;
                        "
                    >
                        <span class="title2 font-weight-bold">Welcome!</span>
                        <br />
                    </v-card-title>
                    <v-card-text>
                        <span
                            class="d-flex title2 justify-center"
                            style="color: #757575 !important"
                            >The faster you fill up, the faster you level up
                            your skills!</span
                        >

                        <v-form class="mt-10">
                            <!-- <span
                                class="d-flex justify-center text-body-1 font-weight-medium"
                                style="color: #32325d"
                                >{{ logInText }}</span
                            > -->
                            <v-row justify="center" align="center">
                                <v-col cols="12" md="4">
                                    <v-text-field
                                        color="#03e9f4"
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
                                        color="#03e9f4"
                                        v-if="inSignUp"
                                        required
                                        v-model="email"
                                        :rules="emailRules"
                                        label="Email"
                                        prepend-icon="mdi-at"
                                    >
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row justify="center" align="center">
                                <v-col cols="12" md="4">
                                    <v-text-field
                                        required
                                        color="#03e9f4"
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
                    <v-card-actions class="mt-15">
                        <v-spacer></v-spacer>
                        <!-- <v-btn
                            v-if="inLogIn"
                            @click="login"
                            small
                            class="px-11 py-2"
                            outlined
                            color="blue"
                        >
                            Login
                        </v-btn> -->
                        <login-2
                            v-if="inLogIn"
                            @emitAction="emitButtonAction($event, value)"
                            :text="'Login'"
                        ></login-2>
                        <login-2
                            v-if="inSignUp"
                            @emitAction="emitButtonAction($event, value)"
                            :text="'Sign Up'"
                        ></login-2>
                        <!-- <v-btn
                            v-else-if="inSignUp"
                            @click="signUp"
                            small
                            class="px-11 py-2"
                            outlined
                            color="#1E88E5"
                        >
                            Sign Up
                        </v-btn> -->
                        <v-spacer></v-spacer>
                    </v-card-actions>
                    <!--  -->
                </v-card>
                <v-row class="mt-10">
                    <v-col class="text-body-2">
                        <span v-if="inLogIn">
                            Don't have an account?
                            <span
                                style="
                                    cursor: pointer !important;
                                    color: #03e9f4 !important;
                                "
                                @click="changeToSignUp"
                                >Sign Up</span
                            >
                        </span>
                        <span v-else-if="inSignUp">
                            Already have an account?
                            <span
                                style="
                                    cursor: pointer !important;
                                    color: #03e9f4 !important;
                                "
                                @click="changeToLogIn"
                                >Login</span
                            >
                            &nbsp;
                        </span>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import router from "@/router";
import store from "@/store";
import Vue, { PropType } from "vue";
import VueRouter from "vue-router";
import { getUser, getUsers, isLogged, postUserReputation, signIn, signUp } from "./functions";
import Login2 from "./login2.vue";

//import User from "../user/user";
//import { nullObject, isNullObject, nullObjectConst } from "./null_object";
//import { storeCredentials, clearCredentials, getCredentials } from "./login";
export default Vue.extend({
    components: { Login2 },
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
        async emitButtonAction(value: any, event: any) {
            console.log(value, event, "rthe value and event")
            if (value === 'Login') {
                await this.login()
            } else if (value === 'Sign Up') {
                await this.signUp()
            }
        },
        async login() {
            if (this.inLogIn === true) {
                // guard
                if (!this.formIsValid) return;
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
                console.log(isLoggedIn.islogged, "the is logged")
                if (isLoggedIn.islogged === true) {
                    //
                    if (this.username === "iokapodistria" && this.password === "924113131") {
                        this.$store.commit("setAdmin", true)
                    } else this.$store.commit("setAdmin", false)
                    //
                    const userId = isLoggedIn.userId
                    const userData = await getUser(userId);
                    console.log(userData, 'the user data in login')
                    store.commit("setLoggedUser", userData.data);
                    this.$store.commit("setContent", true)
                    this.$router.push('/');
                } else {
                    console.log('please try again')
                }

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
            //1 or 10?
            const initialReputation = 1
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
            // console.log(this.$.match(), 'router matching')
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
.title2 {
    font-family: "Courier New", Courier, monospace !important;
    /* font-weight: 500 !important; */
}
</style>

