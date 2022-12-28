<template>
    <v-app>
        <v-main>
            <mo-header
                :logoName="logoName"
                :displayName="displayName"
                :username="username"
                @loginClicked="loginClicked"
                @logout="logout"
            ></mo-header>
            <!-- the login/signup page -->
            <!-- <login></login> -->
            <!-- <v-row>
                <v-col cols="12">
                    <div class="particles">
                        <div id="particles-js">
                            <span class="logo" style="z-index: 20067"
                                >MathOverflow</span
                            >
                        </div>
                    </div>
                </v-col>
            </v-row> -->
            <v-card
                rounded="lg"
                style="z-index: 20345"
                class="contentCard pa-3"
            >
                <v-card-text>
                    <v-row>
                        <!-- na ftiaxtei n amn einai hardcoded 3 ta cols g na mn exei toso keno ta votes tis erwthshs me to menu aristera -->
                        <v-col cols="3" v-if="getContent">
                            <mo-content
                                :buttonObjects="buttonObjects"
                            ></mo-content>
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
import { signOut } from './components/functions';
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
            this.$router.push('/login');
        },
        // initParticles() {

        //     window.particlesJS("particles-js", {
        //         particles: {
        //             number: {
        //                 value: 80,
        //                 density: {
        //                     enable: true,
        //                     value_area: 700,
        //                 },
        //             },
        //             color: {
        //                 value: "#ffffff",
        //             },
        //             shape: {
        //                 type: "circle",
        //                 stroke: {
        //                     width: 0,
        //                     color: "#000000",
        //                 },
        //                 polygon: {
        //                     nb_sides: 5,
        //                 },
        //             },
        //             opacity: {
        //                 value: 0.5,
        //                 random: false,
        //                 anim: {
        //                     enable: false,
        //                     speed: 1,
        //                     opacity_min: 0.1,
        //                     sync: false,
        //                 },
        //             },
        //             size: {
        //                 value: 3,
        //                 random: true,
        //                 anim: {
        //                     enable: false,
        //                     speed: 40,
        //                     size_min: 0.1,
        //                     sync: false,
        //                 },
        //             },
        //             line_linked: {
        //                 enable: true,
        //                 distance: 150,
        //                 color: "#ffffff",
        //                 opacity: 0.4,
        //                 width: 1,
        //             },
        //             move: {
        //                 enable: true,
        //                 speed: 1,
        //                 direction: "none",
        //                 random: false,
        //                 straight: false,
        //                 out_mode: "out",
        //                 bounce: false,
        //                 attract: {
        //                     enable: false,
        //                     rotateX: 600,
        //                     rotateY: 1200,
        //                 },
        //             },
        //         },
        //         interactivity: {
        //             detect_on: "canvas",
        //             events: {
        //                 onhover: {
        //                     enable: true,
        //                     mode: "grab",
        //                 },
        //                 onclick: {
        //                     enable: true,
        //                     mode: "push",
        //                 },
        //                 resize: true,
        //             },
        //             modes: {
        //                 grab: {
        //                     distance: 140,
        //                     line_linked: {
        //                         opacity: 1,
        //                     },
        //                 },
        //                 bubble: {
        //                     distance: 400,
        //                     size: 40,
        //                     duration: 2,
        //                     opacity: 8,
        //                     speed: 3,
        //                 },
        //                 repulse: {
        //                     distance: 200,
        //                     duration: 0.4,
        //                 },
        //                 push: {
        //                     particles_nb: 4,
        //                 },
        //                 remove: {
        //                     particles_nb: 2,
        //                 },
        //             },
        //         },
        //         retina_detect: true,
        //     });
        // },
    },
    mounted() {
        this.buttonObjects = [{ uid: "", title: "Home", icon: "mdi-home", url: "/" },
        { uid: "", title: "Questions", icon: "mdi-earth", url: "/questions", content: [{ uid: "", title: "Top Voted", icon: "mdi-trophy", url: "/top_voted_questions" }, { uid: "", title: "Unanswered", icon: "mdi-help", url: "/unanswered_questions" }, /*{ uid: "", title: "All Questions", icon: "mdi-web", url: "/" }*/] },
        { uid: "", title: "Users", icon: "mdi-account-multiple", url: "/users" }]
        // this.initParticles()
    }
});
</script>
<style>
#particles-js {
    background: rgb(152, 203, 236);
    height: 100%;
    width: 100%;
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
    z-index: 20004 !important;
    /* margin-top: 200px; */
    position: absolute;
    /* display: inline-block; */
    top: 2%;
    left: 34%;
    color: #fff;
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
        "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    font-size: 4rem;
}
.contentCard {
    top: -7%;
    position: relative;
    margin-left: 20px;
    margin-right: 20px;
}
</style>

