<template>
    <v-container fluid>
        <v-card
            color="#B388FF"
            rounded="md"
            elevation="3"
            :width="$vuetify.breakpoint.smAndDown ? '70%' : '35%'"
            style="z-index: 20001"
            class="overlayQues"
            dark
        >
            <v-card-text
                class="text-overline font-weight-bold d-flex justify-center py-2"
                style="color: white"
            >
                <v-icon class="me-2">mdi-infinity</v-icon> About MathOverflow
            </v-card-text>
        </v-card>
        <v-card
            :key="fuContent"
            style="border-top: 2px solid #b39ddb"
            flat
            class="px-4"
            rounded="sm"
        >
            <v-card-text class="pt-12">
                <v-row>
                    <v-col cols="12"
                        ><span class="titleClass2">Version: 1.0.0</span>
                    </v-col>
                    <v-col cols="12" class="pt-5 pb-2"
                        ><span class="titleClass2"
                            >Disclaimer regarding liability
                        </span>
                    </v-col>
                    <v-col cols="12" class="pt-0"
                        ><span
                            >This application is a personal project and is
                            maintained as such. Due to the absence of
                            substantial funding, its dependability is
                            restricted. Any accounts or data stored within may
                            be lost at any moment and without advance notice. It
                            is advised that you refrain from utilizing this
                            service for professional purposes. By utilizing this
                            application, you fully recognize that we cannot be
                            held accountable for any harm resulting from the use
                            of this tool, including but not limited to direct,
                            incidental, indirect damages, or any data loss or
                            leakage.</span
                        >
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-container>
</template>
<style scoped>
.titleClass2 {
    font-size: 18px !important;
    color: #32325d !important;
    font-weight: 500;
    /* color: #5fb1e8; */
}
</style>