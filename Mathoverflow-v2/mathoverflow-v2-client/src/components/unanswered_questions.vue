<template>
    <v-card flat>
        <v-toolbar flat>
            <v-toolbar-title> Unanswered Questions </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon>mdi-help</v-icon>
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
                <template v-slot:[`item.remove`]="props" v-if="admin">
                    <v-icon small @click="removeObject(props.item)"
                        >mdi-delete</v-icon
                    >
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>
</template>
<script lang="ts">
import router from '@/router';
import store from '@/store';
import Vue from 'vue'
import { mapGetters } from 'vuex';
import { getQuestion, getQuestions, getUsers } from './functions'
export default Vue.extend({
    data: () => ({
        admin: true,
        search: "",
        questionsCols: [{ text: "Answers", align: 'start', sortable: true, value: 'answers' }, { text: "Votes", align: 'start', sortable: true, value: 'votes' }, { text: "Question", align: 'start', sortable: true, value: 'title' }, {
            text: 'User',
            align: 'start',
            sortable: true,
            value: 'user'
        }, { text: "id", align: 'd-none', sortable: false, value: 'question_id' }, { text: "", align: 'center', sortable: false, value: 'remove' }],
        questions: [] as any[],
    }),
    computed: {
        ...mapGetters(["getQuestions", "getUsers"]),

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
        computedHeaders() {
            return this.questionsCols.filter(word => word.value !== "question_id")
        }
    },
    watch: {
        async getQuestions(value: any) {
            let unansweredQuestionsArray = [] as any[];
            console.log(value, "value of get questions");
            const users = await getUsers();
            for (const question of value) {
                const questionData = await getQuestion(question.question_id);
                const answers = questionData.answers;
                const answersNumber = answers.length;
                if (answersNumber === 0) {
                    // for (const user of users) {
                    //     if (user.user_id === question.UserUserId) {

                    //         const questionObject = { answers: answersNumber, votes: "12", title: question.title, user: user.username, question_id: question.question_id };
                    //         unansweredQuestionsArray.push(questionObject);
                    //     }
                    // }
                    const votes = questionData.votes;
                    const votesArray: any[] = []
                    //calculate votes
                    for (const vote of votes) {
                        const value = vote.value
                        votesArray.push(value)
                    }
                    //get the sum
                    const votesSum = votesArray.reduce((a, b) => a + b, 0)
                    const answersNumber = answers.length;
                    for (const user of users) {
                        if (user.user_id === question.UserUserId) {

                            const questionObject = { answers: answersNumber, votes: votesSum, title: question.title, user: user.username, question_id: question.question_id };
                            unansweredQuestionsArray.push(questionObject);
                        }
                    }
                }
            }
            console.log(unansweredQuestionsArray, "this. questionsArray")
            this.questions = unansweredQuestionsArray;
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
            store.commit("setQuestionData", questionData)
        },
        async getUsersNames() {
            const users = await getUsers();
        }
    },
    async mounted() {
        getQuestions();
        this.getQuestions;
        this.getUsers;
        console.log(this.getUsers, "THE USERS")
    }
})
</script>