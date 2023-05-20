<template>
    <v-container fluid>
        <v-card
            color="#FFA726"
            rounded="md"
            elevation="3"
            :width="$vuetify.breakpoint.smAndDown ? '70%' : '35%'"
            style="z-index: 20001"
            class="overlayAsk"
            dark
        >
            <v-card-text
                class="text-overline font-weight-bold d-flex justify-center py-2"
                style="color: white"
            >
                <v-icon class="me-2">mdi-lightbulb-question</v-icon>
                <span class="mt-1"> Ask a Question</span>
            </v-card-text>
        </v-card>
        <v-card
            flat
            style="border-top: 2px solid #ffa726"
            class="pe-4"
            rounded="sm"
        >
            <v-card-text class="pt-8 ps-0">
                <br />
                <!-- start of stepper -->
                <v-timeline dense class="askQueTimeline pt-0">
                    <v-timeline-item
                        icon="mdi-numeric-1"
                        color="#CE93D8"
                        class="pb-8"
                    >
                        <v-row>
                            <v-col cols="12">
                                <h3 style="color: #32325d">Title</h3>
                                <div
                                    class="d-flex justify-start my-0 text-caption -darken-1--text"
                                >
                                    Be specific and imagine you’re asking a
                                    question to another person
                                </div>
                                <v-text-field
                                    outlined
                                    label="What's your mathematics question? Be specific."
                                    v-model="title"
                                ></v-text-field>
                                <br />
                            </v-col>
                        </v-row>
                    </v-timeline-item>
                    <v-timeline-item
                        icon="mdi-numeric-2"
                        color="#2dcba9"
                        class="pb-1"
                    >
                        <v-row>
                            <v-col cols="12">
                                <h3 style="color: #32325d">Body</h3>
                                <div
                                    class="d-flex justify-start my-0 text-caption -darken-1--text"
                                >
                                    Include all the information someone would
                                    need to answer your question
                                </div>
                                <vue-editor
                                    class="mt-1"
                                    v-model="body"
                                    :editorToolbar="customToolbar"
                                ></vue-editor>
                            </v-col>
                        </v-row>
                    </v-timeline-item>
                </v-timeline>
                <!-- </v-form> -->
                <!-- end of stepper -->
                <v-row>
                    <v-icon> mdi-icon </v-icon>
                    <v-spacer></v-spacer>
                    <v-btn
                        small
                        dark
                        color="#FB8C00"
                        depressed
                        elevation="1"
                        @click="postQuestion"
                        class="mt-8 me-4"
                    >
                        Post Your Question
                    </v-btn>
                </v-row>
            </v-card-text>
        </v-card>
        <v-dialog
            v-model="sessionCheckDialog"
            width="500"
            persistent
            content-class="elevation-0"
        >
            <v-card class="pb-0 pt-0 ps-2 mt-15" flat rounded="lg">
                <v-icon
                    color="#6baefa"
                    size="107px"
                    class="oopsCard justify-end mb-0"
                    >mdi-robot-confused</v-icon
                >
                <v-card-text class="pt-0">
                    <span
                        class="d-flex justify-start titleClass text-body-1 font-weight-bold ms-0 mb-2"
                        style="font-size: 19px !important"
                        >Oops!</span
                    >
                    <span class="mt-0">
                        It looks like that you're not currently logged into our
                        app. To ensure the best possible experience, please sign
                        in to your account!
                        <span class="hand mx-1">🤙</span></span
                    >
                    <span class="d-flex justify-end me-3">
                        <v-icon
                            small
                            @click="sessionCheckDialog = false"
                            style="cursor: pointer"
                            >mdi-close</v-icon
                        >
                    </span>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { checkSession, createHistorical, getUserReputation, postQuestion, updateReputation1 } from "../components/functions";
