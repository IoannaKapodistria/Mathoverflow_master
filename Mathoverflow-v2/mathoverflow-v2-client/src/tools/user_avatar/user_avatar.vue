<template>
    <v-menu
        bottom
        min-width="200px"
        rounded
        offset-y
        :close-on-content-click="false"
    >
        <template v-slot:activator="{ on }">
            <v-btn icon x-large v-on="on">
                <v-avatar>
                    <v-icon color="blue"> mdi-account-circle </v-icon>
                </v-avatar>
            </v-btn>
        </template>
        <v-card class="text-center">
            <v-card-text>
                <v-row>
                    <span
                        class="ms-3 mb-6 mt-1 text-caption black--text font-weight-medium"
                    >
                        WELCOME!
                    </span>
                </v-row>
                <!-- display name -->
                <div v-if="renderUserAvatarInfoComponents">
                    <h3 class="mx-2">{{ userAvatarInfo.displayName }}</h3>
                    <!-- username/email -->
                    <p class="caption mt-1">
                        {{ userAvatarInfo.username }}
                    </p>
                    <!-- admin chip -->
                    <v-chip v-if="userAvatarInfo.admin" color="#FBC02D">
                        Admin
                    </v-chip>
                </div>
                <v-divider class="my-3"></v-divider>
                <!-- <v-hover v-slot="{ hover }">
                    <div
                        class="text-subtitle-1"
                        style="cursor: pointer"
                        @click="profileClicked"
                        :style="{
                            color: hover ? 'teal' : 'grey',
                        }"
                    >
                        <v-icon
                            :style="{
                                color: hover ? 'teal' : 'grey',
                            }"
                            class="mb-2"
                            >mdi-account</v-icon
                        >
                        &nbsp;Profile
                    </div>
                </v-hover>
                <v-divider class="my-2"></v-divider> -->
                <!-- <div
                    v-if="getAdmin"
                    class="text-subtitle-1"
                    style="cursor: pointer"
                    @click="createProject"
                >
                    <v-icon class="mb-1">mdi-plus</v-icon>
                    &nbsp; Create Project
                    <v-divider class="my-2"></v-divider>
                </div> -->
                <!-- feedback -->
                <!-- logout -->
                <v-hover v-slot="{ hover }">
                    <v-btn
                        :style="{
                            color: hover ? 'teal' : 'grey',
                        }"
                        depressed
                        rounded
                        text
                        @click="logoutClicked"
                    >
                        <v-icon left>mdi-exit-run</v-icon>
                        Log Out
                    </v-btn>
                </v-hover>
            </v-card-text>
        </v-card>
    </v-menu>
</template>
 
<script lang="ts">
import Vue from "vue";
import { PropType } from "vue/types/umd";
import { isUserAvatarInfo, userAvatarInfo } from "./user_avatar";
import { nullObject, nullObjectConst, isNullObject } from "../logo/null_object";
import { mapGetters } from "vuex";
export default Vue.extend({
    name: "il-user-avatar",
    props: {
        userAvatarInfo: {
            type: Object as PropType<userAvatarInfo | nullObject>,
            default: () => {
                const userAvatarInfo: userAvatarInfo | nullObject = nullObjectConst;
                return userAvatarInfo;
            }
        }
    },
    data: () => ({
        renderUserAvatarInfoComponents: true
    }),
    computed: {
        ...mapGetters(["getAdmin"])
    },
    watch: {
        userAvatarInfo(value) {
            this.renderUserAvatarInfoComponents = true;
            if (isNullObject(this.userAvatarInfo)) {
                this.renderUserAvatarInfoComponents = false;
                console.warn("user-avatar: userAvatarInfo prop is empty");
            } else if (!isUserAvatarInfo(value)) {
                this.renderUserAvatarInfoComponents = false;
                console.error("user avatar: wrong value in userAvatarInfo, got", value);
            }
        },
    },
    methods: {
        async logoutClicked() {
            this.$emit("logout");
        },
        profileClicked() {
            this.$emit("profileClicked")
        },
        createProject() {
            this.$emit("createProject")
        }
    },
})
</script>
 

