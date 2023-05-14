<template>
    <v-container fluid>
        <v-card flat class="mt-7">
            <v-row>
                <v-col cols="2" class="pa-0">
                    <v-img contain src="/prof_photo.png"></v-img>
                </v-col>
                <v-col class="pa-0 ms-7">
                    <v-card-text>
                        <v-row class="mt-3">
                            <span
                                class="text-h4 font-weight-normal"
                                style="color: #32325d !important"
                            >
                                {{ user.username }}
                            </span>
                            <v-spacer></v-spacer>
                            <span class="me-9">
                                <v-btn
                                    v-if="checkUserAction3(user) || getAdmin"
                                    x-small
                                    class="py-3"
                                    outlined
                                    color="#B388FF"
                                    @click="deleteUser"
                                    style="
                                        text-transform: none !important;
                                        font-size: 14px;
                                    "
                                >
                                    Delete user
                                </v-btn>
                            </span>
                        </v-row>
                        <!--  -->
                        <v-row>
                            <div class="grey--text mt-4">
                                <!-- na upologizetai me new date ktlp h h merominia p einai eggegramenos -->
                                <span class="grey--text">
                                    <v-icon medium class="mb-2" color="#26C6DA"
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
                                    <v-icon color="#26C6DA" class="mb-1"
                                        >mdi-at</v-icon
                                    >
                                </span>

                                {{ user.email }}
                            </div>
                        </v-row>
                        <v-row class="py-0">
                            <div class="grey--text">
                                <!-- na upologizetai me new date ktlp h h merominia p einai eggegramenos -->
                                <span class="grey--text">
                                    <v-icon color="#26C6DA" class="mb-1"
                                        >mdi-map-marker</v-icon
                                    >
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
        <v-tabs
            v-model="tab"
            background-color="transparent"
            grow
            class="mt-2 pt-0 mx-0"
            color="#B388FF"
        >
            <v-tab>
                <span>Activity</span>
                <v-icon right>mdi-seesaw</v-icon>
            </v-tab>
            <v-tab>
                <span>Backlog</span>
                <v-icon right>mdi-database-clock</v-icon>
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab" class="mb-0">
            <v-tab-item class="mt-2">
                <v-card
                    color="#26C6DA"
                    rounded="md"
                    elevation="3"
                    width="35%"
                    style="z-index: 20001"
                    class="overlayUserQues"
                    dark
                >
                    <v-card-text
                        class="text-overline font-weight-bold d-flex justify-center py-2"
                        style="color: white"
                    >
                        <v-icon class="me-2">mdi-chart-bubble</v-icon>
                        Stats
                    </v-card-text>
                </v-card>
                <!-- <v-card style="border-top: 2px solid #26c6da" flat rounded="sm"> -->
                <v-card
                    rounded="lg"
                    elevation="1"
                    style="border: 2px solid #e0e0e0"
                    class="mb-16"
                >
                    <v-card-text class="pt-">
                        <v-row class="mt-3" justify="center" align="center">
                            <v-col
                                v-for="(resource, i) in resources"
                                :key="i"
                                class="mt-4 mb-5 px-3"
                                cols="4"
                                justify="center"
                                align="center"
                            >
                                <v-card
                                    class="pb-10 pt-2 px-0"
                                    width="65%"
                                    rounded="lg"
                                    elevation="2"
                                    style="
                                        border: 3px solid #b388ff !important;
                                        border-radius: 8% !important;
                                    "
                                    color="#f7fbfa"
                                >
                                    <v-toolbar dense flat color="#f7fbfa">
                                        <v-spacer></v-spacer>
                                        <v-toolbar-title
                                            color="#f7fbfa"
                                            class="text-h6"
                                            style="color: #32325d !important"
                                        >
                                            <v-icon :color="resource.color">{{
                                                resource.icon
                                            }}</v-icon>
                                            {{ resource.name }}
                                        </v-toolbar-title>
                                        <v-spacer></v-spacer>
                                    </v-toolbar>
                                    <v-toolbar flat color="#f7fbfa">
                                        <v-spacer></v-spacer>
                                        <!-- <v-card
                                            elevation="2"
                                            :color="resource.color"
                                            outlined
                                            rounded="circle"
                                            class="chip-card"
                                        >
                                            <v-toolbar
                                                flat
                                                class="px-3 ma-2 text-h6"
                                            >
                                                {{ resource.value }}
                                            </v-toolbar>
                                        </v-card> -->
                                        <v-progress-circular
                                            :width="8"
                                            :size="85"
                                            :color="resource.color"
                                            value="100"
                                            class="text-h6 ms-2"
                                            >{{
                                                resource.value
                                            }}</v-progress-circular
                                        >
                                        <v-spacer></v-spacer>
                                    </v-toolbar>
                                </v-card>
                                <!--  -->

                                <!--  -->
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
                <!-- apexchart with user activity in charts -->
                <!-- <v-btn @click="getUserHistorical1">get historical</v-btn> -->
                <v-card
                    color="#26C6DA"
                    rounded="md"
                    elevation="3"
                    width="35%"
                    style="z-index: 20001"
                    class="overlayUserQues"
                    dark
                >
                    <v-card-text
                        class="text-overline font-weight-bold d-flex justify-center py-2"
                        style="color: white"
                    >
                        <v-icon class="me-2"
                            >mdi-chart-bell-curve-cumulative</v-icon
                        >
                        Historical
                    </v-card-text>
                </v-card>
                <v-card
                    rounded="lg"
                    elevation="1"
                    style="border: 2px solid #e0e0e0"
                >
                    <v-card-text class="pt-8">
                        <apexchart
                            height="300px"
                            :options="options"
                            :series="series"
                        ></apexchart>
                    </v-card-text>
                </v-card>
                <progress-circular
                    :progressCircular="progressCircular"
                ></progress-circular>
            </v-tab-item>
            <v-tab-item class="mt-2">
                <v-card
                    color="#26C6DA"
                    rounded="md"
                    elevation="3"
                    width="35%"
                    style="z-index: 20001"
                    class="overlayUserQues"
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
                                    questionsSortType === 'created'
                                        ? true
                                        : false
                                "
                                class="mt-1 mb-2"
                                >Score
                            </v-btn>
                            <v-btn
                                x-small
                                color="#26C6DA"
                                dark
                                :outlined="
                                    questionsSortType === 'created'
                                        ? false
                                        : true
                                "
                                @click="sortUserQues(2)"
                                class="mt-1 mb-2 ml-2"
                                >Newest
                            </v-btn>
                        </v-row>
                        <v-data-table
                            :headers="questionsCols"
                            :items="questions"
                            style="cursor: pointer"
                            :sort-by="questionsSortType"
                            :sort-desc="true"
                            :items-per-page="6"
                        >
                            <template v-slot:[`item.title`]="{ item }">
                                <v-card
                                    flat
                                    class="py-7 px-0"
                                    color="transparent"
                                    width="370px"
                                >
                                    <v-card-text
                                        class="pa-0 ms-6 text-truncate"
                                    >
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
                                <v-chip color="#7C4DFF" class="px-4" dark>
                                    {{ item.votes }}
                                </v-chip>
                            </template>
                            <template v-slot:[`item.created`]="{ item }">
                                <!-- <v-chip color="grey" class="px-4" dark> -->
                                {{ getCreationDate(item.created) }}
                                <!-- </v-chip> -->
                            </template>
                            <template v-slot:[`item.remove`]="props">
                                <v-icon
                                    color="#5fb1e8"
                                    v-if="
                                        checkUserAction(props.item) || getAdmin
                                    "
                                    @click="removeObject(props.item)"
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
                    class="overlayUserQues"
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
                                :outlined="
                                    answersSortType === 'created' ? true : false
                                "
                                class="mt-1 mb-2"
                                >Score
                            </v-btn>
                            <v-btn
                                x-small
                                color="#26C6DA"
                                dark
                                :outlined="
                                    answersSortType === 'created' ? false : true
                                "
                                @click="sortUserAnswers(2)"
                                class="mt-1 mb-2 ml-2"
                                >Newest
                            </v-btn>
                        </v-row>
                        <v-data-table
                            :key="fu"
                            :headers="answersCols"
                            :items="answerObjects"
                            style="cursor: pointer"
                            :sort-by="answersSortType"
                            :sort-desc="true"
                            :items-per-page="6"
                        >
                            <template v-slot:[`item.votes`]="props">
                                <v-chip color="#7C4DFF" dark class="mt-3">
                                    {{ props.item.votes }}
                                </v-chip>
                            </template>
                            <template v-slot:[`item.body`]="props">
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
                                        <vue-editor
                                            class="kappa"
                                            disabled
                                            v-model="props.item.body"
                                            :editorOptions="editorOptions"
                                            :style="editorStyle"
                                        >
                                        </vue-editor>
                                    </v-card-text>
                                </v-card>
                            </template>
                            <template v-slot:[`item.created`]="{ item }">
                                {{ getCreationDate(item.created) }}
                            </template>
                            <template v-slot:[`item.remove`]="props">
                                <v-icon
                                    color="#5fb1e8"
                                    v-if="
                                        checkUserActionInAnswer(props.item) ||
                                        getAdmin
                                    "
                                    @click="removeAnswerObject(props.item)"
                                    >mdi-delete</v-icon
                                >
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { createHistorical, deleteAnswer, deleteAnswerVote, deleteQuestion, deleteVote, getAnswer, getQuestion, getUser, getUserHistorical, getUserReputation, isLogged, removeUser } from './functions';
import { mapGetters } from 'vuex';
import store from '@/store';
import { VueEditor } from "vue2-editor";
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { ApexOptions } from "apexcharts";
import Apexchart from "vue-apexcharts";
import dayjs from 'dayjs';
import utc from "dayjs/plugin/utc";
import progressCircular from "@/tools/circular_loading/circular_loading.vue"