// import VueQuillEditor from 'vue-quill-editor'
import Quill from "quill"
// import Delta from "quill-delta"
import { VueEditor } from "vue2-editor";
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { mapGetters } from 'vuex';
export default Vue.extend({
    components: { VueEditor },
    data: () => ({
        title: "",
        body: "",
        quillContent: '',
        customToolbar:
            // [
            //     [{ 'font': [] }],
            //     [{ 'header': [false, 1, 2, 3, 4, 5, 6,] }],
            //     // [{ 'size': ['small', false, 'large', 'huge'] }],
            //     ['bold', 'italic', 'underline', 'strike'],
            //     [{ 'align': '' }, { 'align': 'center' }, { 'align': 'right' }, { 'align': 'justify' }],
            //     [{ 'header': 1 }, { 'header': 2 }],
            //     ['blockquote', 'code-block'],
            //     [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
            //     [{ 'script': 'sub' }, { 'script': 'super' }],
            //     [{ 'indent': '-1' }, { 'indent': '+1' }],
            //     [{ 'color': [] }, { 'background': [] }],
            //     ['link', 'image', 'video', 'formula'],
            //     [{ 'direction': 'rtl' }],
            //     ['clean'],
            // ],
            [
                [{ 'font': [] }],
                [{ 'header': [false, 1, 2, 3, 4, 5, 6,] }],
                // [{ 'size': ['small', false, 'large', 'huge'] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'align': '' }, { 'align': 'center' }, { 'align': 'right' }, { 'align': 'justify' }],
                // [{ 'header': 1 }, { 'header': 2 }],
                ['blockquote', 'code-block'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
                [{ 'script': 'sub' }, { 'script': 'super' }],
                [{ 'indent': '-1' }, { 'indent': '+1' }],
                [{ 'color': [] }, { 'background': [] }],
                ['formula'],
                [{ 'direction': 'rtl' }],
                // ['clean'],
            ],
        sessionCheckDialog: false
    }),
    watch: {
        quillContent(value: any) {
            console.log(value, "the quill value")
        }
    },
    computed: {
        ...mapGetters(["getLoggedUser"])
    },
    methods: {
        async postQuestion() {
            const sessionCheck = await checkSession()
            if (sessionCheck.userSid === undefined && sessionCheck.message === 'user is not logged in') {
                this.sessionCheckDialog = true
                return;
            }
            const data = { title: this.title, body: this.body }
            await postQuestion(data);
            const userRep = await getUserReputation(this.getLoggedUser.user_id)
            let oldRep = +userRep.value
            const data2 = { value: oldRep += 5 }
            await updateReputation1(userRep.reputation_id, data2);
            const historicalData = {
                action: 'ask',
                data: data
            }
            await createHistorical(historicalData)
            this.$router.push('/questions');
        }
    },
    mounted() {
        window.katex = katex;
    }
})
</script>
<style>
.overlayAsk {
    top: 16px;
    left: 10px;
    /* color: #6baefa; */
}
.askQueTimeline {
    /* top: 100px !important; */
    padding-top: 0px;
    height: calc(100% - 50px) !important;
    align-items: center !important;
}
.oopsCard {
    position: absolute;
    top: -45px;
    right: -355px;
    background-color: transparent;
}
.hand {
    /* transform: rotate(-50deg); */
    animation-name: wave-animation; /* Refers to the name of your @keyframes element below */
    animation-duration: 2.5s; /* Change to speed up or slow down */
    animation-iteration-count: infinite; /* Never stop waving :) */
    transform-origin: 49% 49%; /* Pivot around the bottom-left palm */
    display: inline-block;
}

@keyframes wave-animation {
    0% {
        transform: rotate(0deg);
    }
    10% {
        transform: rotate(14deg);
    } /* The following five values can be played with to make the waving more or less extreme */
    20% {
        transform: rotate(-8deg);
    }
    30% {
        transform: rotate(14deg);
    }
    40% {
        transform: rotate(-4deg);
    }
    50% {
        transform: rotate(10deg);
    }
    60% {
        transform: rotate(0deg);
    } /* Reset for the last half to pause */
    100% {
        transform: rotate(0deg);
    }
}
</style>