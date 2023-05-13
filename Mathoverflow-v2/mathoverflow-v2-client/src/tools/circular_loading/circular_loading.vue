<template>
    <v-container fluid>
        <v-dialog
            v-model="dialog"
            content-class="elevation-0"
            persistent
            style="z-index: 2666666"
        >
            <div class="text-center">
                <v-progress-circular
                    size="56"
                    class="ma-3"
                    indeterminate
                    width="6"
                    color="#2dcba9"
                ></v-progress-circular>
            </div>
            <!-- </v-card-text>
            </v-card> -->
        </v-dialog>
    </v-container>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        progressCircular: {
            type: Boolean,
            default: false
        },
        text: {
            type: String,
            default: "Loading..."
        }
    },
    data: () => ({
        dialog: false
    }),
    watch: {
        progressCircular() {
            this.dialog = this.progressCircular;
        }
    }
})
</script>
<style scoped>
.circle {
    color: linear-gradient(to right, #51e2c3 0%, #83bcfd 100%);
}
</style>

