<template>
    <v-container fluid>
        <v-card class="d-flex justify-start float-left" width="300" flat>
            <!-- <v-row>
                <v-col cols="12"> -->
            <!-- den vgainei to marin deksia tn listas -->
            <v-navigation-drawer permanent>
                <v-row class="mt-3 mb-7 me-8" justify="center" align="center">
                    <user-avatar></user-avatar>
                    <span class="blue--text text-body-1 mt-1"
                        >Ioanna{{ username }}</span
                    >
                </v-row>
                <v-list flat>
                    <!-- <router-link> -->
                    <v-list-item-group
                        color="primary"
                        v-for="(buttonObject, i) in buttonObjects"
                        :key="i"
                        :to="buttonObject.url"
                    >
                        <v-list-group
                            v-if="buttonObject.content !== undefined"
                            :value="true"
                            @click="clicked(buttonObject)"
                            :to="buttonObject.url"
                        >
                            <template v-slot:activator>
                                <!-- <v-list-item-content> -->
                                <v-list-item-icon>
                                    <v-icon>{{ buttonObject.icon }}</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>
                                    eee{{
                                        buttonObject.title
                                    }}</v-list-item-title
                                >
                                <!-- </v-list-item-content> -->
                            </template>
                            <!-- -->
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
                                    <!-- <v-list-item-content> -->
                                    <v-list-item-title>
                                        {{ item.title }}
                                    </v-list-item-title>
                                    <!-- </v-list-item-content> -->
                                </v-list-item>
                            </div>
                            <!-- -->
                        </v-list-group>
                        <!-- else-->
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
                    <!-- </router-link> -->
                </v-list>
            </v-navigation-drawer>
            <!-- </v-col>
            </v-row> -->
        </v-card>
    </v-container>
</template>
    
<script lang="ts">
import { buttonObj, buttons } from '@/components/types'
import Vue, { PropType } from 'vue'
import userAvatar from '../tools/user_avatar/user_avatar.vue'
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
    methods: {
        clicked(value: buttonObj) {
            console.log(value, "the value")
            this.$emit("buttonClicked", value);
        },
        clicked2(buttonObject: buttonObj) {
            console.log(buttonObject, "the item1")

            this.$emit("buttonClicked2", buttonObject);
        },
    },
    mounted() {
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