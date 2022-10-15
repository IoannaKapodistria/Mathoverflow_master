<template>
    <v-container fluid>
        <v-card class="d-flex justify-start float-left" width="300" flat>
            <!-- den vgainei to marin deksia tn listas -->
            <v-navigation-drawer permanent>
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
        </v-card>
    </v-container>
</template>
    
<script lang="ts">
import { buttonObj, buttons } from '@/components/types'
import Vue, { PropType } from 'vue'
export default Vue.extend({
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
})
</script>
