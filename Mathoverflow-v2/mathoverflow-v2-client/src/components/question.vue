<template>
    <!-- The question -->
    <v-card flat class="questionCard">
        <v-card flat :key="fuContent">
            <v-card flat v-if="!editing">
                <v-card-text>
                    <v-row>
                        <v-col cols="10" class="pb-0">
                            <span
                                class="qTittle2 text-body-1 font-weight-medium"
                            >
                                {{ this.questionExample.title }}
                            </span>
                        </v-col>
                        <v-col cols="2" sm="3" md="3" lg="2">
                            <v-btn
                                dark
                                color="#FFA726"
                                depressed
                                elevation="1"
                                small
                                class="mt-3 py-4"
                                @click="ask"
                                >Ask Question</v-btn
                            >
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
            <v-card v-if="editing" flat style="border: 2px dashed #b39ddb">
                <v-card-text v-if="editing" class="pb-0">
                    <v-textarea
                        color="#b39ddb"
                        rows="2"
                        v-model="editedQuestionTitle"
                    ></v-textarea>
                </v-card-text>
            </v-card>
            <v-divider></v-divider>
            <v-card-text>
                <v-row>
                    <v-col v-if="!editing" cols="1" class="mt-0">
                        <v-btn right x-large icon>
                            <v-icon
                                size="45px"
                                @click="upVoteQuestion"
                                color="#78909C"
                                >mdi-menu-up</v-icon
                            >
                        </v-btn>
                        <span class="d-flex">
                            <v-chip dark color="#26A69A" class="ms-2">
                                {{ this.questionSumVotes }}
                            </v-chip>
                        </span>
                        <v-btn right x-large icon>
                            <v-icon
                                size="45px"
                                @click="downVoteQuestion"
                                color="#78909C"
                                >mdi-menu-down</v-icon
                            >
                        </v-btn>
                    </v-col>
                    <v-col :cols="editing ? 12 : 11" class="mt-2">
                        <vue-editor
                            v-if="!editing"
                            class="kappa2"
                            disabled
                            v-model="this.questionExample.body"
                            :editorOptions="editorOptions"
                        ></vue-editor>
                        <v-card
                            v-if="editing"
                            flat
                            style="border: 2px dashed #b39ddb"
                        >
                            <v-card-text>
                                <vue-editor
                                    class="pt-0"
                                    v-model="editedQuestionBody"
                                    :editorOptions="toolbarOpts_old"
                                >
                                </vue-editor>
                            </v-card-text>
                            <v-card-actions>
                                <v-row justify="center" align="center">
                                    <v-col justify="center" align="center">
                                        <v-btn
                                            class="me-3"
                                            small
                                            dark
                                            color="#b39ddb"
                                            @click="editing = false"
                                        >
                                            cancel
                                        </v-btn>
                                        <v-btn
                                            small
                                            outlined
                                            color="#b39ddb"
                                            @click="updateQuestion"
                                        >
                                            save</v-btn
                                        >
                                    </v-col>
                                </v-row>
                            </v-card-actions>
                        </v-card>
                        <v-row class="mt-15">
                            <!-- <v-btn right x-large icon>
                                <v-icon @click="upVoteQuestion"
                                    >mdi-menu-up</v-icon
                                >
                            </v-btn>
                            <v-chip color="deep-orange lighten-2" class="mt-3">
                                {{ this.questionSumVotes }}
                            </v-chip>
                            <v-btn right x-large icon>
                                <v-icon @click="downVoteQuestion"
                                    >mdi-menu-down</v-icon
                                >
                            </v-btn> -->
                            <v-spacer></v-spacer>
                            <span class="me-9">
                                <v-btn
                                    small
                                    outlined
                                    rounded
                                    text
                                    @click="editQuestion"
                                >
                                    EDIT Question
                                </v-btn>
                            </span>
                            <span class="me-9" v-if="admin">
                                <v-btn small outlined rounded text>
                                    Delete Question
                                </v-btn>
                            </span>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
        <!-- <v-dialog v-model="editQuestionForm" width="800">
            <v-card>
                <v-card-text>
                    <vue-editor
                        class="pt-4"
                        v-model="editedQuestionBody"
                        :editorOptions="toolbarOpts_old"
                    >
                    </vue-editor>
                </v-card-text>
                <v-card-actions>
                    <v-row justify="center" align="center">
                        <v-col justify="center" align="center">
                            <v-btn small outlined color="teal"> update</v-btn>
                        </v-col>
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-dialog> -->
        <!-- type an answer-->
        <br />
        <br />
        <v-card flat>
            <v-toolbar flat>
                <v-toolbar-title class="text-body-1"> </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-icon>mdi-forum</v-icon>
            </v-toolbar>
            <v-card-text>
                <v-form>
                    <h3>Your Answer</h3>

                    <vue-editor
                        ref="editor2"
                        class="mt-3"
                        v-model="answerBody"
                        :editorOptions="toolbarOpts_old"
                    >
                    </vue-editor>
                </v-form>
                <!-- <math-field
                    v-model="formulaText2"
                    v-on:keyup.enter="pasteFormula"
                    @input="inputFormula"
                ></math-field> -->

                <v-row>
                    <div class="mt-8 ms-3">
                        <v-btn small outlined text @click="postAnswer1">
                            Post Your Answer
                        </v-btn>
                    </div>
                    <v-spacer></v-spacer>
                    <v-icon> mdi-icon </v-icon>
                </v-row>
            </v-card-text>
        </v-card>
        <!-- table with answers-->
        <br />
        <br />
        <br />
        <v-card flat>
            <v-toolbar flat>
                <v-toolbar-title> Answers </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-icon>mdi-database</v-icon>
            </v-toolbar>
            <v-card-text>
                <v-data-table
                    :headers="answersCols"
                    :items="this.answers"
                    v-if="admin"
                    sort-by="votes"
                    :sort-desc="true"
                >
                    <template v-slot:[`item.votes`]="props">
                        <v-btn right x-large icon>
                            <v-icon
                                size="26px"
                                color="#78909C"
                                @click="upVoteAnswer(props.item)"
                                class="mt-3"
                                >mdi-plus</v-icon
                            >
                        </v-btn>
                        <v-chip color="teal" dark class="mt-3">
                            {{ props.item.votes }}
                        </v-chip>
                        <!-- </div> -->
                        <v-btn right x-large icon>
                            <v-icon
                                @click="downVoteAnswer(props.item)"
                                color="#78909C"
                                dark
                                size="26px"
                                class="mt-3"
                                >mdi-minus</v-icon
                            >
                        </v-btn>
                    </template>
                    <template v-slot:[`item.body`]="props">
                        <v-card
                            flat
                            class="py-5 px-0"
                            color="transparent"
                            width="400px"
                            height="250px"
                        >
                            <!-- <v-card-text class="text-truncate"> -->
                            <v-card-text class="answerBody pa-0 ms-3">
                                <!-- <span> -->
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
                    <template v-slot:[`item.edit`]="props">
                        <v-icon small @click="showAnswerEdit(props.item)"
                            >mdi-pencil</v-icon
                        >
                        <v-dialog v-model="answerEditing" height="800">
                            <v-card>
                                <v-card-text class="pa-4">
                                    <vue-editor
                                        v-model="editedAnswerBody"
                                        :editorOptions="toolbarOpts_old"
                                    ></vue-editor>
                                    <!-- {{ props.item.body }} -->
                                </v-card-text>
                                <v-card-actions>
                                    <v-row justify="center" align="center">
                                        <v-col justify="center" align="center">
                                            <!-- <v-btn
                                                class="me-3"
                                                small
                                                dark
                                                color="teal"
                                                @click="answerEditing = false"
                                            >
                                                cancel
                                            </v-btn> -->
                                            <v-btn
                                                class="me-3"
                                                small
                                                dark
                                                color="#b39ddb"
                                                @click="answerEditing = false"
                                            >
                                                cancel
                                            </v-btn>
                                            <v-btn
                                                small
                                                outlined
                                                color="#b39ddb"
                                                @click="
                                                    updateAnswer(
                                                        props.item.body
                                                    )
                                                "
                                            >
                                                save</v-btn
                                            >
                                        </v-col>
                                    </v-row>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </template>
                    <template v-slot:[`item.remove`]="props">
                        <v-icon small @click="removeObject(props.item)"
                            >mdi-delete</v-icon
                        >
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </v-card>
    <!-- </v-container> -->
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { mapGetters } from 'vuex';
import { deleteAnswer, getAnswer, getQuestion, getUser, getUsers, postAnswer, updateAnswer1, updateQuestion1, voteAnswer, voteQuestion } from './functions';
import { question1 } from './types';
import { VueEditor } from "vue2-editor";
import katex from 'katex';
import 'katex/dist/katex.min.css';
// import * as mathLive from "mathlive"
import Quill from 'quill';
import dayjs from 'dayjs';
// Vue.use(mathLive);
//declaration for katex
declare global {
    interface Window {
        katex: any;
    }
}
//
export default Vue.extend({

    components: { VueEditor },
    props: {
        question: {
            type: Object as PropType<question1>,
            default: () => {
                const question: question1 = { uid: '', title: "", body: '', userId: '' };
                return question
            }
        }
    },
    data: () => ({
        admin: true,
        user: false, //me v if an einai o user mporei na svisei tin erwthsh tu
        answerBody: "",
        answersCols: [
            {
                text: 'Votes',
                align: 'center',
                sortable: true,
                value: 'votes',
                class: 'title text-caption font-weight-medium'
            },
            {
                text: 'Answer',
                align: 'start',
                sortable: true,
                value: 'body',
                height: "20%",
                class: 'title text-caption font-weight-medium'
            },
            {
                text: 'User',
                align: 'start',
                sortable: true,
                value: 'user',
                class: 'title text-caption font-weight-medium'
            },
            //  {
            //     text: 'Id',
            //     align: 'start',
            //     sortable: true,
            //     value: 'answer_id'
            // },
            { text: "Timestamp", align: 'center', sortable: true, value: 'created', class: 'title text-caption font-weight-medium' },
            { text: "", align: 'center', sortable: true, value: 'edit', width: '1%', class: 'title text-caption font-weight-medium' },
            { text: "", align: 'center', sortable: true, value: 'remove', width: '1%', class: 'title text-caption font-weight-medium' }
        ], // na ftiaxtei typos gia tis answers
        answers: [] as any[],
        questionExample: {} as any, // na ftiaxtei tupos
        fuContent: true,
        questionSumVotes: 0,
        editorOptions: {
            modules: {
                toolbar: false,
            },
            // handlers: {
            //     customControl: () => {
            //         console.log("customControl was clicked");
            //     }
            // },
        },
        // toolbarOpts: {
        toolbarOpts_old: {
            modules: {
                toolbar: {
                    container: [
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
                        ['formula'],
                        [{ 'direction': 'rtl' }],

                        //the custom button for the formulas in order to be used with math live , math field
                        // [{ 'customBtn': 'formula' }]
                        // ['customBtn222']
                    ],
                    // "#customToolbar",
                    // handlers: {
                    //     formula:
                    //         () => {
                    //             console.log("formula was clicked222");

                    //         }
                    // }
                }
            }
            // }
        },
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
            // ['ql-customBtn']
        ],
        editorStyle: {
            "height": '60px',
            // "border": "1px solid transparent"

        },
        formulaOn: false,
        formulaText: "",
        formulaText2: "",
        answerVotes: [] as any[],
        editQuestionForm: false,
        editing: false,
        editedQuestionBody: "",
        editedQuestionTitle: "",
        answerEditing: false,
        updatedAnswer: {} as any,
        editedAnswerBody: ''
    }),
    watch: {
        question() {
            this.questionExample = this.question;
        },
        formulaOn(value: boolean) {
            console.log(value, 'The value of formula on')
        },
        formulaText(value: any) {
            console.log(value, "teh fprmula text")
        },
        // 
        async getQuestionData(value: any) {
            //clean answers table
            const empty: any[] = []
            this.answers = empty;
            //
            console.log(value, "the value of question data")
            this.questionExample = {
                uid: this.getQuestionData.data.question_id,//"",
                title: this.getQuestionData.data.title,
                body: this.getQuestionData.data.body,
                userId: this.getQuestionData.data.UserUserId
            }
            // TO BE FIXED THE NAME OF USER IN ANSWERS

            // for (const answer of this.getQuestionData.answers) {
            //     console.log(answer, "THE ANSWER")

            //     const userId = answer.UserUserId
            //     console.log(userId, "THE USER ID")
            //     const user = await getUser(userId);
            //     console.log(user, "THE USER")
            //     const answerObject = { body: answer.body, user: user.data.username, /*answer_id: answer.answer_id */ };
            //     this.answers.push(answerObject);
            // }
            const users = await getUsers();
            for (const answer of this.getQuestionData.answers) {
                //
                for (const user of users) {
                    if (user.user_id === answer.UserUserId) {
                        // const questionObject = { answers: answersNumber, votes: votesSum, title: question.title, user: user.username, question_id: question.question_id };
                        // questionsArray.push(questionObject);
                        const answerObject = {
                            ...answer,
                            votes: await this.getAnswerVotes(answer),
                            user: user.username,
                            created: dayjs(answer.createdAt).format("DD MMM. YYYY | HH:mm:ss")
                        }
                        this.answers.push(answerObject)
                    }
                }
            }
            // this.answers = this.getQuestionData.answers;
            console.log(this.answers, "THE ANSWERS1")
            //
            const votesSum = this.getVotes();
            //console.log('')
            //
            this.questionSumVotes = votesSum;
            //
            this.editedQuestionTitle = this.questionExample.title
        },
    },
    computed: {
        ...mapGetters(["getQuestionData"]),
        toolbarOpts(): any {
            const a = {
                modules: {
                    toolbar: {
                        container: [
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
                        ],
                        // "#customToolbar",
                        // handlers: {
                        //     formula:
                        //         () => {
                        //             console.log("formula was clicked222");
                        //             this.formulaOn = true;
                        //         }
                        // }
                    }
                }
                // }
            }
            return a;
        },
    },
    methods: {
        async removeObject(value: any) {
            console.log(value, "th evalue of delete question")
            //
            console.log(value, "the value of remove object")
            const deleteAnswerObject = await deleteAnswer(value.answer_id);
            //
            // this.$router.go(0);
            this.forceUpdateQuestion();
        },
        async forceUpdateQuestion() {
            const questionId = this.getQuestionData.data.question_id;
            // this.$router.push('/question').catch((err: any) => {
            //     console.warn('error in redirect to /question :', err)
            // });
            this.$router.push(`/questions/${questionId}`).catch((err: any) => {
                console.warn('error in redirect to /questions/${questionId} :', err)
            });
            const questionData = await getQuestion(questionId);
            console.log(questionData, "the row data");
            this.$store.commit("setQuestionData", questionData)
        },
        forceUpdate() {
            this.fuContent = !this.fuContent;
        },
        getVotes() {
            const votesArray: any[] = []
            const votes = this.getQuestionData.votes
            //calculate votes
            for (const vote of votes) {
                const value = vote.value
                votesArray.push(value)
            }
            //get the sum
            const votesSum = votesArray.reduce((a, b) => a + b, 0)
            return votesSum;
        },
        // getAnswerVotes0(value: any) {
        //     const votes = await this.getAnswerVotes(value)
        // },
        async getAnswerVotes(value: any) {
            const answerVotesArray: any[] = []
            const answerData = await getAnswer(value.answer_id)
            console.log(answerData, "THE ANSWER DATA")
            // const votes = this.getQuestionData.votes
            //calculate votes
            // if(answerData.UserUserId !==null){}
            for (const vote of answerData.answerVotes) {
                const value = vote.value;
                answerVotesArray.push(value)
            }
            //get the sum
            const votesSum = answerVotesArray.reduce((a, b) => a + b, 0)
            console.log(votesSum, 'teh votes of answer')
            // this.answerVotes = votesSum;
            return votesSum;
        },
        async postAnswer1() {
            const data = { body: this.answerBody, QuestionQuestionId: this.getQuestionData.data.question_id }
            await postAnswer(data); // den ananewnetai amesws h selida na fanei h apantish kai stelnei mono periorismeno airthmo leksewn,  vgazei error 500 meta
            //
            this.forceUpdateQuestion();
            this.answerBody = ""

        },
        async upVoteQuestion() {
            const data = { value: 1, QuestionQuestionId: this.getQuestionData.data.question_id }
            await voteQuestion(data);
            // 
            // this.$router.go(0);
            this.forceUpdateQuestion();
        },
        async downVoteQuestion() {
            const data = { value: -1, QuestionQuestionId: this.getQuestionData.data.question_id }
            await voteQuestion(data);
            //
            // this.$router.go(0);
            this.forceUpdateQuestion();
        },
        formula2(value: any) {
            console.log(value, 'teh formula value')
        },
        editQuestion(value: any) {
            console.log(value, "the value of edited question")
            // this.editQuestionForm = true;
            this.editing = true
            this.editedQuestionBody = this.questionExample.body
        },
        async updateQuestion() {
            const value = { body: this.editedQuestionBody, title: this.editedQuestionTitle, }
            const questionId = this.getQuestionData.data.question_id
            await updateQuestion1(questionId, value);
            this.editing = false;
            // 
            // this.$router.go(0);
            this.forceUpdateQuestion();
        },
        formulaOff() {
            this.formulaOn = false;
        },
        async pasteFormula() {
            console.log("click enter to paste formula")
            console.log(this.formulaText, "the formula text on paste")
            // this.$refs.editor2?.quill.setContents([{ insert: { formula: this.formulaText } }])
            await this.$nextTick()
            this.formulaText2 = " "
            this.formulaText = " "

        },
        inputFormula(value: any) {
            console.log(value, "the input value")
            console.log(value.target.getValue("latex-expanded"))
            this.formulaText = value.target.getValue("latex-unstyled")
        },
        async upVoteAnswer(value: any) {
            console.log(value, "value of up vote answer");
            const data = { value: 1, AnswerAnswerId: value.answer_id }
            await voteAnswer(data);
            // 
            // this.$router.go(0);
            this.forceUpdateQuestion();
        },
        async downVoteAnswer(value: any) {
            console.log(value, "value of down vote answer")
            // console.log(value, "value of up vote answer");
            const data = { value: -1, AnswerAnswerId: value.answer_id }
            await voteAnswer(data);
            // 
            // this.$router.go(0);
            this.forceUpdateQuestion();
        },
        ask() {
            this.$router.push('/ask')
        },
        async updateAnswer(body: any) {
            console.log(body, 'the body which gonna be updated')
            const value = { body: this.editedAnswerBody }
            const answerId = this.updatedAnswer.answer_id
            await updateAnswer1(answerId, value);
            this.answerEditing = false;
            // 
            // this.$router.go(0);
            this.forceUpdateQuestion();
        },
        showAnswerEdit(value: any) {
            this.answerEditing = true
            console.log(value, 'the answer which gonna be updated')
            this.updatedAnswer = value
            this.editedAnswerBody = value.body
        }
    },
    mounted() {
        window.katex = katex;
        this.getQuestionData;
        console.log(this.getQuestionData);
    }
})
</script>
<style  >
.kappa > .ql-container.ql-snow {
    /* border: 1px solid white !important; */
    border-style: none !important;
}
.kappa2 > .ql-container.ql-snow {
    /* border: 1px solid white !important; */
    border-style: none !important;
}
.ql-customBtn222 {
    border: solid red !important;
    border-radius: 100% !important;
}
/* .questionCard {
    top: 80% !important;
} */
.qTittle2 {
    white-space: pre-line !important;
    /* color: #166ac2; */
}
.answerBody {
    white-space: pre-line !important;
}
</style>
