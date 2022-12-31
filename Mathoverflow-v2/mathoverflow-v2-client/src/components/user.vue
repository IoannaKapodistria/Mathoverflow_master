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
                            <span class="text-h4 font-weight-normal">
                                {{ user.username }}
                            </span>
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
                                <span class="grey--text">
                                    <v-icon medium class="mb-2"
                                        >mdi-cake-variant</v-icon
                                    >
                                </span>
                                Member since
                                {{ getUserRegistration }}
                            </div>
                        </v-row>
                        <v-row class="py-0">
                            <div class="grey--text">
                                <!-- na upologizetai me new date ktlp h h merominia p einai eggegramenos -->
                                <span class="grey--text">
                                    <v-icon class="mb-1">mdi-at</v-icon>
                                </span>

                                {{ user.email }}
                            </div>
                        </v-row>
                        <v-row class="py-0">
                            <div class="grey--text">
                                <!-- na upologizetai me new date ktlp h h merominia p einai eggegramenos -->
                                <span class="grey--text">
                                    <v-icon class="mb-1">mdi-map-marker</v-icon>
                                </span>
                                Greece
                                {{ user.location }}
                            </div>
                        </v-row>
                    </v-card-text>
                </v-col>
            </v-row>
        </v-card>
        <v-divider></v-divider>
        <br />
        <br />
        <v-card
            color="#26C6DA"
            rounded="md"
            elevation="3"
            width="35%"
            style="z-index: 20001"
            class="overlayQues"
            dark
        >
            <v-card-text
                class="text-overline font-weight-bold d-flex justify-center py-2"
                style="color: white"
            >
                <v-icon class="me-2">mdi-database</v-icon>
                Questions
            </v-card-text>
        </v-card>
        <v-card style="border-top: 2px solid #26c6da" flat rounded="sm">
            <!-- <v-toolbar flat>
                <v-toolbar-title> Questions </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-icon>mdi-database</v-icon>
            </v-toolbar> -->
            <v-card-text class="pt-8">
                <v-row>
                    <v-icon>mdi-icon</v-icon>
                    <v-spacer></v-spacer>
                    <v-btn
                        x-small
                        color="#26C6DA"
                        dark
                        @click="sortUserQues(1)"
                        :outlined="
                            questionsSortType === 'created' ? true : false
                        "
                        class="mt-1 mb-2"
                        >Score
                    </v-btn>
                    <v-btn
                        x-small
                        color="#26C6DA"
                        dark
                        :outlined="
                            questionsSortType === 'created' ? false : true
                        "
                        @click="sortUserQues(2)"
                        class="mt-1 mb-2 ml-2"
                        >Newest
                    </v-btn>
                    <!-- <v-btn
                                x-small
                                color="teal"
                                dark
                                :outlined="slotButtons[i].all"
                                class="mt-1 mb-2 ml-2"
                                @click="getAllHistorical(topic)"
                                >from 12 am</v-btn
                            > -->
                </v-row>
                <v-data-table
                    :headers="questionsCols"
                    :items="questions"
                    style="cursor: pointer"
                    :sort-by="questionsSortType"
                    :sort-desc="true"
                >
                    <!-- <template v-slot:[`item.answers`]="{ item }">
                        <v-chip
                            color="light-blue lighten-3"
                            dark
                            @click="handleClick(item)"
                        >
                            {{ item.answers }}
                        </v-chip>
                    </template>
                    <template v-slot:[`item.votes`]="{ item }">
                        <v-chip
                            color="deep-orange lighten-2"
                            dark
                            @click="handleClick(item)"
                        >
                            {{ item.votes }}
                        </v-chip>
                    </template>
                    <template v-slot:[`item.title`]="{ item }">
                        <div @click="handleClick(item)">
                            {{ item.title }}
                        </div>
                    </template>
                    <template v-slot:[`item.remove`]="props">
                        <v-icon small @click="removeObject(props.item)"
                            >mdi-delete</v-icon
                        >
                    </template> -->
                    <template v-slot:[`item.title`]="{ item }">
                        <v-card
                            flat
                            class="py-7 px-0"
                            color="transparent"
                            width="370px"
                        >
                            <!-- <v-card-text class="text-truncate"> -->
                            <v-card-text class="pa-0 ms-6 text-truncate">
                                <span
                                    @click="handleClick(item)"
                                    class="qTittle text-truncate"
                                >
                                    {{ item.title }}
                                </span>
                            </v-card-text>
                        </v-card>
                    </template>
                    <template v-slot:[`item.answers`]="{ item }">
                        <v-chip color="#F06292" class="px-4" dark>
                            {{ item.answers }}
                        </v-chip>
                    </template>
                    <template v-slot:[`item.votes`]="{ item }">
                        <v-chip color="#26A69A" class="px-4" dark>
                            {{ item.votes }}
                        </v-chip>
                    </template>
                    <template v-slot:[`item.remove`]="props" v-if="admin">
                        <v-icon @click="removeObject(props.item)"
                            >mdi-delete</v-icon
                        >
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
        <br />
        <v-card
            color="#26C6DA"
            rounded="md"
            elevation="3"
            width="35%"
            style="z-index: 20001"
            class="overlayQues"
            dark
        >
            <v-card-text
                class="text-overline font-weight-bold d-flex justify-center py-2"
                style="color: white"
            >
                <v-icon class="me-2">mdi-database</v-icon>
                Answers
            </v-card-text>
        </v-card>
        <v-card flat style="border-top: 2px solid #26c6da" rounded="sm">
            <v-card-text class="pt-8">
                <v-row>
                    <v-icon>mdi-icon</v-icon>
                    <v-spacer></v-spacer>
                    <v-btn
                        x-small
                        color="#26C6DA"
                        dark
                        @click="sortUserAnswers(1)"
                        :outlined="answersSortType === 'created' ? true : false"
                        class="mt-1 mb-2"
                        >Score
                    </v-btn>
                    <v-btn
                        x-small
                        color="#26C6DA"
                        dark
                        :outlined="answersSortType === 'created' ? false : true"
                        @click="sortUserAnswers(2)"
                        class="mt-1 mb-2 ml-2"
                        >Newest
                    </v-btn>
                    <!-- <v-btn
                                x-small
                                color="teal"
                                dark
                                :outlined="slotButtons[i].all"
                                class="mt-1 mb-2 ml-2"
                                @click="getAllHistorical(topic)"
                                >from 12 am</v-btn
                            > -->
                </v-row>
                <v-data-table
                    :headers="answersCols"
                    :items="answerObjects"
                    style="cursor: pointer"
                    :sort-by="answersSortType"
                    :sort-desc="true"
                >
                    <!-- <template v-slot:[`item.body`]="props">
                       
                        <span @click="clickAnswer(props.item)">
                            <vue-editor
                                class="kappa"
                                disabled
                                v-model="props.item.body"
                                :editorOptions="editorOptions"
                                :style="editorStyle"
                            ></vue-editor>
                        </span>
                    </template> -->
                    <template v-slot:[`item.votes`]="props">
                        <v-chip color="teal" dark class="mt-3">
                            {{ props.item.votes }}
                        </v-chip>
                    </template>
                    <template v-slot:[`item.body`]="props">
                        <!-- <v-card
                            flat
                            class="py-5 px-0"
                            color="transparent"
                            width="400px"
                            height="250px"
                        > -->
                        <v-card
                            flat
                            class="py-5 px-0"
                            color="transparent"
                            :width="
                                $vuetify.breakpoint.mdAndDown
                                    ? '200px'
                                    : '400px'
                            "
                        >
                            <v-card-text
                                class="answerBody pa-0 ms-15 text-truncate"
                                @click="clickAnswer(props.item)"
                            >
                                <!-- <span class="text-truncate">{{
                                    props.item.body
                                }}</span> -->
                                <vue-editor
                                    class="kappa"
                                    disabled
                                    v-model="props.item.body"
                                    :editorOptions="editorOptions"
                                    :style="editorStyle"
                                >
                                </vue-editor>
                                <!-- </span> -->
                            </v-card-text>
                        </v-card>
                    </template>
                    <template v-slot:[`item.remove`]="props">
                        <v-icon @click="removeObject(props.item)"
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
import { deleteAnswer, deleteQuestion, getAnswer, getQuestion, getUser, isLogged, removeUser } from './functions';
import { mapGetters } from 'vuex';
import store from '@/store';
import { VueEditor } from "vue2-editor";
import katex from 'katex';
import 'katex/dist/katex.min.css';
import dayjs from 'dayjs';
export default Vue.extend({
    components: { VueEditor },
    data: () => ({
        answersCols: [
            //     {
            //     text: 'Answer',
            //     align: 'start',
            //     sortable: true,
            //     value: 'body'
            // },
            // { text: "", align: 'center', sortable: false, value: 'remove' }
            {
                text: 'Votes',
                align: 'center',
                sortable: true,
                value: 'votes',
                class: 'title text-caption font-weight-medium'
            },
            {
                text: 'Answer',
                align: 'center',
                sortable: true,
                value: 'body',
                height: "20%",
                class: 'title text-caption font-weight-medium'
            },
            // {
            //     text: 'User',
            //     align: 'start',
            //     sortable: true,
            //     value: 'user',
            //     class: 'title text-caption font-weight-medium'
            // },
            { text: "Timestamp", align: 'start', sortable: true, value: 'created', class: 'title text-caption font-weight-medium' },
            { text: "", align: 'center', sortable: true, value: 'edit', width: '1%', class: 'title text-caption font-weight-medium' },
            { text: "", align: 'center', sortable: true, value: 'remove', width: '1%', class: 'title text-caption font-weight-medium' }

        ],
        answers: [
            // { body: "In order to find the solutions of the system of conics you mention, it suffices to give a procedure to find the projection of the simultaneous vanishing set of the two conics onto some axis, for instance, the y-axis: the coordinates of the projection onto the y-axis are the y-coordinates of the intersection points. Knowing them allows you to substitute back into the equations the values of y ", }, { body: "In order to find the " }
        ] as any[],
        questionsCols: [
            // { text: "Answers", align: 'start', sortable: true, value: 'answers' },
            // { text: "Votes", align: 'start', sortable: true, value: 'votes' },
            // { text: "Question", align: 'start', sortable: true, value: 'title' },

            // { text: "", align: 'center', sortable: false, value: 'remove' }
            { text: "Votes", align: 'center', sortable: true, value: 'votes', class: 'title text-caption font-weight-medium' },
            { text: "Question", align: 'center', sortable: true, value: 'title', class: 'title text-caption font-weight-medium' },
            { text: "Answers", align: 'center', sortable: true, value: 'answers', class: 'title text-caption font-weight-medium' },
            { text: "Timestamp", align: 'center', sortable: true, value: 'created', class: 'title text-caption font-weight-medium' },
            // {
            //     text: 'User',
            //     align: 'start',
            //     sortable: true,
            //     value: 'user',
            //     class: ' title text-caption font-weight-medium'
            // },
            // { text: "id", align: 'd-none', sortable: false, value: 'question_id' },
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

        },
        answerObjects: [] as any[],
        questionsSortType: '',
        answersSortType: ''
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
        ...mapGetters(["getUserData", "getQuestions"]),
        getUserRegistration(): string {
            return dayjs(this.user.created).format("DD MMM. YYYY | HH:mm:ss")
        }
    },
    methods: {
        sortUserQues(value: number) {
            if (value === 1) {
                this.questionsSortType = 'votes'
            } else if (value === 2) {
                this.questionsSortType = 'created'
            }
        },
        sortUserAnswers(value: number) {
            if (value === 1) {
                this.answersSortType = 'votes'
            } else if (value === 2) {
                this.answersSortType = 'created'
            }
        },
        async getUserData1() {
            const isLoggedIn = await isLogged();
            // const user = await getUser();
        },
        async getQuestions2() {
            for (const question of this.getUserData.questions) {
                const questionData = await getQuestion(question.question_id);
                const answers = questionData.answers;
                const answersNumber = answers.length;
                //
                const votes = questionData.votes;
                const votesArray: any[] = []
                //calculate votes
                for (const vote of votes) {
                    const value = vote.value
                    votesArray.push(value)
                }
                //get the sum
                const votesSum = votesArray.reduce((a, b) => a + b, 0)
                //
                const questionObject = { answers: answersNumber, votes: votesSum, title: question.title, created: dayjs(question.createdAt).format("DD MMM. YYYY | HH:mm:ss"), question_id: question.question_id };
                this.questions.push(questionObject);
            }
        },
        async handleClick(value: any) {
            // router.push('/question')
            console.log(value, "the value");
            const questionId = value.question_id;
            // this.$router.push('/question');
            this.$router.push(`/questions/${questionId}`);
            const questionData = await getQuestion(questionId);
            console.log(questionData, "the row data");
            store.commit("setQuestionData", questionData)
        },
        async clickAnswer(value: any) {
            console.log(value, "the answer value")
            //
            const questionId = value.QuestionQuestionId;
            // this.$router.push('/question');
            this.$router.push(`/questions/${questionId}`);
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
        },
        async getUserAnswers() {
            for (const answer of this.getUserData.answers) {
                const answerObject = {
                    ...answer,
                    votes: await this.getAnswerVotes(answer),
                    created: dayjs(answer.createdAt).format("DD MMM. YYYY | HH:mm:ss")
                }
                this.answerObjects.push(answerObject)
            }
        },
        async getAnswerVotes(value: any) {
            const answerVotesArray: any[] = []
            const answerData = await getAnswer(value.answer_id)
            console.log(answerData, "THE ANSWER DATA")
            for (const vote of answerData.answerVotes) {
                const value = vote.value;
                answerVotesArray.push(value)
            }
            //get the sum
            const votesSum = answerVotesArray.reduce((a, b) => a + b, 0)
            console.log(votesSum, 'teh votes of answer')
            return votesSum;
        }
    },
    async mounted() {
        window.katex = katex;
        this.questionsSortType = 'created'
        this.answersSortType = 'created'
        await this.getUserData1();
        // this.getUserData;
        console.log(this.getUserData, "USERDATA")
        this.user = {
            uid: this.getUserData.data.user_id,
            username: this.getUserData.data.username,
            email: this.getUserData.data.email,
            created: this.getUserData.data.createdAt
        },
            await this.getQuestions2();
        // this.questions = this.getUserData.questions;
        // this.answers = this.getUserData.answers;
        await this.getUserAnswers()

    }
})
</script>
<style  >
.kappa > .ql-container.ql-snow {
    /* border: 1px solid white !important; */
    border-style: none !important;
}
</style>