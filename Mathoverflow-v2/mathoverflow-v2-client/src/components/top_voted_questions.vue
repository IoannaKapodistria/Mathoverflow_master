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
                <v-row class="mb-3">
                    <v-icon>mdi-icon</v-icon>
                    <v-spacer></v-spacer>
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
                        <v-chip
                            @click="handleClick(item)"
                            color="#F06292"
                            class="px-4"
                            dark
                        >
                            {{ item.answers }}
                        </v-chip>
                    </template>
                    <template v-slot:[`item.votes`]="{ item }">
                        <v-chip
                            @click="handleClick(item)"
                            color="#7C4DFF"
                            class="px-4"
                            dark
                        >
                            {{ item.votes }}
                        </v-chip>
                    </template>
                    <template v-slot:[`item.created`]="{ item }">
                        <div @click="handleClick(item)">
                            {{ getCreationDate(item.created) }}
                        </div>
                    </template>
                    <template v-slot:[`item.user`]="props">
                        <v-card
                            flat
                            class="py-0 px-0"
                            color="transparent"
                            width="100px"
                            @click="handleClick(props.item)"
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
                            v-if="checkUserAction(props.item) || getAdmin"
                            @click="removeObject(props.item)"
                            >mdi-delete</v-icon
                        >
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
        <progress-circular
            :progressCircular="progressCircular"
        ></progress-circular>
    </v-container>
</template>
<script lang="ts">
import router from '@/router';
import store from '@/store';
import dayjs from 'dayjs';
import Vue from 'vue'
import { mapGetters } from 'vuex';
import { VueEditor } from "vue2-editor";
import { createHistorical, deleteAnswer, deleteAnswerVote, deleteQuestion, deleteVote, getAnswer, getQuestion, getQuestions, getUserReputation, getUsers } from './functions'
import progressCircular from "@/tools/circular_loading/circular_loading.vue"
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
        questionsSortType: '',
        editorOptions: {
            modules: {
                toolbar: false,
            },
        },
        editorStyle: {
            "height": '60px',
        },
        progressCircular: false
    }),
    computed: {
        ...mapGetters(["getQuestions", "getUsers", "getLoggedUser", "getQuestionData", "getAdmin"]),
        computedHeaders(): any {
            return this.questionsCols.filter(word => word.value !== "question_id")
        }
    },
    watch: {
        async getQuestions(value: any) {
            this.progressCircular = true;
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
                            const titleAndBody = { title: question.title, body: question.body }
                            const questionObject = { answers: answersNumber, votes: votesSum, title: titleAndBody, created: question.createdAt, user: await this.getUserObject(user) /*user.username*/, question_id: question.question_id };
                            questionsArray.push(questionObject);
                        }
                    }
                }
            }
            this.questions = questionsArray;
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
            store.commit("setQuestionData", questionData)
        },
        async getUsersNames() {
            const users = await getUsers();
        },
        ask() {
            this.$router.push('/ask')
        },
        checkUserAction(item: any) {
            console.log(item, 'the item in check user acctions')
            console.log(this.getLoggedUser, 'the get logged user')
            if (item.user.user_id === this.getLoggedUser.user_id) return true;
            else false;
        },
        async removeObject(value: any) {
            console.log(value, "the value of remove object")
            let deleteQuestionObject: any;
            //delete votes
            const qData = await getQuestion(value.question_id)
            console.log(qData, 'THE QDATA222')
            const vot = qData.votes
            if (vot.length !== 0) {
                for (const vote of vot) {
                    await deleteVote(vote.vote_id)
                }
            }
            //when delete question delete all its answers
            const answers = value.answers
            if (answers !== 0) {
                console.log('skata mpika edw')
                // const question = await getQuestion(value.question_id)
                for (const answer of qData.answers) {
                    const answerData = await getAnswer(answer.answer_id)
                    console.log(answerData, 'the answer data')
                    if (answerData.answerVotes.length !== 0) {
                        for (const answerVote of answerData.answerVotes) {
                            await deleteAnswerVote(answerVote.vote_id)
                        }
                    }
                    const deleteAnswerObject = await deleteAnswer(answer.answer_id);
                    const historicalData = {
                        action: 'delete-answer',
                        data: answer//value
                    }
                    await createHistorical(historicalData)
                }
                deleteQuestionObject = await deleteQuestion(value.question_id);
            } else {
                console.log('mpika edw')
                deleteQuestionObject = await deleteQuestion(value.question_id);
            }
            //
            const historicalData = {
                action: 'delete-question',
                data: value
            }
            await createHistorical(historicalData)
            //
            if (deleteQuestionObject.message === 'Question was deleted successfully!') {
                const queIndex = this.questions.findIndex((el: any) => el.question_id === value.question_id)
                if (queIndex !== -1) this.questions.splice(queIndex, 1)
            }
            // this.$router.go(0);

        },
    },
    async mounted() {
        this.questionsSortType = 'votes'
        await getQuestions();
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