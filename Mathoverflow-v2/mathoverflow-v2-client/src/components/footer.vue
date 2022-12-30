<template>
    <v-footer padless>
        <v-card class="flex footerClass" color="#e2e2e2" flat tile dark>
            <v-card-title class="pb-1 pt-3">
                <v-btn
                    v-for="link in links"
                    :key="link"
                    text
                    rounded
                    class="my-2"
                >
                    {{ link }}
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn v-for="icon in icons" :key="icon" class="mx-4" icon>
                    <v-icon size="40px"> {{ icon }} </v-icon>
                </v-btn>
                <!-- <v-spacer></v-spacer> -->
            </v-card-title>
            <v-card-text class="py-2 text-center">
                <!-- <v-row> -->
                <span class="mt-3 ms-3">
                    &copy; {{ author }} {{ new Date().getFullYear() }}</span
                >
                <!-- <v-spacer></v-spacer> -->
                <!-- <v-btn
                        v-for="link in links"
                        :key="link"
                        text
                        rounded
                        class="my-2"
                    >
                        {{ link }}
                    </v-btn> -->
                <!-- </v-row> -->
            </v-card-text>
        </v-card>
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
            'Home',
            'About Us',
            'Contact Us',
        ],
    })
})
</script>
<style>
.footerClass {
    /* background: linear-gradient(to right, #85c4ec, #95ccf1) !important; */
    /* color: #e2e2e2; */
}
.footerSection {
    /* position: fixed !important; */
    bottom: 0 !important;
}
</style>