<template>
    <v-container fluid>
        <!-- <v-card flat>
            <v-toolbar flat>
                <v-col cols="2" class="mt-13">
                    <v-img
                        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                    ></v-img>
                </v-col>
                <v-col>
                    <v-row>
                        <v-toolbar-title> Ioanna </v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-icon>mdi-account</v-icon>
                    </v-row>
                </v-col>
            </v-toolbar>
            <v-card-text>something text here </v-card-text>
        </v-card> -->
        <v-card flat class="mt-7">
            <v-row>
                <v-col cols="2" class="pa-0">
                    <v-img contain src="/prof_photo.png"></v-img>
                </v-col>
                <v-col class="pa-0 ms-7">
                    <v-card-text>
                        <v-row class="mt-3">
                            <h1>{{ this.user.username }}</h1>
                            <v-spacer></v-spacer>
                            <span class="me-9" v-if="admin">
                                <v-btn
                                    small
                                    outlined
                                    rounded
                                    text
                                    @click="deleteUser"
                                >
                                    Delete User
                                </v-btn>
                            </span>
                        </v-row>
                        <!--  -->
                        <v-row>
                            <div class="grey--text mt-4">
                                <!-- na upologizetai me new date ktlp h h merominia p einai eggegramenos -->
                                Member since {{ this.user.created }}
                                <span class="grey--text">
                                    <v-icon medium>mdi-cake-variant</v-icon>
                                </span>
                            </div>
                        </v-row>
                    </v-card-text>
                </v-col>
            </v-row>
        </v-card>
        <v-divider></v-divider>
        <br />
        <br />
        <v-card flat>
            <v-toolbar flat>
                <v-toolbar-title> Questions </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-icon>mdi-database</v-icon>
            </v-toolbar>
            <v-card-text>
                <!-- <v-data-table :headers="questionsCols" :items="questions">
                    <template v-slot:[`item.remove`]="props">
                        <v-icon small @click="removeObject(props.item)"
                            >mdi-delete</v-icon
                        >
                    </template>
                </v-data-table> -->
                <v-data-table
                    :headers="questionsCols"
                    :items="questions"
                    @click:row="handleClick"
                    style="cursor: pointer"
                >
                    <template v-slot:[`item.answers`]="{ item }">
                        <v-chip color="light-blue lighten-3" dark>
                            {{ item.answers }}
                        </v-chip>
                    </template>
                    <template v-slot:[`item.votes`]="{ item }">
                        <v-chip color="deep-orange lighten-2" dark>
                            {{ item.votes }}
                        </v-chip>
                    </template>
                    <template v-slot:[`item.remove`]="props">
                        <v-icon small @click="removeObject(props.item)"
                            >mdi-delete</v-icon
                        >
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
        <!-- <v-divider></v-divider> -->
        <br />
        <v-card flat>
            <v-toolbar flat>
                <v-toolbar-title> Answers </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-icon>mdi-database</v-icon>
            </v-toolbar>
            <v-card-text>
                <v-data-table :headers="answersCols" :items="answers">
                    <template v-slot:[`item.body`]="props">
                        <!-- <v-icon small @click="removeObject(props.item)"
                            >mdi-delete</v-icon
                        > -->
                        <span>
                            <vue-editor
                                class="kappa"
                                disabled
                                v-model="props.item.body"
                                :editorOptions="editorOptions"
                                :style="editorStyle"
                            ></vue-editor>
                        </span>
                    </template>
                    <template v-slot:[`item.remove`]="props">
                        <v-icon small @click="removeObject(props.item)"
                            >mdi-delete</v-icon
                        >
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { deleteAnswer, deleteQuestion, getQuestion, getUser, isLogged, removeUser } from './functions';
import { mapGetters } from 'vuex';
import store from '@/store';
import { VueEditor } from "vue2-editor";
import katex from 'katex';
import 'katex/dist/katex.min.css';
export default Vue.extend({
    components: { VueEditor },
    data: () => ({
        answersCols: [{
            text: 'Answer',
            align: 'start',
            sortable: true,
            value: 'body'
        },
        // {
        //     text: 'User',
        //     align: 'start',
        //     sortable: true,
        //     value: 'user'
        // },
        { text: "", align: 'center', sortable: false, value: 'remove' }],
        answers: [
            // { body: "In order to find the solutions of the system of conics you mention, it suffices to give a procedure to find the projection of the simultaneous vanishing set of the two conics onto some axis, for instance, the y-axis: the coordinates of the projection onto the y-axis are the y-coordinates of the intersection points. Knowing them allows you to substitute back into the equations the values of y ", }, { body: "In order to find the " }
        ] as any[],
        questionsCols: [
            { text: "Answers", align: 'start', sortable: true, value: 'answers' },
            { text: "Votes", align: 'start', sortable: true, value: 'votes' },
            { text: "Question", align: 'start', sortable: true, value: 'title' },
            { text: "Question Id", align: 'start', sortable: true, value: 'question_id' },
            // {
            //     text: 'User',
            //     align: 'start',
            //     sortable: true,
            //     value: 'user'
            // }, 
            { text: "", align: 'center', sortable: false, value: 'remove' }
        ],
        questions: [
            // { answers: "13", votes: "50", question: "What's an intuitive way to think about the determinant?" }, 
            // { answers: "5", votes: "28", question: "Why is a ring that has only one prime helpful?" }
        ] as any[],
        admin: true,
        user: {} as any,
        editorOptions: {
            modules: {
                toolbar: false,
            },
        },
        editorStyle: {
            "height": '60px',
            // "border": "1px solid transparent"

        }
    }),
    watch: {
        getUserData(value: any) {
            console.log(value, "the value of user data")
            this.user = {
                uid: value.data.user_id,
                username: value.data.username,
                email: value.data.email, //"In my attempts to understand just how computer algebra systems , I tried to dig around a bit on Gröbner bases, which are described almost everywhere as a generalization of the Euclidean algorithm and Gaussian elimination. I've tried to look for examples of Gröbner bases in action,",
                created: value.data.createdAt
            },
                this.questions = value.questions;
            this.answers = value.answers;
        },
    },
    computed: {
        ...mapGetters(["getUserData", "getQuestions"])
    },
    methods: {
        async getUserData1() {
            const isLoggedIn = await isLogged();
            // const user = await getUser();
        },
        async getQuestions2() {
            for (const question of this.getUserData.questions) {
                const questionData = await getQuestion(question.question_id);
                const answers = questionData.answers;
                const answersNumber = answers.length;
                const questionObject = { answers: answersNumber, votes: "12", title: question.title, question_id: question.question_id };
                this.questions.push(questionObject);
            }
        },
        async handleClick(value: any) {
            // router.push('/question')
            console.log(value, "the value");
            const questionId = value.question_id;
            this.$router.push('/question');
            const questionData = await getQuestion(questionId);
            console.log(questionData, "the row data");
            store.commit("setQuestionData", questionData)
        },
        async deleteUser() {
            // console.log(value, "the value of delete user")
            //when delete user delete all his questions and answers
            const questions = this.getQuestions
            for (const question of questions) {
                if (question.UserUserId === this.user.uid) {
                    const questionData = await getQuestion(question.question_id);
                    const answers = questionData.answers;
                    if (answers.length !== 0) {
                        for (const answer of questionData.answers) {
                            //delete user's answers
                            const deleteAnswerObject = await deleteAnswer(answer.answer_id);
                        }
                    }
                    //delete the user's questions
                    const deleteQuestion1 = await deleteQuestion(question.question_id)
                }
            }
            //and then delete user
            const deleteUserObject = await removeUser(this.user.uid);
            // set timeout???
            this.$router.push('/users').catch((err: any) => {
                console.warn('error in redirect to /users :', err)
            });
        }
    },
    mounted() {
        window.katex = katex;

        this.getUserData1();
        this.getUserData;
        console.log(this.getUserData, "USERDATA")
        this.user = {
            uid: this.getUserData.data.user_id,
            username: this.getUserData.data.username,
            email: this.getUserData.data.email, //"In my attempts to understand just how computer algebra systems , I tried to dig around a bit on Gröbner bases, which are described almost everywhere as a generalization of the Euclidean algorithm and Gaussian elimination. I've tried to look for examples of Gröbner bases in action,",
            created: this.getUserData.data.createdAt
        },
            this.getQuestions2();
        // this.questions = this.getUserData.questions;
        this.answers = this.getUserData.answers;

    }
})
</script>
<style  >
.kappa > .ql-container.ql-snow {
    /* border: 1px solid white !important; */
    border-style: none !important;
}
</style>