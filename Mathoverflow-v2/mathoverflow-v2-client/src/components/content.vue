<template>
    <v-container fluid>
        <v-card class="d-flex justify-start float-left" width="300" flat>
            <v-row>
                <v-col cols="12">
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
                                            <v-icon>{{
                                                buttonObject.icon
                                            }}</v-icon>
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
                                        v-for="(
                                            item, j
                                        ) in buttonObject.content"
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
                                                v-for="(
                                                    item1, k
                                                ) in buttonObject.content[j]
                                                    .content"
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
                </v-col>
            </v-row>
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
        //
        // initParticles() {

        //     window.particlesJS("particles-js", {
        //         particles: {
        //             number: {
        //                 value: 80,
        //                 density: {
        //                     enable: true,
        //                     value_area: 700,
        //                 },
        //             },
        //             color: {
        //                 value: "#ffffff",
        //             },
        //             shape: {
        //                 type: "circle",
        //                 stroke: {
        //                     width: 0,
        //                     color: "#000000",
        //                 },
        //                 polygon: {
        //                     nb_sides: 5,
        //                 },
        //             },
        //             opacity: {
        //                 value: 0.5,
        //                 random: false,
        //                 anim: {
        //                     enable: false,
        //                     speed: 1,
        //                     opacity_min: 0.1,
        //                     sync: false,
        //                 },
        //             },
        //             size: {
        //                 value: 3,
        //                 random: true,
        //                 anim: {
        //                     enable: false,
        //                     speed: 40,
        //                     size_min: 0.1,
        //                     sync: false,
        //                 },
        //             },
        //             line_linked: {
        //                 enable: true,
        //                 distance: 150,
        //                 color: "#ffffff",
        //                 opacity: 0.4,
        //                 width: 1,
        //             },
        //             move: {
        //                 enable: true,
        //                 speed: 6,
        //                 direction: "none",
        //                 random: false,
        //                 straight: false,
        //                 out_mode: "out",
        //                 bounce: false,
        //                 attract: {
        //                     enable: false,
        //                     rotateX: 600,
        //                     rotateY: 1200,
        //                 },
        //             },
        //         },
        //         interactivity: {
        //             detect_on: "canvas",
        //             events: {
        //                 onhover: {
        //                     enable: true,
        //                     mode: "grab",
        //                 },
        //                 onclick: {
        //                     enable: true,
        //                     mode: "push",
        //                 },
        //                 resize: true,
        //             },
        //             modes: {
        //                 grab: {
        //                     distance: 140,
        //                     line_linked: {
        //                         opacity: 1,
        //                     },
        //                 },
        //                 bubble: {
        //                     distance: 400,
        //                     size: 40,
        //                     duration: 2,
        //                     opacity: 8,
        //                     speed: 200,
        //                 },
        //                 repulse: {
        //                     distance: 200,
        //                     duration: 0.4,
        //                 },
        //                 push: {
        //                     particles_nb: 4,
        //                 },
        //                 remove: {
        //                     particles_nb: 2,
        //                 },
        //             },
        //         },
        //         retina_detect: true,
        //     });
        // },

        //
    },
    mounted() {
        // this.initParticles()
    }
})
</script>
