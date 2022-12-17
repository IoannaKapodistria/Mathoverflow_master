<template>
    <v-container fluid>
        <v-card flat>
            <v-toolbar flat>
                <v-toolbar-title> Ask a Question </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-icon>mdi-help</v-icon>
            </v-toolbar>
        </v-card>
        <v-card-text>
            <h4>
                Be specific and imagine you’re asking a question to another
                person
            </h4>
            <br />
            <v-form>
                <h3>Title</h3>
                <v-text-field
                    outlined
                    label="Title"
                    v-model="title"
                ></v-text-field>
                <br />
                <h3>Body</h3>
                <!-- <quill-editor v-model="quillContent" /> -->
                <vue-editor
                    class="mt-3"
                    v-model="body"
                    :editorToolbar="customToolbar"
                ></vue-editor>
            </v-form>

            <!-- <div id="editor-container"></div> -->
            <v-row>
                <v-icon> mdi-icon </v-icon>
                <v-spacer></v-spacer>
                <div class="mt-8 me-4">
                    <!-- <span class="text-body-1"><strong>Submit</strong></span>
                    <v-btn right large icon @click="postQuestion"
                        ><v-icon>mdi-playlist-plus</v-icon></v-btn
                    > -->
                    <v-btn small outlined text @click="postQuestion">
                        Post Your Question
                    </v-btn>
                </div>
            </v-row>
        </v-card-text>
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
        // quillConfig: {
        //     theme: "snow",
        //     placeholder: "",
        //     modules: {
        //         toolbar: ["bold", "italic", "underline", "link", "clean"]
        //     }
        // },
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
        this.quillContent = "<p><sub><strong><em><u>ceceecec2</u></em></strong></sub><sup><strong><em><u>2</u></em></strong></sup><strong><em><u>+4</u></em></strong><sub><strong><em><u>ww</u></em></strong></sub>wwww</p>"

        // const quill = new Quill('#editor-container', {
        //     modules: {
        //         toolbar:
        //             [
        //                 [{ header: [1, 2, false] }],
        //                 ['bold', 'italic', 'underline'],
        //                 ['image', 'code-block']
        //             ]
        //     },
        // });a
        //!
        //HAHAHHAHHA
        // quill.insertText(1, "sks")//setContents([{ insert: { formula: 'f(x)={\\sum_{i=0}^n\\frac{a_{osnsnsnio}}{2+}}' } },])
    }
})
</script>