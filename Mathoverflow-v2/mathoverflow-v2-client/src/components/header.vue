<template>
    <v-app-bar app dense clipped left>
        <v-btn rounded depressed text @click="open">
            <div class="d-flex align-center">
                <v-img contain transition="scale-transition" width="69" />
                <h2 class="ml-4 text-none">
                    {{ logoName }}
                </h2>
            </div>
        </v-btn>
        <v-spacer></v-spacer>
        <!-- <router-link to="/user"> -->
        <v-btn fab small depressed @click="toggle">
            <v-icon>{{ icon }}</v-icon>
        </v-btn>
        <!-- </router-link> -->

        <!-- user avatar-->
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
                        <v-icon left>mdi-logout-variant</v-icon>
                        Log Out
                    </v-btn>
                </v-card-text>
            </v-card>
        </v-menu>
        <v-btn x-small outlined color="primary" @click="login">
            <!-- <v-icon>mdi-inbox</v-icon> -->
            Log In
        </v-btn>
    </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
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
        },
        login() {
            this.$emit("loginClicked")
        }
    }
})
</script>