dayjs.extend(utc)
export default Vue.extend({
    components: { VueEditor, Apexchart, progressCircular },
    data: () => ({
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
        },
        answerObjects: [] as any[],
        questionsSortType: '',
        answersSortType: '',
        tab: 0,
        resources: [
            { name: 'Questions', value: 0, color: '#B388FF', icon: 'mdi-help', uid: 'questions' },
            // { name: 'Answers', value: 0, color: '#26C6DA', icon: 'mdi-forum', uid: 'answers' },
            { name: 'Answers', value: 0, color: '#26C6DA', icon: 'mdi-wechat', uid: 'answers' },
            { name: 'Reputation', value: 0, color: '#FBC02D', icon: 'mdi-trophy', uid: 'reputation' }
        ],
        // na ftiaxtei getter
        darkTheme: false,
        series: [] as any[],

        options: {
            series: [] as any[],
            chart: {
                height: 350,
                type: 'line'
            },
            colors: ["#00BCD4", "#FF9800", "#FFEB3B", "#795548", "#9C27B0", "#4CAF50", "#2196F3",],

            dataLabels: {
                enabled: true,
                style: {
                    fontSize: '12px'
                },
                background: {
                    borderRadius: 10,
                    padding: 6
                }
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                type: 'datetime',
                categories: [] as any[],
                labels: {
                    style: {
                        colors: ["#00BCD4", "#FF9800", "#FFEB3B", "#795548", "#9C27B0", "#9C27B0", "#4CAF50", "#2196F3",],
                        fontSize: '12px'
                    }
                }


            },
            yaxis: {
                // title: 'Epochs',
                show: true,
                // labels: {
                //     formatter: (val: number) => (val.toFixed(6))
                // }
                // decimalsInFloat: 6,


            },
            tooltip: {
                enabled: true,
                x: {
                    // formatter: function (value: any, series: any) {
                    //     // use series argument to pull original string from chart data
                    //     return 'Epochs: ' + value;
                    // }
                }
            },
            title: {
                margin: 10,
                offsetX: 0,
                offsetY: 0,
                floating: false,
                text: '',
                align: 'center',
                style: {
                    fontSize: '16px',
                    fontWeight: 'bold',
                    fontFamily: undefined,
                    color: '#32325d'
                },
            }
        } as ApexOptions,
        options2: {
            series: [],
            chart: {
                height: 350,
                type: 'line',
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
            },
            legend: {
                fontSize: "17em",
            },
            markers: {
                size: 0,
                hover: {
                    sizeOffset: 6
                }
            },
            yaxis: {
                min: 0,
                labels: {
                    style: {
                        fontSize: "1em",
                    },
                },
                title: {
                    offsetX: -7,
                    style: {
                        fontSize: "1.5em",
                    },
                },
            },
            xaxis: {
                type: "datetime",
                categories: [],
                labels: {
                    // todo: make this options a different property
                    datetimeUTC: false,
                    style: {
                        fontSize: "1em",
                    },
                },
                title: {
                    offsetY: 15,
                    style: {
                        fontSize: "1.5em",
                    },
                },
            },
            tooltip: {
                style: {
                    fontSize: "1em",
                },
                x: {
                    format: "dd MMM yyyy, HH:mm:ss",
                },
                y: {
                    formatter: (val: number | undefined) => (val?.toString()),
                },
                followCursor: true,
                onDatasetHover: {
                    highlightDataSeries: true,
                },
            },
            grid: {
                borderColor: '#f1f1f1',
            }
        } as ApexOptions,
        fu: false,
        progressCircular: false
    }),
    watch: {
        getUserData(value: any) {
            console.log(value, "the value of user data")
            this.user = {
                uid: value.data.user_id,
                username: value.data.username,
                email: value.data.email,
                created: value.data.createdAt
            },
                this.questions = value.questions;
            this.answers = value.answers;
        },
    },
    computed: {
        ...mapGetters(["getUserData", "getQuestions", "getLoggedUser", "getQuestionData", "getAdmin"]),
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
        getCreationDate(value: string) {
            return dayjs(value).format("DD MMM. YYYY | HH:mm:ss")
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
                console.log(questionData, 'the que data222')
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
                const questionObject = { answers: answersNumber, votes: votesSum, title: question.title, created: question.createdAt, question_id: question.question_id, userId: questionData.data.UserUserId };
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
                    //delete votes
                    const vot = questionData.votes
                    if (vot.length !== 0) {
                        for (const vote of vot) {
                            await deleteVote(vote.vote_id)
                        }
                    }
                    //delete answers
                    const answers = questionData.answers;
                    if (answers.length !== 0) {
                        for (const answer of questionData.answers) {
                            const answerData = await getAnswer(answer.answer_id)
                            console.log(answerData, 'the answer data')
                            if (answerData.answerVotes.length !== 0) {
                                for (const answerVote of answerData.answerVotes) {
                                    await deleteAnswerVote(answerVote.vote_id)
                                }
                            }
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
            console.log(this.getUserData, 'get user dara in refresh')
            for (const answer of this.getUserData.answers) {
                const answerObject = {
                    ...answer,
                    votes: await this.getAnswerVotes(answer),
                    created: answer.createdAt//).format("DD MMM. YYYY | HH:mm:ss")
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
        },
        async getUserStats() {
            const userId = this.getUserData.data.user_id
            const rep = await this.getUserRep(userId)
            for (const item of this.resources) {
                if (item.uid === 'questions') {
                    this.resources[this.resources.indexOf(item)].value = this.questions.length;
                }
                else if (item.uid === 'answers') {
                    this.resources[this.resources.indexOf(item)].value = this.answerObjects.length;
                }
                else if (item.uid === 'reputation') {
                    console.log(this.getUserData.data, 'user data ')

                    this.resources[this.resources.indexOf(item)].value = rep//this.getUserData.data.reputation
                }
            }


        },
        async getUserRep(userId: number) {
            const userRep = await getUserReputation(userId)
            console.log(userRep, 'the user reputation')
            return userRep.value;
        },
        async getUserHistorical1() {
            const duration = dayjs().subtract(1, 'hours').toISOString()
            const userid = this.user.uid;
            const response = await getUserHistorical(userid)
            console.log(response, 'the response of get user historical')
            const array = this.groupByAction2(response)
            const array2 = this.transformArray(response)
            const modifiedSeries = this.modifyData(array2)
            console.log(modifiedSeries, 'the modifiedSeries')
            console.log(array, 'the array with the actions')
            console.log(array2, 'the array22222 with the actions')
            // let series3: any[] = []
            // const uniqueDates = Array.from(new Set(array[0].categories.map(date => dayjs.utc(date).format('YYYY-MM-DD'))))
            //     .map(date => dayjs.utc(date).toISOString());
            // console.log(uniqueDates, 'the unique dates')
            // console.log(array[0].categories, 'the array[0].categories')
            // for (const serie of array2) {
            //     const serieObject = {
            //         name: serie.name,
            //         // daa: serie.data///this.ensureArrayLength(serie.data, uniqueDates.length)
            //         data: this.ensureArrayLength(serie.data, uniqueDates.length)
            //     }
            //     series3.push(serieObject)
            // }
            // console.log(series3, 'the series3')
            //

            this.options = {
                ...this.options,
                xaxis: {
                    ...this.options.xaxis,
                    // categories: array[0].categories//uniqueDates
                    categories: modifiedSeries.superCategories
                }
            }
            this.options = {
                ...this.options,
                title: {
                    ...this.options.title,
                    text: 'User Actions'
                }
            }
            this.options = {
                ...this.options,
                series: modifiedSeries.modifiedArr
            }

        },
        convertDates(arr: any[]) {
            return arr.map((item) => (item === 'n/a' ? item : dayjs(item).toISOString()));

        },
        modifyData(arr: any[]) {
            // 
            // Find the largest categories array from every object in the arr array
            //create a supercategory array with alla the different dates of all the obejcts
            // const superCategories: any[] = arr.reduce((acc, curr) => {
            //     if (curr.categories.length > acc.length) {
            //         return curr.categories;
            //     } else {
            //         return acc;
            //     }
            // }, []);
            // Find all the unique dates from the objects in the arr array
            const superCategories: any[] = [...new Set(arr.flatMap(item => item.categories))];


            const modifiedArr = arr.map((item) => {
                const modifiedData: any[] = [];
                const { name, data, categories } = item;
                superCategories.forEach((category) => {
                    const index = categories.indexOf(category);
                    if (index === -1) {
                        modifiedData.push(0);
                    } else {
                        modifiedData.push(data[index]);
                    }
                });
                return {
                    name,
                    data: modifiedData,
                };
            });
            return { modifiedArr, superCategories };
        },
        transformArray(arr: any[]) {
            const transformed = {} as any;
            arr.forEach((item) => {
                const { action, createdAt } = item;
                if (!transformed[action]) {
                    transformed[action] = {
                        name: action,
                        data: [],
                        categories: [],
                    };
                }
                const itemDate = createdAt.split("T")[0];
                const existingCategoryIndex = transformed[action].categories.indexOf(
                    itemDate
                );
                if (existingCategoryIndex === -1) {
                    transformed[action].categories.push(itemDate);
                    transformed[action].data.push(
                        1
                    );
                } else {
                    transformed[action].data[existingCategoryIndex] += 1;
                }
            });
            return Object.values(transformed) as any[];
            // 
        },
        ensureArrayLength(arr: any[], datesLength: number) {
            // to 0 den mapinei se swsth thesh, prepei na mpainei stin idia thesi pou moainei kai 
            //to date pou eixe 0 data
            // while (arr.length < datesLength) {
            //     arr.push(0);
            // }
            return arr;

        },
        groupByAction2(arr: any[]) {
            const result: any = {};
            // 
            const dateArray: any[] = [];
            arr.forEach((item) => {
                if (!result[item.action]) {
                    result[item.action] = {};
                }
                const date = item.createdAt.split("T")[0]
                if (!result[item.action][date]) {
                    result[item.action][date] = [];
                    dateArray.push(date);
                }
                result[item.action][date].push(item);
            });

            const actionObjects = Object.entries(result).map(([action, dates]) => ({
                name: action,
                data: Object.values(dates as any).map((date) => (date as any).length),
                categories: dateArray,
            }));
            return actionObjects;
        },
        groupByAction(arr: any[]) {
            const result: any = {};

            const dateArray: any[] = [];
            arr.forEach((item) => {
                if (!result[item.action]) {
                    result[item.action] = {};
                }
                const date = item.createdAt.split("T")[0]
                if (!result[item.action][date]) {
                    result[item.action][date] = [];
                    dateArray.push(date);
                }
                result[item.action][date].push(item);
            });

            const uniqueDates = Array.from(new Set(dateArray.map(date => dayjs.utc(date).format('YYYY-MM-DD'))))
                .map(date => dayjs.utc(date).toISOString());

            const actionObjects = Object.entries(result).map(([action, dates]) => {
                const data = uniqueDates.map(date => {
                    // const count = ((dates as any)[date] || []).length;
                    const count = ((date as any)).length;
                    return count;
                });
                return {
                    name: action,
                    data,
                    categories: uniqueDates,
                };
            });
            return actionObjects;
        },
        checkUserAction(item: any) {
            console.log(item, 'the item in check user acctions')
            console.log(this.getLoggedUser, 'the get logged user')
            if (item.userId === this.getLoggedUser.user_id) return true;
            else false;
        },
        checkUserActionInAnswer(item: any) {
            console.log(item, 'the item in check user acctions')
            console.log(this.getLoggedUser, 'the get logged user')
            if (item.UserUserId === this.getLoggedUser.user_id) return true;
            else false;
        },
        checkUserAction3(item: any) {
            console.log(item, 'the item in check user acctions')
            console.log(this.getLoggedUser, 'the get logged user')
            if (item.uid === this.getLoggedUser.user_id) return true;
            else false;
        },
        async removeObject(value: any) {
            console.log(value, "the value of remove object")
            //when delete question delete all its answers
            const answers = value.answers
            if (answers !== 0) {
                const getQue = await getQuestion(value.question_id)
                console.log(getQue, 'skata mpika edw the get que')
                console.log('skata mpika edw')
                //mipwsw prepei na diagrafontai kai ta votes?
                for (const answer of getQue.answers) {
                    const deleteAnswerObject = await deleteAnswer(answer.answer_id);
                    const historicalData = {
                        action: 'delete-answer',
                        data: answer//value
                    }
                    await createHistorical(historicalData)
                }
                const deleteQuestionObject = await deleteQuestion(value.question_id);
            } else {
                console.log('mpika edw')
                const deleteQuestionObject = await deleteQuestion(value.question_id);
            }
            //
            const historicalData = {
                action: 'delete-question',
                data: value
            }
            await createHistorical(historicalData)
            //
            console.log(this.questions, 'the questions index in remove')
            const queIndex = this.questions.findIndex((el: any) => el.question_id === value.question_id)
            console.log(queIndex, 'the queIndex index in remove')
            if (queIndex !== -1) {
                this.questions.splice(queIndex, 1)
            }
            //
            // setTimeout(async () => {
            //     await this.profileClicked();
            // }, 500)
        },
        async removeAnswerObject(value: any) {
            console.log(value, "the value of remove object answer")
            const answerData = await getAnswer(value.answer_id)
            console.log(answerData, 'the answer data')
            if (answerData.answerVotes.length !== 0) {
                for (const answerVote of answerData.answerVotes) {
                    await deleteAnswerVote(answerVote.vote_id)
                }
            }
            const deleteAnswerObject = await deleteAnswer(value.answer_id);
            const historicalData = {
                action: 'delete-answer',
                data: value
            }
            await createHistorical(historicalData)
            // this.fu = !this.fu
            console.log(this.answerObjects, 'the answersss index in remove')
            const answerIndex = this.answerObjects.findIndex((el: any) => el.answer_id === value.answer_id)
            console.log(answerIndex, 'the answer index in remove')
            if (answerIndex !== -1) {
                this.answerObjects.splice(answerIndex, 1)
            }
            setTimeout(async () => {
                await this.profileClicked();
            }, 700)
        },
        async profileClicked() {
            console.log(this.getLoggedUser, "the value of click user");
            const userId = this.getLoggedUser.user_id;
            const userData = await getUser(userId);
            console.log(userData, "the card data");
            store.commit("setUserData", userData);
            this.$router.push(`/users/${userId}`);
        }
    },
    async mounted() {
        this.progressCircular = true
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
        await this.getUserAnswers()
        await this.getUserStats()
        await this.getUserHistorical1()
        this.progressCircular = false
    }
})
</script>
<style  >
.kappa > .ql-container.ql-snow {
    /* border: 1px solid white !important; */
    border-style: none !important;
}
.overlayUserQues {
    top: 16px;
    left: 10px;
}
</style>