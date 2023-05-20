<template>
    <v-footer padless>
        <!-- <v-card class="flex footerClass" color="#2D3039" flat tile dark> -->
        <!-- <v-card>
            <v-card-text class="pa-0"> </v-card-text>
        </v-card> -->
        <v-row>
            <v-col cols="12" class="pa-0">
                <v-card class="footerClass" flat tile dark>
                    <v-card-title class="pb-0 pt-1">
                        <v-btn
                            v-for="link in links"
                            :key="link"
                            text
                            rounded
                            class="my-2 white--text"
                            style="
                                text-transform: none !important;
                                font-size: 16px !important;
                            "
                            @click="
                                link.title === 'Contact us'
                                    ? getLinkedIn()
                                    : link.title === 'Home'
                                    ? goHome()
                                    : link.title === 'About us'
                                    ? goAbout()
                                    : doNothing()
                            "
                        >
                            <v-icon size="18px" class="me-1">{{
                                link.icon
                            }}</v-icon>
                            {{ link.title }}
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                            v-for="icon in icons"
                            :key="icon"
                            class="mx-4"
                            icon
                            outlined
                            rounded
                            @click="
                                icon === 'mdi-linkedin'
                                    ? getLinkedIn()
                                    : doNothing()
                            "
                        >
                            <v-icon size="40px" color="white">
                                {{ icon }}
                            </v-icon>
                        </v-btn>
                        <!-- <v-spacer></v-spacer> -->
                    </v-card-title>
                    <v-card-text class="pt-0 pb-1 text-center">
                        <!-- <v-row> -->
                        <span class="mt-3 ms-3 white--text">
                            &copy; {{ author }}
                            {{ new Date().getFullYear() }}</span
                        >
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-footer>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        author: {
            type: String,
            default: ""
        }
    },
    data: () => ({
        icons: [
            'mdi-facebook',
            'mdi-twitter',
            'mdi-linkedin',
            'mdi-instagram',
        ],
        links: [
            { icon: 'mdi-home', title: 'Home' },
            { icon: 'mdi-shield-half-full', title: 'About us' },
            { icon: 'mdi-email', title: 'Contact us' }
        ],
    }),
    methods: {
        doNothing() {
            //
        },
        getLinkedIn() {
            window.open('https://www.linkedin.com/in/ioanna-kapodistria-24055a1bb/')
        },
        goHome() {
            this.$router.push('/');
        },
        goAbout() {
            this.$router.push('/about');
        }
    }
})
</script>
<style>
.footerClass {
    /* background: linear-gradient(to right, #85c4ec, #95ccf1) !important; */
    background: linear-gradient(
        to right,
        rgba(81, 226, 195, 1) 0%,
        rgba(131, 188, 253, 1) 100%
    );
    /* color: #e2e2e2; */
}
.footerSection {
    /* position: fixed !important; */
    bottom: 0 !important;
}
.social_links_footer a span {
    font-size: 24px;
    width: 46px;
    height: 46px;
    line-height: 44px;
    text-align: center;
    border: 2px solid;
    border-radius: 25px;
}
.footer2 {
    bottom: 0;
    position: absolute !important;
}
</style>