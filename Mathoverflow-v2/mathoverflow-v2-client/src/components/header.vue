<template>
    <!-- <v-app-bar app dense clipped left>
        <v-btn rounded depressed text @click="open">
            <div class="d-flex align-center">
                <v-img contain transition="scale-transition" width="69" />
                <h2 class="ml-4 text-none">
                    {{ logoName }}
                </h2>
            </div>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn fab small depressed @click="toggle">
            <v-icon>{{ icon }}</v-icon>
        </v-btn>
        <v-menu
            bottom
            min
            max-width="200px"
            rounded
            offset-y
            :close-on-content-click="false"
        >
            <template v-slot:activator="{ on }">
                <v-btn icon x-large v-on="on" to="/user">
                    <v-avatar> <v-icon> mdi-account-circle</v-icon></v-avatar>
                </v-btn>
            </template>
            <v-card class="text-center">
                <v-card-text>
                    <div>
                        <h3 class="mx-2">
                            {{ displayName }}
                        </h3>
                        <p class="caption mt-1">
                            {{ username }}
                        </p>
                        <v-chip color="#FBC02D"></v-chip>
                    </div>
                    <v-divider class="my-3"></v-divider>
                    <v-btn depressed rounded text @click="logout">
                        <v-icon left @click="logout">mdi-logout-variant</v-icon>
                        Log Out
                    </v-btn>
                </v-card-text>
            </v-card>
        </v-menu>
        <v-btn x-small outlined color="primary" @click="login">
            Log In
        </v-btn>
    </v-app-bar> -->
    <v-row>
        <v-col cols="12">
            <div class="particles">
                <div id="particles-js">
                    <span class="logo" style="z-index: 20067"
                        >MathOverflow</span
                    >
                </div>
            </div>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import "particles.js"

declare const window: any;
export default Vue.extend({
    data: () => ({
    }),

    props: {
        logoLink: {
            type: String,
            default: ""
        },
        logoName: {
            type: String,
            default: ""
        },
        displayName: {
            type: String,
            default: ""
        },
        username: {
            type: String,
            default: ""
        }
    },
    computed: {
        icon(): string {
            return this.$vuetify.theme.dark ? "mdi-moon-waxing-crescent" : "mdi-white-balance-sunny"
        }
    },
    methods: {
        open() {
            window.open(this.logoLink);
        },
        toggle() {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        },
        logout() {
            //logout 
            this.$emit("logout")
        },
        login() {
            this.$emit("loginClicked")
        },
        initParticles() {

            window.particlesJS("particles-js", {
                particles: {
                    number: {
                        value: 80,
                        density: {
                            enable: true,
                            value_area: 700,
                        },
                    },
                    color: {
                        value: "#ffffff",
                    },
                    shape: {
                        type: "circle",
                        stroke: {
                            width: 0,
                            color: "#000000",
                        },
                        polygon: {
                            nb_sides: 5,
                        },
                    },
                    opacity: {
                        value: 0.5,
                        random: false,
                        anim: {
                            enable: false,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false,
                        },
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: {
                            enable: false,
                            speed: 40,
                            size_min: 0.1,
                            sync: false,
                        },
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#ffffff",
                        opacity: 0.4,
                        width: 1,
                    },
                    move: {
                        enable: true,
                        speed: 1,
                        direction: "none",
                        random: false,
                        straight: false,
                        out_mode: "out",
                        bounce: false,
                        attract: {
                            enable: false,
                            rotateX: 600,
                            rotateY: 1200,
                        },
                    },
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: {
                            enable: true,
                            mode: "grab",
                        },
                        onclick: {
                            enable: true,
                            mode: "push",
                        },
                        resize: true,
                    },
                    modes: {
                        grab: {
                            distance: 140,
                            line_linked: {
                                opacity: 1,
                            },
                        },
                        bubble: {
                            distance: 400,
                            size: 40,
                            duration: 2,
                            opacity: 8,
                            speed: 3,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4,
                        },
                        push: {
                            particles_nb: 4,
                        },
                        remove: {
                            particles_nb: 2,
                        },
                    },
                },
                retina_detect: true,
            });
        },
    },
    mounted() {
        this.initParticles()
    }
})
</script>
<style>
#particles-js {
    background: rgb(152, 203, 236);
    height: 100%;
    width: 100%;
}

.particles-js-canvas-el {
    height: 250px !important;
    /* position: absolute; */
}
.logo {
    z-index: 20004 !important;
    /* margin-top: 200px; */
    /* position: relative; */

    top: 12%;
    left: 34%;
    color: #fff;
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
        "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    font-size: 4rem;
}
</style>

