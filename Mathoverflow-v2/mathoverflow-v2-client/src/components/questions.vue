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
            :width="$vuetify.breakpoint.smAndDown ? '70%' : '35%'"
            style="z-index: 20001"
            class="overlayQues"
            dark
        >
            <v-card-text
                class="text-overline font-weight-bold d-flex justify-center py-2"
                style="color: white"
            >
                <v-icon class="me-2">mdi-rocket-launch</v-icon> Explore our
                Questions
            </v-card-text>
        </v-card>
        <v-card
            :key="fuContent"
            style="border-top: 2px solid #b39ddb"
            flat
            class="px-4"
            rounded="sm"
        >
            <!-- <v-card
            :key="fuContent"
            elevation="1"
            style="border: 2px solid #e0e0e0"
            class="px-4"
            rounded="lg"
        > -->
            <!-- na mpei search stis erwthseis -->
            <v-card-text class="pt-8">
                <v-row class="mb-3">
                    <v-icon>mdi-icon</v-icon>
                    <v-spacer></v-spacer>
                    <v-btn
                        x-small
                        color="#26C6DA"
                        dark
                        :outlined="
                            questionsSortType === 'created' ? false : true
                        "
                        @click="sortQuestions(2)"
                        class="mt-1 mb-2 ml-2"
                        >Newest
                    </v-btn>
                    <v-btn
                        x-small
                        color="#26C6DA"
                        dark
                        @click="sortQuestions(1)"
                        :outlined="questionsSortType === 'votes' ? false : true"
                        class="ml-2 mt-1 mb-2"
                        >Score
                    </v-btn>
                    <v-btn
                        x-small
                        color="#26C6DA"
                        dark
                        :outlined="
                            questionsSortType === 'answers' ? false : true
                        "
                        @click="sortQuestions(3)"
                        class="mt-1 mb-2 ml-2"
                        >Answers
                    </v-btn>
                </v-row>
                <v-data-table
                    :headers="computedHeaders"
                    :items="this.questions"
                    :search="search"
                    style="cursor: pointer"
                    :sort-by="questionsSortType"
                    :sort-desc="true"
                >
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
                    <template v-slot:[`item.created`]="{ item }">
                        <!-- <v-chip color="grey" class="px-4" dark> -->
                        {{ getCreationDate(item.created) }}
                        <!-- </v-chip> -->
                    </template>
                    <template v-slot:[`item.remove`]="props" v-if="admin">
                        <v-icon @click="removeObject(props.item)"
                            >mdi-delete</v-icon
                        >
                    </template>
                </v-data-table>
                <v-btn @click="sessionCheck1">session check</v-btn>
            </v-card-text>
        </v-card>
    </v-container>
</template>
<script lang="ts">
import dayjs from 'dayjs'
import Vue from 'vue'
import { mapGetters } from 'vuex';
import { checkSession, deleteAnswer, deleteQuestion, getQuestion, getQuestions, getUsers } from './functions'
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
        questions: [
            // { answers: "13", votes: "50", question: "What's an intuitive way to think about the determinant?", user: "Ioanna96" },
            // { answers: "5", votes: "28", question: "Why is a ring that has only one prime helpful?", user: "Tolis90" },\
        ] as any[],
        fuContent: false,
        questionsSortType: ''
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
                    console.log(question, "value of que");

                    const questionObject = { answers: this.getAnswers(questionData), votes: this.getVotes(questionData), title: question.title, created: question.createdAt/*dayjs(question.createdAt).format("DD MMM. YYYY | HH:mm:ss")*/, user: await this.getUsername(question), question_id: question.question_id };
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
        sortQuestions(value: number) {
            if (value === 1) {
                this.questionsSortType = 'votes'
            } else if (value === 2) {
                this.questionsSortType = 'created'
            } else if (value === 3) {
                this.questionsSortType = 'answers'
            }
        },
        getCreationDate(value: string) {
            return dayjs(value).format("DD MMM. YYYY | HH:mm:ss")
        },
        async handleClick(value: any) {
            // router.push('/question')
            console.log(value, "the value");
            const questionId = value.question_id;
            // this.$router.push('/question');
            this.$router.push(`questions/${questionId}`);
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
            const answers = value.answers
            if (answers !== 0) {
                console.log('skata mpika edw')

                for (const answer of this.getQuestionData.answers) {
                    const deleteAnswerObject = await deleteAnswer(answer.answer_id);
                }
                const deleteQuestionObject = await deleteQuestion(value.question_id);

            } else {
                console.log('mpika edw')
                const deleteQuestionObject = await deleteQuestion(value.question_id);
            }
            //
            this.$router.go(0);

        },
        forceUpdate2() {
            this.fuContent = !this.fuContent;
        },
        ask() {
            this.$router.push('/ask')
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
        this.questionsSortType = 'created'
        await getQuestions();
        this.getQuestions;
        this.getUsers;
        console.log(this.getUsers, "THE USERS")
    }
})
</script>
<style>
.overlayQues {
    top: 16px;
    left: 10px;
}
.searchField {
    width: 500px;
}
.searchField .v-input__slot::before {
    border-style: none !important;
}

.qTittle {
    white-space: pre-line !important;
    color: #166ac2;
}
</style>