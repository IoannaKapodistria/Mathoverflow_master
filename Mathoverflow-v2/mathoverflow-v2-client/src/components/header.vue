<template>
    <v-row>
        <v-col cols="12" class="px-0">
            <div class="particles">
                <div id="particles-js">
                    <div
                        v-if="getContent === true"
                        class="register d-flex justify-end"
                    >
                        <span
                            v-if="existSession === false"
                            class="me-3 mt-1"
                            style="cursor: pointer"
                            @click="signup"
                        >
                            <v-icon class="font-weight-bold" dark size="18px"
                                >mdi-progress-pencil</v-icon
                            >
                            Sign up
                        </span>
                        <span
                            v-if="existSession === false"
                            class="me-6 mt-1"
                            style="cursor: pointer"
                            @click="login"
                        >
                            <v-icon dark class="font-weight-bold" size="18px"
                                >mdi-power</v-icon
                            >
                            Log in
                        </span>
                        <span
                            v-if="existSession === true"
                            class="me-6 mt-1"
                            style="cursor: pointer"
                            @click="logout"
                        >
                            <v-icon dark size="18px" class="font-weight-bold"
                                >mdi-run</v-icon
                            >
                            Log out
                        </span>
                    </div>
                    <span class="logo" style="cursor: pointer" @click="goHome">
                        <v-icon size="64px" color="white" class="me-0 mb-2"
                            >mdi-all-inclusive</v-icon
                        >
                        MathOverflow</span
                    >
                </div>
            </div>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import "particles.js"
import { checkSession } from './functions';
import { mapGetters } from 'vuex';

declare const window: any;
export default Vue.extend({
    data: () => ({
        existSession: false
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
        ...mapGetters(["getContent"]),
        icon(): string {
            return this.$vuetify.theme.dark ? "mdi-moon-waxing-crescent" : "mdi-white-balance-sunny"
        }
    },
    watch: {
        async getContent(value: boolean) {
            await this.checkSession1()
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
        signup() {
            this.$emit('signup')
        },
        goHome() {
            this.$store.commit('setContent', true)
            this.$router.push('/')
        },
        initParticles() {
            window.particlesJS("particles-js", {
                //
                "particles": {
                    "number": {
                        "value": 440,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#ffffff"
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        },
                        "polygon": {
                            "nb_sides": 5
                        },
                        "image": {
                            "src": "img/github.svg",
                            "width": 100,
                            "height": 100
                        }
                    },
                    "opacity": {
                        "value": 0.6,
                        "random": false,
                        "anim": {
                            "enable": false,
                            "speed": 1,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 5,
                        "random": true,
                        "anim": {
                            "enable": false,
                            "speed": 40,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#ffffff",
                        "opacity": 0.4,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 1,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "grab"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 140,
                            "line_linked": {
                                "opacity": 1
                            }
                        },
                        "bubble": {
                            "distance": 400,
                            "size": 40,
                            "duration": 2,
                            "opacity": 8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 200,
                            "duration": 0.4
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true
            });
        },
        async checkSession1() {
            const a = await checkSession()
            console.log(a, 'the a in header!!!')
            if (typeof a.userSid === 'number' && a.message === 'user is logged in') {
                console.log('skata!!!')

                this.existSession = true
            } else this.existSession = false
        }
    },
    async mounted() {
        this.initParticles();
        await this.checkSession1()

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
    /* position: absolute !important; */
    top: 3% !important;
    left: 32% !important;
    color: #fff;
    font-family: "Courier New", Courier, monospace !important;
    /* "Modern Light Serif" !important; */
    /* "Courier New", Courier, monospace !important; /* "Garamond" !important; !important; */
    /* "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
        "Lucida Sans Unicode", Geneva, Verdana, sans-serif;*/
    font-size: 53px !important;
}
.register {
    z-index: 20024 !important;
    /* margin-top: 200px; */
    /* position: relative; */
    top: 42%;
    left: 54%;
    color: #fff;
}
</style>

