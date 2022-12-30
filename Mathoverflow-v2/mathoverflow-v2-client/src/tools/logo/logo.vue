<template>
    <div class="d-flex align-center" v-if="logoPacket">
        <v-btn rounded depressed text @click="open">
            <v-img
                v-if="imageElement"
                contain
                :src="logo"
                transition="scale-transition"
                :width="logoWidth"
                class="mb-1"
            />
            <h2 class="ml-4 text-none" v-if="nameElement">
                {{ logoName }}
            </h2>
        </v-btn>
    </div>
</template>
 
// <script lang="ts">
// import Vue, { PropType } from "vue";
// // import { isLogoImages, logoImages } from "./logo";
// import { nullObject, nullObjectConst, isNullObject } from "./null_object";
// export default Vue.extend({
//     name: "il-logo",
//     props: {

//         logoLink: {
//             type: String,
//             default: "",
//         },
//         logoName: {
//             type: String,
//             default: "",
//         },
//         logoImages: {
//             //! javascript's null doesn't work
//             type: Object as PropType<logoImages | nullObject>,
//             default: () => {
//                 const logoImages: logoImages | nullObject = nullObjectConst;
//                 return logoImages;
//             }
//         },
//         logoWidth: {
//             type: Number,
//             default: 69
//         },
//     },
//     computed: {
//         logo(): string {
//             if (isNullObject(this.logoImages)) return "";
//             const logo = this.$vuetify.theme.dark ? this.logoImages.light : this.logoImages.dark;
//             return logo;
//         },

//         imageElement(): boolean {
//             return !isNullObject(this.logoImages);
//         },
//         nameElement(): boolean {
//             return this.logoName !== "";
//         },

//         logoPacket(): boolean {
//             return this.nameElement || this.imageElement;
//         },
//     },
//     watch: {
//         logoImages(value) {

//             if (!isLogoImages(value)) {
//                 console.error("logo: logoImages data prop expected logoImages, got", value);
//                 return;
//             }
//         },

//     },
//     methods: {
//         open() {
//             window.open(this.logoLink);
//         },
//     },
// });
// </script>
 

