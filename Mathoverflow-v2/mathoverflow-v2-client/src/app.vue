<template>
    <!-- <v-app style="background-color: #fafafa"> -->
    <v-app>
        <v-main>
            <mo-header
                :logoName="logoName"
                :displayName="displayName"
                :username="username"
                @loginClicked="loginClicked"
                @logout="logout"
                @signup="signup"
            ></mo-header>
            <v-card
                flat
                rounded="lg"
                style="z-index: 20345"
                class="contentCard pa-0 mx-11"
            >
                <v-card-text>
                    <v-row justify="center">
                        <v-col cols="3" v-if="getContent" class="pe-0">
                            <mo-content
                                :buttonObjects="buttonObjects"
                            ></mo-content>
                        </v-col>
                        <v-col cols="9" class="ps-0">
                            <!-- <v-col cols="9"> -->
                            <router-view></router-view>
                            <!-- ask a question page NA MPEI PADOU ENA BUTTON ASK QUESTION-->
                            <!-- <ask-question></ask-question> -->
                            <!--a question page -->
                            <!-- <mo-question></mo-question> -->
                            <!-- questions page -->
                            <!-- <mo-questions></mo-questions> -->
                            <!-- users page -->
                            <!-- <users></users> -->
                            <!-- a user's page -->
                            <!-- <user></user> -->
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
            <mo-footer :author="author" v-if="getContent"></mo-footer>
        </v-main>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import moHeader from './components/header.vue';
import moFooter from './components/footer.vue';
import login from './components/login.vue';
import moContent from './components/content.vue';
import { buttons } from './components/types';
import askQuestion from './components/ask_question.vue';
import moQuestion from "./components/question.vue"
import moQuestions from "./components/questions.vue"
import Users from "./components/users.vue";
import User from "./components/user.vue"
import { mapGetters } from 'vuex';
import { getUser, isLogged, signOut } from './components/functions';
import store from './store';
// import "particles.js"

// declare const window: any;


export default Vue.extend({
    name: 'app',
    components: {
        login,
        moHeader,
        moFooter,
        moContent,
        askQuestion,
        moQuestion,
        moQuestions,
        Users,
        User
    },
    data: () => ({
        logoName: "Mathoverflow",
        logoLink: "",
        displayName: "Ioanna",
        username: "ioanna",
        author: "Ioanna Kapodistria",
        buttonObjects: [] as buttons,
        fuContent1: true,
        content: true
    }),
    computed: {
        ...mapGetters(["getContent"])
    },
    methods: {
        forceUpdate1() {
            this.fuContent1 = !this.fuContent1;
        },
        loginClicked() {
            // this.content = false;
            this.$store.commit("setContent", false)
            this.$router.push('/login');
        },
        async logout() {
            const a = await signOut()
            console.log(a, 'the sign out')
            //wait to login
            this.$store.commit("setContent", false)
            this.$store.commit("setUserData", {})
            this.$store.commit("setLoggedUser", {})
            this.$store.commit("setAdmin", false)
            this.$router.push('/login');
        },
        signup() {
            this.$store.commit("setContent", false)
            this.$router.push('/signup');
        }
    },
    async mounted() {
        this.buttonObjects = [
            { uid: "", title: "Home", icon: "mdi-home", url: "/" },
            { uid: "", title: "Questions", icon: "mdi-earth", url: "/questions", content: [{ uid: "", title: "Top Voted", icon: "mdi-trophy", url: "/top_voted_questions" }, { uid: "", title: "Unanswered", icon: "mdi-help", url: "/unanswered_questions" }, /*{ uid: "", title: "All Questions", icon: "mdi-web", url: "/" }*/] },
            // { uid: "", title: "Questions", icon: "mdi-earth", url: "/questions" },
            // { uid: "", title: "Top Voted", icon: "mdi-trophy", url: "/top_voted_questions" },
            // { uid: "", title: "Unanswered", icon: "mdi-help", url: "/unanswered_questions" },
            { uid: "", title: "Users", icon: "mdi-account-multiple", url: "/users" },
        ]
        // this.initParticles()
        const user = await isLogged()
        console.log(user, 'the is logges user22')
        if (user.islogged === true) {
            const userData = await getUser(user.userId)
            console.log(userData, "the card data222");
            if (userData.data.username === "iokapodistria" && userData.data.password === "924113131") {
                this.$store.commit("setAdmin", true)
            } else this.$store.commit("setAdmin", false)
            // store.commit("setUserData", userData);
            store.commit("setLoggedUser", userData.data);
        }
    }
});
</script>
<style>
#particles-js {
    background: linear-gradient(to right, #51e2c3 0%, #83bcfd 100%);
    /* color: #1cd2cc */
}
/* canvas {
    display: block;
    vertical-align: bottom;
} */

.particles-js-canvas-el {
    height: 250px !important;
    /* position: absolute; */
}
.logo {
    /* color: #939393; */
    z-index: 20004 !important;
    position: absolute;
    top: 2%;
    left: 34%;
    color: #fff;
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
        "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    font-size: 4rem;
}
.contentCard {
    top: -8%;
    /* top: 18%; */
    position: relative;
    display: flex;
    margin-left: 40px;
    margin-right: 40px;
    flex-direction: column;
    min-height: 100vh;
    /* color: #f7fbfa; */
    /* margin-bottom: 30px; */
    /* bottom: 5%; */
}
</style>

