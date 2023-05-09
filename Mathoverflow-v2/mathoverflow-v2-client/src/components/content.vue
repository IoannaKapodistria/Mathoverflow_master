<template>
    <v-container fluid>
        <v-card class="d-flex justify-start float-left" width="300" flat>
            <v-navigation-drawer
                permanent
                :expand-on-hover="$vuetify.breakpoint.smAndDown"
            >
                <v-row
                    v-if="this.getLoggedUser.user_id !== undefined"
                    class="mt-3 mb-7 me-8"
                    justify="center"
                    align="center"
                >
                    <user-avatar @profileClicked="profileClicked"></user-avatar>
                    <span class="blue--text text-body-1 mt-1">{{
                        this.getLoggedUser.username
                    }}</span>
                </v-row>
                <v-list
                    flat
                    :class="
                        this.getLoggedUser.user_id === undefined
                            ? 'mt-12 mb-7'
                            : ''
                    "
                >
                    <v-list-item-group
                        color="primary"
                        v-for="(buttonObject, i) in buttonObjects"
                        :key="i"
                        :to="buttonObject.url"
                    >
                        <v-list-group
                            color="primary"
                            :active-class="
                                selectedButton.title === buttonObject.title
                                    ? 'active'
                                    : ''
                            "
                            v-if="buttonObject.content !== undefined"
                            @click="clicked2(buttonObject)"
                            :to="buttonObject.url"
                            :value="true"
                        >
                            <template v-slot:activator>
                                <v-list-item-icon>
                                    <v-icon>{{ buttonObject.icon }}</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title :to="buttonObject.url">
                                    {{ buttonObject.title }}</v-list-item-title
                                >
                            </template>
                            <div
                                v-for="(item, j) in buttonObject.content"
                                :key="j"
                            >
                                <v-list-group
                                    :value="true"
                                    no-action
                                    sub-group
                                    v-if="item.content !== undefined"
                                    @click="clicked(buttonObject)"
                                    :to="item.url"
                                >
                                    <template v-slot:activator>
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                {{ item.title }}
                                            </v-list-item-title>
                                        </v-list-item-content>
                                    </template>
                                    <v-list-item
                                        v-for="(item1, k) in buttonObject
                                            .content[j].content"
                                        :key="k"
                                        @click="clicked(item1)"
                                        :to="item1.url"
                                    >
                                        <v-list-item-title>
                                            {{ item1.title }}
                                        </v-list-item-title>
                                        <v-list-item-icon>
                                            <v-icon small>{{
                                                item1.icon
                                            }}</v-icon>
                                        </v-list-item-icon>
                                    </v-list-item>
                                </v-list-group>
                                <v-list-item
                                    v-else
                                    :to="item.url"
                                    :class="
                                        selectedButton.title === item.title
                                            ? 'active'
                                            : ''
                                    "
                                    @click="clicked(item)"
                                >
                                    <v-list-item-icon>
                                        <v-icon>{{ item.icon }}</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-title>
                                        {{ item.title }}
                                    </v-list-item-title>
                                </v-list-item>
                            </div>
                        </v-list-group>
                        <v-list-item
                            v-else
                            @click="clicked(buttonObject)"
                            :to="buttonObject.url"
                            :class="
                                selectedButton.title === buttonObject.title
                                    ? 'active'
                                    : ''
                            "
                        >
                            <v-list-item-icon>
                                <v-icon>{{ buttonObject.icon }}</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>{{
                                    buttonObject.title
                                }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
                <v-card
                    v-if="showLatex"
                    class="latexCard mt-16 px-2 py-0"
                    rounded="lg"
                    flat
                >
                    <v-card-text class="pa-0">
                        <div class="text-caption">
                            MathOverflow uses
                            <span
                                class="light-green--text"
                                style="cursor: pointer"
                                @click="goMathJax"
                                >MathJax</span
                            >
                            to render LaTeX syntax. Learn more:
                            <span
                                class="light-green--text"
                                style="cursor: pointer"
                                @click="goMathJaxHelp"
                                >MathJax help</span
                            >.
                        </div>
                        <v-data-table
                            class="latexTable"
                            :headers="latexHeaders"
                            :items="commands"
                            style="cursor: pointer"
                            :items-per-page="10"
                        >
                            <template v-slot:[`item.symbol`]="props">
                                <vue-editor
                                    class="latexEditor"
                                    disabled
                                    v-model="props.item.symbol"
                                    :editorOptions="editorOptions"
                                    :style="editorStyle"
                                >
                                </vue-editor>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-navigation-drawer>
        </v-card>
    </v-container>
</template>
    
<script lang="ts">
import { buttonObj, buttons } from '@/components/types'
import store from '@/store';
import Vue, { PropType } from 'vue'
import { mapGetters } from 'vuex';
import userAvatar from '../tools/user_avatar/user_avatar.vue'
import { checkSession, getUser } from './functions';
import { VueEditor } from "vue2-editor";
import katex from 'katex';
import { latexCommands } from "@/components/latex_symbols"
export default Vue.extend({
    components: { userAvatar, VueEditor },
    props: {
        buttonObjects: {
            type: Array as PropType<buttons>,
            default: () => {
                const data: buttons = [];
                return data;
            },
        }
    },
    data: () => ({
        selectedItem: 1,
        buttonObject1: {},
        selectedButton: {} as any,
        showLatex: false,
        latexHeaders: [
            { text: "Example symbol", align: 'center', sortable: true, value: 'symbol', class: 'title text-caption light-green--text font-weight-medium', },
            { text: "LaTeX", align: 'center', sortable: true, value: 'latex', class: 'title text-caption light-green--text font-weight-medium' },
        ] as any[],
        commands: latexCommands,
        editorOptions: {
            modules: {
                toolbar: false,
            },
        },
        editorStyle: {
            // "border":,
            "height": '55px',
        },
        listGroupIsActive: false
    }),
    watch: {
        $route(value: any) {
            console.log(value, "the router value")
            if (value.path.includes('questions/') || value.path === '/ask') {
                this.showLatex = true
            } else {
                this.showLatex = false

            }
        }
    },
    computed: {
        ...mapGetters(["getLoggedUser"]),
        // showLatex() {
        //     this.$router.currentRoute.path.includes('questions/') ? true : false
        // }
    },
    methods: {
        async checkUserSession() {
            // 
            const sessionCheck = await checkSession()
            console.log(sessionCheck, 'THE SESION CHECK IN AVATAR')
            if (sessionCheck.userSid === undefined && sessionCheck.message === 'user is not logged in') {
                return false;
            } else return true;
        },
        clicked(value: buttonObj) {
            this.listGroupIsActive = false
            console.log(value, "the value of button")
            this.selectedButton = value
            this.$emit("buttonClicked", value);
        },
        clicked2(buttonObject: buttonObj) {
            this.listGroupIsActive = true
            console.log(buttonObject, "the item1")
            this.selectedButton = buttonObject

            this.$router.push(buttonObject.url).catch((err: any) => {
                console.warn(`error in redirect to ${buttonObject.url} :`, err)
            });
            this.$emit("buttonClicked2", buttonObject);
        },
        async profileClicked() {
            console.log(this.getLoggedUser, "the value of click user");
            const userId = this.getLoggedUser.user_id;
            const userData = await getUser(userId);
            console.log(userData, "the card data");
            store.commit("setUserData", userData);
            this.$router.push(`/users/${userId}`);
        },
        goMathJaxHelp() {
            window.open('https://legacy-www.math.harvard.edu/texman/')
        },
        goMathJax() {
            window.open('https://www.mathjax.org/')
        }
    },
    mounted() {
        window.katex = katex;
        console.log(this.getLoggedUser, "the logged user")
        if (this.$router.currentRoute.path.includes('questions/') || this.$router.currentRoute.path === '/ask') {
            this.showLatex = true
        } else this.showLatex = false
    }
})
</script>
<style>
.v-navigation-drawer__border {
    display: none;
}
.menuCard {
    color: #f5f5f5 !important;
}
.latexTable {
    border-bottom: none !important;
}
.latexEditor > .ql-container.ql-snow {
    border: none !important;
    /* font-size: 10px !important; */
}
/* .latexCard { */
/* border: 2.5px solid #dce52e !important; */
/* border: 1px dotted rgb(226, 226, 226) !important; */
/* } */
.active {
    color: #1976d2 !important;
    background-color: #60d7c34d !important;
}
/* .v-list-group__header:active {
    color: #1976d2 !important;
    background-color: #60d7c34d !important;
} */
</style>