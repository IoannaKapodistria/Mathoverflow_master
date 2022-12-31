<template>
    <v-container fluid>
        <v-row class="mb-4">
            <v-col cols="10">
                <v-chip dark color="#82B1FF" class="d-flex pb-8 pt-4 mt-1">
                    <!-- <span class="d-flex"> -->
                    <v-text-field
                        v-model="search"
                        prepend-icon="mdi-database-search"
                        label="Search on MathOverflow.."
                        single-line
                        hide-details
                        class="searchField pt-5 pb-1"
                    >
                    </v-text-field>
                    <!-- </span> -->
                </v-chip>
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
        <v-card
            color="#B388FF"
            rounded="md"
            elevation="3"
            :width="$vuetify.breakpoint.smAndDown ? '70%' : '30%'"
            style="z-index: 20001"
            class="overlayTopQues"
            dark
        >
            <v-card-text
                class="text-overline font-weight-bold d-flex justify-center py-2"
                style="color: white"
            >
                <v-icon class="me-2">mdi-trophy</v-icon> Top Voted Questions
            </v-card-text>
        </v-card>
        <v-card flat rounded="sm" style="border-top: 2px solid #b39ddb">
            <v-card-text class="pt-8">
                <v-data-table
                    :headers="computedHeaders"
                    :items="this.questions"
                    :search="search"
                    @click:row="handleClick"
                    style="cursor: pointer"
                    sort-by="votes"
                    :sort-desc="true"
                >
                    <!-- <template v-slot:[`item.answers`]="{ item }">
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
                </template> -->
                    <template v-slot:[`item.title`]="{ item }">
                        <v-card
                            flat
                            class="py-11 px-0"
                            color="transparent"
                            width="370px"
                        >
                            <!-- <v-card-text class="text-truncate"> -->
                            <v-card-text class="pa-0 ms-3">
                                <span
                                    @click="handleClick(item)"
                                    class="qTittle"
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
    </v-container>
</template>
<script lang="ts">
import router from '@/router';
import store from '@/store';
import dayjs from 'dayjs';
import Vue from 'vue'
import { mapGetters } from 'vuex';
import { getQuestion, getQuestions, getUsers } from './functions'
export default Vue.extend({
    data: () => ({
        admin: true,
        search: "",
        questionsCols: [
            { text: "Votes", align: 'center', sortable: true, value: 'votes', class: 'title text-caption font-weight-medium' },
            { text: "Question", align: 'center', sortable: true, value: 'title', class: 'title text-caption font-weight-medium' },
            { text: "Answers", align: 'center', sortable: true, value: 'answers', class: 'title text-caption font-weight-medium' },
            { text: "Timestamp", align: 'center', sortable: true, value: 'created', class: 'title text-caption font-weight-medium' },
            {
                text: 'User',
                align: 'start',
                sortable: true,
                value: 'user',
                class: ' title text-caption font-weight-medium'
            },
            { text: "id", align: 'd-none', sortable: false, value: 'question_id' },
            { text: "", align: 'center', sortable: false, value: 'remove' }

        ],
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
            let questionsArray = [] as any[];
            console.log(value, "value of get questions");
            const users = await getUsers();
            for (const question of value) {
                const questionData = await getQuestion(question.question_id);
                const answers = questionData.answers;
                const answersNumber = answers.length;
                const votes = questionData.votes
                const votesNumber = votes.length;
                const votesArray: any[] = []
                for (const vote of votes) {
                    const value = vote.value
                    votesArray.push(value)
                }
                //get the sum
                const votesSum = votesArray.reduce((a, b) => a + b, 0)
                if (/*votesNumber !== 0 &&*/ votesSum > 0) {
                    //calculate votes
                    for (const user of users) {
                        if (user.user_id === question.UserUserId) {
                            const questionObject = { answers: answersNumber, votes: votesSum, title: question.title, created: dayjs(question.createdAt).format("DD MMM. YYYY | HH:mm:ss"), user: user.username, question_id: question.question_id };
                            questionsArray.push(questionObject);
                        }
                    }
                }
            }
            // console.log(questionsArray, "this. questionsArray")
            this.questions = questionsArray;
            // console.log(this.questions, "this. questions")
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
            // this.$router.push('/question');
            this.$router.push(`questions/${questionId}`);
            const questionData = await getQuestion(questionId);
            console.log(questionData, "the row data");
            store.commit("setQuestionData", questionData)
        },
        async getUsersNames() {
            const users = await getUsers();
        },
        ask() {
            this.$router.push('/ask')
        },
    },
    async mounted() {
        getQuestions();
        this.getQuestions;
        this.getUsers;
        console.log(this.getUsers, "THE USERS")
    }
})
</script>
<style>
.qTittle {
    white-space: pre-line !important;
    color: #166ac2;
}
.searchField {
    width: 500px;
}
.searchField .v-input__slot::before {
    border-style: none !important;
}
.overlayTopQues {
    top: 16px;
    left: 10px;
}
</style>