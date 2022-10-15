<template>
    <v-footer app padless>
        <!--<span> &copy; {{ author }} {{ new Date().getFullYear() }} </span>
        <v-spacer></v-spacer>-->
        <v-card class="flex" flat tile>
            <v-divider></v-divider>
            <v-card-title>
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
                    <v-icon size="24px"> {{ icon }} </v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text class="py-2 text-center">
                &copy; {{ author }} {{ new Date().getFullYear() }}
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