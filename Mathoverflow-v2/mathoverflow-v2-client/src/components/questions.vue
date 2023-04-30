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
                <v-icon class="me-2">mdi-earth</v-icon> All Questions
            </v-card-text>
        </v-card>
        <v-card
            :key="fuContent"
            style="border-top: 2px solid #b39ddb"
            flat
            class="px-4"
            rounded="sm"
        >
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
                    :items-per-page="5"
                    :custom-filter="customSearch"
                >
                    <template v-slot:[`item.title`]="{ item }">
                        <v-card
                            flat
                            class="pt-11 pb-3 px-0"
                            color="transparent"
                            width="370px"
                        >
                            <!-- <v-card-text class="text-truncate"> -->
                            <v-card-text class="pa-0 ms-3">
                                <span
                                    @click="handleClick(item)"
                                    class="qTittle"
                                >
                                    {{ item.title.title }}
                                </span>
                            </v-card-text>
                        </v-card>
                        <v-card
                            flat
                            class="pb-2 px-0"
                            color="transparent"
                            :width="
                                $vuetify.breakpoint.mdAndDown
                                    ? '200px'
                                    : '360px'
                            "
                        >
                            <v-card-text
                                class="answerBody pa-0 ms-7 text-truncate"
                                @click="handleClick(item)"
                            >
                                <vue-editor
                                    class="kappa"
                                    disabled
                                    v-model="item.title.body"
                                    :editorOptions="editorOptions"
                                    :style="editorStyle"
                                >
                                </vue-editor>
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
                    <template v-slot:[`item.user`]="props">
                        <v-card
                            flat
                            class="py-0 px-0"
                            color="transparent"
                            width="100px"
                        >
                            <v-card-text class="pa-0">
                                <v-row justify="center" align="center">
                                    <v-col
                                        cols="5"
                                        class="pa-0"
                                        justify="center"
                                        align="center"
                                    >
                                        <v-img
                                            contain
                                            src="/prof_photo.png"
                                            height="40"
                                        ></v-img>
                                    </v-col>
                                    <!-- <v-icon>mdi-account</v-icon> -->
                                    <v-col
                                        cols="7"
                                        class="pa-0"
                                        justify="center"
                                        align="center"
                                    >
                                        <v-row
                                            class="ms-0 me-0"
                                            justify="center"
                                            align="center"
                                        >
                                            <span>{{
                                                props.item.user.username
                                            }}</span>
                                        </v-row>
                                        <v-row
                                            class="ms-1"
                                            justify="center"
                                            align="center"
                                        >
                                            <span class="font-weight-medium">{{
                                                props.item.user.reputation
                                            }}</span>
                                            <v-icon
                                                size="20px"
                                                color="#FBC02D"
                                                class="ms-1"
                                                >mdi-trophy</v-icon
                                            >
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </template>
                    <template v-slot:[`item.remove`]="props" v-if="admin">
                        <v-icon
                            color="#5fb1e8"
                            v-if="checkUserAction(props.item)"
                            @click="removeObject(props.item)"
                            >mdi-delete</v-icon
                        >
                    </template>
                </v-data-table>
                <!-- <v-btn @click="sessionCheck1">session check</v-btn> -->
            </v-card-text>
        </v-card>
        <progress-circular
            :progressCircular="progressCircular"
        ></progress-circular>
    </v-container>
</template>
<script lang="ts">
import dayjs from 'dayjs'
import Vue from 'vue'
import { mapGetters } from 'vuex';
import { VueEditor } from "vue2-editor";
import progressCircular from "@/tools/circular_loading/circular_loading.vue"
import { checkSession, createHistorical, deleteAnswer, deleteQuestion, getQuestion, getQuestions, getUserReputation, getUsers } from './functions'
export default Vue.extend({
    components: { VueEditor, progressCircular },
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
        fuContent: false,
        questionsSortType: '',
        editorOptions: {
            modules: {
                toolbar: false,
            },
        },
        editorStyle: {
            "height": '60px',
            // "border": "1px solid transparent"
        },
        progressCircular: false

    }),
    computed: {
        ...mapGetters(["getQuestions", "getUsers", "getQuestionData", "getLoggedUser"]),
        computedHeaders(): any {
            return this.questionsCols.filter(word => word.value !== "question_id")
        }
    },
    watch: {
        async getQuestions(value: any) {
            this.progressCircular = true;
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
                    const titleAndBody = { title: question.title, body: question.body }
                    const questionObject = { answers: this.getAnswers(questionData), votes: this.getVotes(questionData), title: titleAndBody, created: question.createdAt/*dayjs(question.createdAt).format("DD MMM. YYYY | HH:mm:ss")*/, user: await this.getUsername(question), question_id: question.question_id };
                    questionsArray.push(questionObject);
                }
                //
            }
            console.log(questionsArray, "this. questionsArray")
            this.questions = questionsArray;
            console.log(this.questions, "this. questions")
            this.progressCircular = false
        },
        getUsers(value: any) {
            console.log(value, "these are the users");

        }
    },


    methods: {
        customSearch(value: any, search: any, item: any) {
            console.log(Object.values(item), 'the object values')
            console.log(value, 'the  value in serach')
            return Object.values(item).some((v: any) => typeof v === 'object' && v.title !== undefined ? v.title.includes(search) || v.body.includes(search) : false)
        },
        async getUserObject(user: any) {
            const userObject = {
                ...user,
                reputation: await this.getUserRep(user.user_id)
            }
            console.log(userObject, 'the user object')
            return userObject;
        },
        async getUserRep(userId: number) {
            const userRep = await getUserReputation(userId)
            console.log(userRep, 'the user reputation')
            return userRep.value;
        },
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
            return dayjs(value).format("MMM DD, YYYY | HH:mm:ss")
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
            console.log(this.getQuestionData, "the question data2")
            //when delete question delete all its answers
            const answers = value.answers
            if (answers !== 0) {
                console.log('skata mpika edw')
                const question = await getQuestion(value.question_id)
                console.log(question, 'the clicked question')
                // for (const answer of this.getQuestionData.answers) {
                for (const answer of question.answers) {
                    const deleteAnswerObject = await deleteAnswer(answer.answer_id);
                    //
                    const historicalData = {
                        action: 'delete-answer',
                        data: answer//value
                    }
                    await createHistorical(historicalData)
                    //
                }
                const deleteQuestionObject = await deleteQuestion(value.question_id);
            } else {
                console.log('mpika edw')
                const deleteQuestionObject = await deleteQuestion(value.question_id);
            }
            const historicalData = {
                action: 'delete-question',
                data: value
            }
            await createHistorical(historicalData)
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
                //
                const user = await this.getUserObject(users[index])
                console.log(user, 'the get user name user')
                // const username = users[index].username
                return user;
            }
        },
        checkUserAction(item: any) {
            console.log(item, 'the item in check user acctions')
            console.log(this.getLoggedUser, 'the get logged user')
            if (item.user.user_id === this.getLoggedUser.user_id) return true;
            else false;
        }
    },
    async mounted() {
        // this.progressCircular = true;
        this.questionsSortType = 'created'
        await getQuestions();
        this.getQuestions;
        this.getUsers;
        console.log(this.getUsers, "THE USERS")
        // this.progressCircular = false;


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