<template>
    <v-card flat :key="fuContent">
        <v-toolbar flat>
            <v-toolbar-title> Explore our Questions </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon>mdi-earth</v-icon>
        </v-toolbar>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
        ></v-text-field>
        <!-- na mpei search stis erwthseis -->
        <v-card-text>
            <v-data-table
                :headers="computedHeaders"
                :items="this.questions"
                :search="search"
                style="cursor: pointer"
            >
                <template v-slot:[`item.title`]="{ item }">
                    <span @click="handleClick(item)">{{ item.title }}</span>
                </template>
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
                <template v-slot:[`item.remove`]="props" v-if="admin">
                    <v-icon small @click="removeObject(props.item)"
                        >mdi-delete</v-icon
                    >
                </template>
            </v-data-table>
            <v-btn @click="sessionCheck1">session check</v-btn>
        </v-card-text>
    </v-card>
</template>
<script lang="ts">
import router from '@/router';
import store from '@/store';
import ky from 'ky';
import Vue from 'vue'
import { mapGetters } from 'vuex';
import { checkSession, deleteAnswer, deleteQuestion, getQuestion, getQuestions, getUsers } from './functions'
export default Vue.extend({
    data: () => ({
        admin: true,
        search: "",
        questionsCols: [{ text: "Answers", align: 'start', sortable: true, value: 'answers' },
        { text: "Votes", align: 'start', sortable: true, value: 'votes' },
        { text: "Question", align: 'start', sortable: true, value: 'title' },
        {
            text: 'User',
            align: 'start',
            sortable: true,
            value: 'user'
        },
        { text: "id", align: 'd-none', sortable: false, value: 'question_id' },
        { text: "", align: 'center', sortable: false, value: 'remove' }
        ],
        questions: [
            // { answers: "13", votes: "50", question: "What's an intuitive way to think about the determinant?", user: "Ioanna96" },
            // { answers: "5", votes: "28", question: "Why is a ring that has only one prime helpful?", user: "Tolis90" },\
        ] as any[],
        fuContent: false
    }),
    computed: {
        ...mapGetters(["getQuestions", "getUsers", "getQuestionData"]),

        // async questionsItems() {
        //     let questions = [] as any[];
        //     // console.log(value, "value of get questions");
        //     for (const question of this.getQuestions) {
        //         const questionData = await getQuestion(question.question_id);
        //         const answers = questionData.answers;
        //         const answersNumber = answers.length;
        //         const questionObject = { answers: answersNumber, votes: "10", title: question.title, user: "Ioanna", question_id:question.question_id };
        //         questions.push(questionObject);
        //         console.log(questions, "these are questions")
        //     }
        //     return questions;
        // },
        computedHeaders(): any {
            return this.questionsCols.filter(word => word.value !== "question_id")
        }
    },
    watch: {
        async getQuestions(value: any) {
            let questionsArray = [] as any[];
            let answers = [] as any[];
            console.log(value, "value of get questions");
            const users = await getUsers();
            for (const question of value) {
                //if user id !== null
                if (question.UserUserId !== null) {
                    const questionData = await getQuestion(question.question_id)
                    console.log(questionData, "value of questionData");

                    const questionObject = { answers: this.getAnswers(questionData), votes: this.getVotes(questionData), title: question.title, user: await this.getUsername(question), question_id: question.question_id };
                    questionsArray.push(questionObject);
                }
                //
            }
            console.log(questionsArray, "this. questionsArray")
            this.questions = questionsArray;
            console.log(this.questions, "this. questions")
        },
        getUsers(value: any) {
            console.log(value, "these are the users");

        }
    },


    methods: {
        async handleClick(value: any) {
            // router.push('/question')
            console.log(value, "the value");
            const questionId = value.question_id;
            this.$router.push('/question');
            const questionData = await getQuestion(questionId);
            console.log(questionData, "the row data");
            this.$store.commit("setQuestionData", questionData)
        },
        async getUsersNames() {
            const users = await getUsers();
        },
        async removeObject(value: any) {
            console.log(value, "the value of remove object")
            //when delete question delete all its answers
            const answers = this.getQuestionData.answers
            if (answers.length !== 0) {
                for (const answer of this.getQuestionData.answers) {
                    const deleteAnswerObject = await deleteAnswer(answer.answer_id);
                }
            }
            const deleteQuestionObject = await deleteQuestion(value.question_id);
            //
            this.$router.go(0);
            // this.$router.push('/').catch((err: any) => {
            //     console.warn('error in deletion of question, the error:', err)
            // });
        },
        forceUpdate2() {
            this.fuContent = !this.fuContent;
        },
        async sessionCheck1() {
            console.log(window.sessionStorage.getItem("session"), "the session storage")
            // console.log(, "the session storage")
            const a = await checkSession()
            console.log(a, 'the a!!!')

        },
        getAnswers(questionData: any) {
            //
            let answers: any[] = []
            for (const answer of questionData.answers) {
                if (answer.UserUserId !== null) {
                    answers.push(answer)
                }
            }
            console.log(answers, "the answers222")
            return answers.length;
        },
        getVotes(questionData: any) {
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
            return votesSum;
        },
        async getUsername(question: any) {
            //
            const users = await getUsers()
            // for (const user of users) {
            // if (user.user_id === questionData.UserUserId) {
            const index = users.findIndex((el: any) => el.user_id === question.UserUserId)
            if (index !== -1) {
                const username = users[index].username
                return username
            }
            // }
            // }
        }
    },
    async mounted() {
        await getQuestions();
        this.getQuestions;
        this.getUsers;
        console.log(this.getUsers, "THE USERS")
    }
})
</script>