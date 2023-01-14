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
            class="px-4"
            rounded="sm"
        >
            <v-card-text class="pt-7">
                <br />
                <v-form>
                    <h3>Title</h3>
                    <div
                        class="d-flex justify-start my-0 text-caption -darken-1--text"
                    >
                        Be specific and imagine you’re asking a question to
                        another person
                    </div>
                    <v-text-field
                        outlined
                        label="What's your mathematics question? Be specific."
                        v-model="title"
                    ></v-text-field>
                    <br />
                    <h3>Body</h3>
                    <div
                        class="d-flex justify-start my-0 text-caption -darken-1--text"
                    >
                        Include all the information someone would need to answer
                        your question
                    </div>
                    <vue-editor
                        class="mt-1"
                        v-model="body"
                        :editorToolbar="customToolbar"
                    ></vue-editor>
                </v-form>
                <v-row>
                    <v-icon> mdi-icon </v-icon>
                    <v-spacer></v-spacer>
                    <!-- <div class="mt-8 me-4"> -->
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
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { postQuestion } from "../components/functions";
// import VueQuillEditor from 'vue-quill-editor'
import Quill from "quill"
// import Delta from "quill-delta"
import { VueEditor } from "vue2-editor";
import katex from 'katex';
import 'katex/dist/katex.min.css';
export default Vue.extend({
    components: { VueEditor },
    data: () => ({
        title: "",
        body: "",
        quillContent: '',
        customToolbar: [
            [{ 'font': [] }],
            [{ 'header': [false, 1, 2, 3, 4, 5, 6,] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'align': '' }, { 'align': 'center' }, { 'align': 'right' }, { 'align': 'justify' }],
            [{ 'header': 1 }, { 'header': 2 }],
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'color': [] }, { 'background': [] }],
            ['link', 'image', 'video', 'formula'],
            [{ 'direction': 'rtl' }],
            ['clean'],
        ]
    }),
    watch: {
        quillContent(value: any) {
            console.log(value, "the quill value")
        }
    },
    methods: {
        async postQuestion() {
            const data = { title: this.title, body: this.body }
            await postQuestion(data);
            //
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
}
</style>