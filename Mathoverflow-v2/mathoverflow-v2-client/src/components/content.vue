<template>
    <v-container fluid>
        <v-card class="d-flex justify-start float-left" width="300" flat>
            <v-navigation-drawer
                permanent
                :expand-on-hover="$vuetify.breakpoint.smAndDown"
            >
                <v-row class="mt-3 mb-7 me-8" justify="center" align="center">
                    <user-avatar @profileClicked="profileClicked"></user-avatar>
                    <span class="blue--text text-body-1 mt-1">{{
                        this.getLoggedUser.username
                    }}</span>
                </v-row>
                <v-list flat>
                    <v-list-item-group
                        color="primary"
                        v-for="(buttonObject, i) in buttonObjects"
                        :key="i"
                        :to="buttonObject.url"
                    >
                        <v-list-group
                            v-if="buttonObject.content !== undefined"
                            :value="true"
                            @click="clicked2(buttonObject)"
                            :to="buttonObject.url"
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
                                <v-list-item v-else :to="item.url">
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
import { getUser } from './functions';
export default Vue.extend({
    components: { userAvatar },
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
        buttonObject1: {}
    }),
    computed: {
        ...mapGetters(["getLoggedUser"])
    },
    methods: {
        clicked(value: buttonObj) {
            console.log(value, "the value of button")
            this.$emit("buttonClicked", value);
        },
        clicked2(buttonObject: buttonObj) {
            console.log(buttonObject, "the item1")
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
        }
    },
    mounted() {
        console.log(this.getLoggedUser, "the logged user")
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
</style>