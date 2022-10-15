<template>
    <v-app>
        <v-main>
            <mo-header
                :logoName="logoName"
                :displayName="displayName"
                :username="username"
                @loginClicked="loginClicked"
            ></mo-header>
            <!-- the login/signup page -->
            <!-- <login></login> -->
            <v-row>
                <!-- na ftiaxtei n amn einai hardcoded 3 ta cols g na mn exei toso keno ta votes tis erwthshs me to menu aristera -->
                <v-col cols="3" v-if="getContent">
                    <mo-content :buttonObjects="buttonObjects"></mo-content>
                </v-col>
                <v-col>
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
        }
    },
    mounted() {
        this.buttonObjects = [{ uid: "", title: "Home", icon: "mdi-home", url: "/" },
        { uid: "", title: "Questions", icon: "mdi-earth", url: "/questions", content: [{ uid: "", title: "Top Voted", icon: "mdi-trophy", url: "/top_voted_questions" }, { uid: "", title: "Unanswered", icon: "mdi-help", url: "/unanswered_questions" }, /*{ uid: "", title: "All Questions", icon: "mdi-web", url: "/" }*/] },
        { uid: "", title: "Users", icon: "mdi-account-multiple", url: "/users" }]
    }
});
</script>
