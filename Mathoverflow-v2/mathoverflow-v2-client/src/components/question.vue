<template>
    <!-- The question -->
    <v-card flat class="questionCard">
        <v-card-text>
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
                <v-card
                    v-if="editing"
                    flat
                    style="
                        border: 2.5px dotted #b39ddb;
                        border-bottom: none !important;
                    "
                    class="mx-4"
                >
                    <v-card-text v-if="editing" class="pb-0 pt-0">
                        <v-card flat class="pa-0">
                            <v-toolbar flat class="ps-0">
                                <v-icon size="30px" color="#32325d">
                                    mdi-puzzle-edit
                                </v-icon>
                                <span
                                    class="titleClass font-weight-medium ms-2 mt-0"
                                >
                                    Update question
                                </span>
                                <v-spacer></v-spacer>
                                <v-icon>mdi-icon</v-icon>
                            </v-toolbar>
                            <v-card-text class="px-0 pb-4 pt-2">
                                <h4>Please edit the title below.</h4>

                                <v-textarea
                                    class="mt-2"
                                    outlined
                                    color="#b39ddb"
                                    rows="1"
                                    v-model="editedQuestionTitle"
                                ></v-textarea>
                            </v-card-text>
                        </v-card>
                    </v-card-text>
                </v-card>
                <v-divider v-if="!editing"></v-divider>
                <v-card-text :class="editing ? 'pt-0' : ''">
                    <v-row>
                        <v-col
                            v-if="!editing"
                            cols="1"
                            sm="3"
                            md="2"
                            lg="1"
                            class="mt-0"
                        >
                            <v-btn right x-large icon>
                                <v-icon
                                    size="45px"
                                    @click="
                                        queVotedUp === true
                                            ? doNothing()
                                            : upVoteQuestion()
                                    "
                                    :color="
                                        queVotedUp === true
                                            ? 'green'
                                            : '#78909C'
                                    "
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
                                    @click="
                                        queVotedUp === false
                                            ? doNothing()
                                            : downVoteQuestion()
                                    "
                                    :color="
                                        queVotedUp === false
                                            ? 'green'
                                            : '#78909C'
                                    "
                                    >mdi-menu-down</v-icon
                                >
                            </v-btn>
                        </v-col>
                        <v-col
                            :cols="editing ? 12 : 11"
                            :sm="editing ? 12 : 9"
                            :md="editing ? 12 : 10"
                            :lg="editing ? 12 : 11"
                            class="mt-0 pt-0"
                        >
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
                                style="
                                    border: 2.5px dotted #b39ddb;
                                    border-top: none !important;
                                "
                            >
                                <v-card-text class="pt-0 px-0">
                                    <!--  -->
                                    <v-card flat class="pa-0">
                                        <!-- <v-toolbar flat>
                                            <v-icon size="29px" color="#32325d">
                                                mdi-tooltip-edit
                                            </v-icon>
                                            <span
                                                class="titleClass font-weight-medium ms-2 mt-0"
                                            >
                                                Update question body
                                            </span>
                                            <v-spacer></v-spacer>
                                            <v-icon>mdi-icon</v-icon>
                                        </v-toolbar> -->
                                        <v-card-text class="px-4 pb-4 pt-0">
                                            <h4>
                                                Please edit the body in the
                                                editor below.
                                            </h4>
                                            <vue-editor
                                                class="pt-0 mt-2"
                                                v-model="editedQuestionBody"
                                                :editorOptions="toolbarOpts_old"
                                            >
                                            </vue-editor>
                                        </v-card-text>
                                    </v-card>
                                    <!--  -->
                                </v-card-text>
                                <v-card-actions>
                                    <v-row justify="center" align="center">
                                        <v-col justify="center" align="center">
                                            <!-- <v-btn
                                                class="me-3"
                                                small
                                                dark
                                                color="#b39ddb"
                                                @click="editing = false"
                                            >
                                                cancel
                                            </v-btn> -->
                                            <v-btn
                                                class="me-2 pa-3"
                                                small
                                                dark
                                                color="#b39ddb"
                                                @click="editing = false"
                                                style="
                                                    text-transform: none !important;
                                                    font-size: 15px !important;
                                                "
                                            >
                                                Cancel
                                            </v-btn>
                                            <!-- <v-btn
                                                small
                                                outlined
                                                color="#b39ddb"
                                                @click="updateQuestion"
                                            >
                                                save</v-btn
                                            > -->
                                            <v-btn
                                                class="pa-3"
                                                small
                                                outlined
                                                color="#b39ddb"
                                                @click="updateQuestion"
                                                style="
                                                    text-transform: none !important;
                                                    font-size: 15px !important;
                                                "
                                            >
                                                Save</v-btn
                                            >
                                        </v-col>
                                    </v-row>
                                </v-card-actions>
                            </v-card>
                            <v-row class="mt-15">
                                <span class="mt-16">
                                    <!-- <v-icon class="me-5">mdi-delete</v-icon> -->
                                    <span
                                        class="me-3 text-caption"
                                        style="
                                            cursor: pointer !important;
                                            font-size: 13px !important;
                                        "
                                        @click="editQuestion"
                                        >Edit</span
                                    >
                                    <span
                                        class="text-caption"
                                        style="
                                            cursor: pointer !important;
                                            font-size: 13px !important;
                                        "
                                        >Delete</span
                                    >
                                    <!-- <v-icon @click="editQuestion"
                                        >mdi-pencil</v-icon
                                    > -->
                                    <!-- <v-btn
                                        small
                                        outlined
                                        rounded
                                        text
                                        @click="editQuestion"
                                    >
                                        EDIT Question
                                    </v-btn> -->
                                </span>
                                <v-spacer></v-spacer>
                                <!-- <span class="me-0"> -->
                                <!-- <v-btn small outlined rounded text>
                                        Delete Question
                                    </v-btn> -->
                                <v-card
                                    flat
                                    class="userCard"
                                    :width="
                                        $vuetify.breakpoint.smAndDown
                                            ? '50%'
                                            : '27%'
                                    "
                                    rounded="md"
                                >
                                    <v-card-text>
                                        <v-row>
                                            <v-col cols="12" class="pt-0">
                                                asked
                                                {{ getQuestionTimestamp }}
                                            </v-col>
                                            <v-col cols="12" class="pb-4">
                                                <v-row
                                                    justify="start"
                                                    align="center"
                                                >
                                                    <v-col
                                                        cols="4"
                                                        class="pa-0"
                                                        justify="start"
                                                        align="center"
                                                    >
                                                        <v-img
                                                            @click="
                                                                goOwnerProfile
                                                            "
                                                            style="
                                                                cursor: pointer;
                                                            "
                                                            contain
                                                            src="/prof_photo.png"
                                                            height="50"
                                                        ></v-img>
                                                    </v-col>
                                                    <v-col
                                                        cols="6"
                                                        class="pa-0 mb-3"
                                                        justify="center"
                                                        align="center"
                                                    >
                                                        <v-row
                                                            class="ms-0 me-0"
                                                            justify="center"
                                                            align="center"
                                                        >
                                                            <span
                                                                @click="
                                                                    goOwnerProfile
                                                                "
                                                                style="
                                                                    cursor: pointer !important;
                                                                    font-size: 16px !important;
                                                                "
                                                                class="blue--text"
                                                                >{{
                                                                    questionOwnerData
                                                                        .data
                                                                        .username
                                                                }}</span
                                                            >
                                                        </v-row>
                                                        <v-row
                                                            class="ms-1"
                                                            justify="center"
                                                            align="center"
                                                        >
                                                            <span
                                                                @click="
                                                                    goOwnerProfile
                                                                "
                                                                style="
                                                                    cursor: pointer;
                                                                "
                                                                class="font-weight-medium"
                                                            >
                                                                {{
                                                                    questionOwnerReputation
                                                                }}
                                                            </span>
                                                            <v-icon
                                                                size="20px"
                                                                color="#FBC02D"
                                                                class="ms-1"
                                                                >mdi-trophy</v-icon
                                                            >
                                                        </v-row>
                                                    </v-col>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                                <!-- </span> -->
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
                <v-card-text>
                    <!-- <v-icon color="lime">mdi-forum-plus</v-icon -->
                    <v-icon color="lime" size="25">mdi-chat-plus</v-icon
                    ><span class="text-overline lime--text"> Your Answer </span>
                    <vue-editor
                        ref="editor2"
                        class="mt-3"
                        v-model="answerBody"
                        :editorOptions="toolbarOpts_old"
                    >
                    </vue-editor>
                    <v-row>
                        <v-btn
                            class="mt-8 ms-3"
                            small
                            dark
                            color="lime"
                            @click="postAnswer1"
                        >
                            Post Your Answer
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-icon> mdi-icon </v-icon>
                    </v-row>
                </v-card-text>
            </v-card>
            <!-- table with answers-->
            <br />
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
                    <!-- <v-icon class="me-2">mdi-forum-outline</v-icon> -->
                    <v-icon class="me-2">mdi-wechat</v-icon>
                    Answers
                </v-card-text>
            </v-card>
            <v-card flat style="border-top: 2px solid #26c6da" rounded="sm">
                <!-- <v-toolbar flat>
                <v-toolbar-title> Answers </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-icon>mdi-database</v-icon>
            </v-toolbar> -->
                <v-card-text class="pt-8">
                    <v-data-table
                        :headers="answersCols"
                        :items="this.answers"
                        v-if="admin"
                        sort-by="votes"
                        :sort-desc="true"
                        class="answersTable"
                    >
                        <template v-slot:[`item.votes`]="props">
                            <v-row>
                                <v-col
                                    cols="3"
                                    sm="12"
                                    md="12"
                                    lg="3"
                                    class="pa-0"
                                >
                                    <!-- <v-btn right x-large icon> -->
                                    <v-icon
                                        size="19px"
                                        :color="
                                            props.item.userAnswerVote === true
                                                ? '#53DFD1'
                                                : '#78909C'
                                        "
                                        @click="
                                            props.item.userAnswerVote !== true
                                                ? upVoteAnswer(props.item)
                                                : doNothing()
                                        "
                                        class="mt-3 me-2"
                                        >mdi-thumb-up</v-icon
                                    >
                                    <!-- </v-btn> -->
                                </v-col>
                                <v-col
                                    cols="4"
                                    sm="12"
                                    md="12"
                                    lg="4"
                                    class="pa-0"
                                >
                                    <v-chip color="teal" dark class="mt-2">
                                        {{ props.item.votes }}
                                    </v-chip>
                                </v-col>
                                <v-col
                                    cols="3"
                                    sm="12"
                                    md="12"
                                    lg="3"
                                    class="pa-0"
                                >
                                    <!-- <v-btn right x-large icon> -->
                                    <v-icon
                                        @click="
                                            props.item.userAnswerVote !== false
                                                ? downVoteAnswer(props.item)
                                                : doNothing()
                                        "
                                        :color="
                                            props.item.userAnswerVote === false
                                                ? '#53DFD1'
                                                : '#78909C'
                                        "
                                        dark
                                        size="19px"
                                        class="mt-3 ms-2"
                                        >mdi-thumb-down</v-icon
                                    >
                                    <!-- </v-btn> -->
                                </v-col>
                            </v-row>

                            <!-- </div> -->
                        </template>
                        <template v-slot:[`item.body`]="props">
                            <div id="myDiv">
                                <v-card
                                    flat
                                    class="py-5 px-0"
                                    color="transparent"
                                    width="400px"
                                    height="250px"
                                >
                                    <!-- <v-card flat class="px-0" color="transparent"> -->
                                    <v-card-text class="answerBody pa-0 ms-3">
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
                            </div>
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
                                                height="75"
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
                                                <span
                                                    class="font-weight-medium"
                                                    >{{
                                                        props.item.user
                                                            .reputation
                                                    }}</span
                                                >
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
                        <template v-slot:[`item.edit`]="props">
                            <v-icon
                                v-if="checkUserAction(props.item)"
                                color="#5fb1e8"
                                @click="showAnswerEdit(props.item)"
                                >mdi-pencil</v-icon
                            >
                            <v-dialog
                                v-model="answerEditing"
                                width="850"
                                height="auto"
                            >
                                <v-card>
                                    <v-toolbar flat>
                                        <v-icon size="29px" color="#32325d">
                                            mdi-chat-plus
                                        </v-icon>
                                        <span
                                            class="titleClass font-weight-medium ms-2 mt-0"
                                        >
                                            Update answer
                                        </span>
                                        <v-spacer></v-spacer>
                                        <v-icon>mdi-icon</v-icon>
                                    </v-toolbar>
                                    <v-card-text class="px-4 pb-4 pt-2">
                                        <h4>
                                            Please edit the answer body in the
                                            editor below.
                                        </h4>
                                        <vue-editor
                                            class="mt-4"
                                            v-model="editedAnswerBody"
                                            :editorOptions="toolbarOpts_old"
                                        ></vue-editor>
                                        <!-- {{ props.item.body }} -->
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-row justify="center" align="center">
                                            <v-col
                                                justify="center"
                                                align="center"
                                            >
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
                                                    class="me-2 pa-3"
                                                    small
                                                    dark
                                                    color="#b39ddb"
                                                    @click="
                                                        answerEditing = false
                                                    "
                                                    style="
                                                        text-transform: none !important;
                                                        font-size: 15px !important;
                                                    "
                                                >
                                                    Cancel
                                                </v-btn>
                                                <v-btn
                                                    class="pa-3"
                                                    small
                                                    outlined
                                                    color="#b39ddb"
                                                    @click="
                                                        updateAnswer(
                                                            props.item.body
                                                        )
                                                    "
                                                    style="
                                                        text-transform: none !important;
                                                        font-size: 15px !important;
                                                    "
                                                >
                                                    Save</v-btn
                                                >
                                            </v-col>
                                        </v-row>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </template>
                        <template v-slot:[`item.remove`]="props">
                            <v-icon
                                v-if="checkUserAction(props.item)"
                                color="#5fb1e8"
                                @click="removeObject(props.item)"
                                >mdi-delete</v-icon
                            >
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
            <!-- <progress-circular
                :progressCircular="progressCircular"
            ></progress-circular> -->
            <v-dialog v-model="sessionCheckDialog" width="500" persistent>
                <v-card class="pb-4 pt-4 ps-3" style="border-radius: 16px">
                    <v-toolbar flat class="pt-6">
                        <v-row justify="center" align="center">
                            <v-col justify="center" align="center" class="me-6">
                                <v-icon color="teal" size="53px" class="mb-0"
                                    >mdi-google-downasaur</v-icon
                                >
                                <span
                                    class="d-flex justify-center blue-grey--text text-body-1 font-weight-bold me-2 mb-9"
                                    style="font-size: 21px !important"
                                    >Oops!</span
                                >
                            </v-col>
                        </v-row>
                    </v-toolbar>
                    <v-card-text class="mt-6">
                        <v-row
                            justify="start"
                            align="start"
                            class="text-body-1"
                        >
                            <v-col justify="start" align="start">
                                It looks like that you're not currently logged
                                into our app. To ensure the best possible
                                experience, please sign in to your account!
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions class="justify-end mb-0">
                        <span class="d-flex justify-end me-3">
                            <v-icon
                                small
                                @click="sessionCheckDialog = false"
                                style="cursor: pointer"
                                >mdi-close</v-icon
                            >
                        </span>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="checkRepDialog" width="500" persistent>
                <v-card class="pb-4 pt-4 ps-3" style="border-radius: 16px">
                    <v-toolbar flat class="pt-6">
                        <v-row justify="center" align="center">
                            <v-col justify="center" align="center" class="me-6">
                                <v-icon color="teal" size="53px" class="mb-0"
                                    >mdi-trophy</v-icon
                                >
                                <span
                                    class="d-flex justify-center blue-grey--text text-body-1 font-weight-bold me-2 mb-9"
                                    style="font-size: 21px !important"
                                    >Thank you!</span
                                >
                            </v-col>
                        </v-row>
                    </v-toolbar>
                    <v-card-text class="mt-6">
                        <v-row
                            justify="start"
                            align="start"
                            class="text-body-1"
                        >
                            <v-col justify="start" align="start">
                                It looks like you don't have enough reputation
                                to cast a vote yet. You need a minimum of
                                <span class="blue--text font-weight-medium"
                                    >{{ repLimit }}
                                </span>
                                reputation points to do so. Keep participating
                                in the community to earn more reputation points
                                and unlock additional features.
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions class="justify-end mb-0">
                        <span class="d-flex justify-end me-3">
                            <v-icon
                                small
                                @click="checkRepDialog = false"
                                style="cursor: pointer"
                                >mdi-close</v-icon
                            >
                        </span>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { mapGetters } from 'vuex';
import { checkSession, createHistorical, deleteAnswer, deleteAnswerVote, getAnswer, getQuestion, getUser, getUserAnswerVotes, getUserReputation, getUsers, postAnswer, updateAnswer1, updateAnswerVote1, updateQuestion1, updateReputation1, updateVote1, voteAnswer, voteQuestion } from './functions';
import { question1 } from './types';
import { VueEditor } from "vue2-editor";
import katex from 'katex';
import 'katex/dist/katex.min.css';
import progressCircular from "@/tools/circular_loading/circular_loading.vue"
import Quill from 'quill';
import dayjs from 'dayjs';
import store from '@/store';
// Vue.use(mathLive);
//declaration for katex
declare global {
    interface Window {
        katex: any;
    }
}
//
export default Vue.extend({
    components: { VueEditor, progressCircular },
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
            //
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
        },
        toolbarOpts_old: {
            modules: {
                toolbar: {
                    container: [
                        [{ 'font': [] }],
                        [{ 'header': [false, 1, 2, 3, 4, 5, 6,] }],
                        // [{ 'size': ['small', false, 'large', 'huge'] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'align': '' }, { 'align': 'center' }, { 'align': 'right' }, { 'align': 'justify' }],
                        // [{ 'header': 1 }, { 'header': 2 }],
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
                    //
                }
            }
        },
        customToolbar: [
            [{ 'font': [] }],
            [{ 'header': [false, 1, 2, 3, 4, 5, 6,] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'align': '' }, { 'align': 'center' }, { 'align': 'right' }, { 'align': 'justify' }],
            // [{ 'header': 1 }, { 'header': 2 }],
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
        editedAnswerBody: '',
        progressCircular: false,
        queVotedUp: null as null | boolean,
        sessionCheckDialog: false,
        checkRepDialog: false,
        repLimit: 15 as 15 | number,
        questionOwnerName: '',
        questionOwnerReputation: '',
        questionOwnerData: {} as any

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
            this.progressCircular = true;
            //clean answers table
            const empty: any[] = []
            this.answers = empty;
            //
            console.log(value, "the value of question data")
            this.questionExample = {
                uid: this.getQuestionData.data.question_id,
                title: this.getQuestionData.data.title,
                body: this.getQuestionData.data.body,
                userId: this.getQuestionData.data.UserUserId
            }
            const users = await getUsers();
            for (const answer of this.getQuestionData.answers) {
                //
                for (const user of users) {
                    if (user.user_id === answer.UserUserId) {
                        const answerObject = {
                            ...answer,
                            votes: await this.getAnswerVotes(answer),
                            user: await this.getUserObject(user),//.username,
                            created: dayjs(answer.createdAt).format("DD MMM. YYYY | HH:mm:ss"),
                            userAnswerVote: await this.getUserAnswerVote(answer)
                        }
                        this.answers.push(answerObject)
                    }
                }
                //*
                // const div = document.getElementById("myDiv");
                // const width = div?.offsetWidth;
                // const height = div?.offsetHeight;
                // console.log(`The width of myDiv is: ${width}px`);
                // console.log(`The height of myDiv is: ${height}px`);
                //*
            }
            // this.answers = this.getQuestionData.answers;
            console.log(this.answers, "THE ANSWERS1")
            const votesSum = this.getVotes();
            this.questionSumVotes = votesSum;
            await this.getUserVote()
            this.editedQuestionTitle = this.questionExample.title
            //
            await this.getQuestionOwner();
            //
            this.progressCircular = false
        },

    },
    computed: {
        ...mapGetters(["getQuestionData", "getLoggedUser"]),
        getQuestionTimestamp() {
            const date = dayjs(this.getQuestionData.data.createdAt).format("DD MMM. YYYY | HH:mm:ss");
            return date;

        },
        toolbarOpts(): any {
            const a = {
                modules: {
                    toolbar: {
                        container: [
                            [{ 'font': [] }],
                            [{ 'header': [false, 1, 2, 3, 4, 5, 6,] }],
                            // [{ 'size': ['small', false, 'large', 'huge'] }],
                            ['bold', 'italic', 'underline', 'strike'],
                            [{ 'align': '' }, { 'align': 'center' }, { 'align': 'right' }, { 'align': 'justify' }],
                            // [{ 'header': 1 }, { 'header': 2 }],
                            ['blockquote', 'code-block'],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
                            [{ 'script': 'sub' }, { 'script': 'super' }],
                            [{ 'indent': '-1' }, { 'indent': '+1' }],
                            [{ 'color': [] }, { 'background': [] }],
                            ['link', 'image', 'video', 'formula'],
                            [{ 'direction': 'rtl' }],
                            ['clean'],
                        ],
                    }
                }
            }
            return a;
        },
    },
    methods: {
        checkUserAction(item: any) {
            console.log(item, 'the item in check user acctions in user profile')
            console.log(this.getLoggedUser, 'the get logged user')
            if (item.user.user_id === this.getLoggedUser.user_id) return true;
            else false;
        },
        doNothing() {
            console.log('do nothing')
        },
        async getUserObject(user: any) {
            const userObject = {
                ...user,
                reputation: await this.getUserRep(user.user_id)
            }
            console.log(userObject, 'the user object')
            // this.userObject= userObject
            return userObject;
        },
        async getUserRep(userId: number) {
            const userRep = await getUserReputation(userId)
            console.log(userRep, 'the user reputation')
            return userRep.value;
        },
        async removeObject(value: any) {
            // console.log(value, "th evalue of delete question")
            console.log(value, "the value of remove object")
            //delete answer-vote
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
            //
            // this.$router.go(0);
            this.forceUpdateQuestion();
        },
        async forceUpdateQuestion() {
            const questionId = this.getQuestionData.data.question_id;
            //
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
        //
        async getAnswerVotes(value: any) {
            const answerVotesArray: any[] = []
            const answerData = await getAnswer(value.answer_id)
            console.log(answerData, "THE ANSWER DATA")
            //calculate votes
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
        async getUserAnswerVote(value: any) {
            console.log(value, 'the value in get user answer vote')
            const answerVotesArray: any[] = []
            const answerData = await getAnswer(value.answer_id)
            // console.log(answerData, "THE ANSWER DATA")
            // console.log(this.getLoggedUser, 'this.getLoggedUser!!')
            const userVote = answerData.answerVotes.find((el: any) => el.UserUserId === this.getLoggedUser.user_id)
            const userVote2 = answerData.answerVotes
                .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // sort by createdAt in descending order
                .find((el: any) => el.UserUserId === this.getLoggedUser.user_id);
            console.log(userVote, 'user answer vote')
            console.log(userVote2, 'user answer vote2')
            if (userVote2 !== undefined) {
                if (userVote2.value === 1) return true
                else if (userVote2.value === -1) return false
            }
            else return null
        },
        async postAnswer1() {
            const sessionCheck = await checkSession()
            if (sessionCheck.userSid === undefined && sessionCheck.message === 'user is not logged in') {
                this.sessionCheckDialog = true
                return;
            }
            const data = { body: this.answerBody, QuestionQuestionId: this.getQuestionData.data.question_id }
            await postAnswer(data); // den ananewnetai amesws h selida na fanei h apantish kai stelnei mono periorismeno airthmo leksewn,  vgazei error 500 meta
            const historicalData = {
                action: 'answer',
                data: data
            }
            await createHistorical(historicalData)
            this.forceUpdateQuestion();
            this.answerBody = ""
        },
        async upVoteQuestion() {
            //if not logged in
            const sessionCheck = await checkSession()
            if (sessionCheck.userSid === undefined && sessionCheck.message === 'user is not logged in') {
                this.sessionCheckDialog = true
                return;
            }
            //if logged in
            //check rep
            const userRep = await getUserReputation(this.getLoggedUser.user_id)
            console.log(userRep, 'the user reputation!!')
            if (+userRep.value < 15) {
                this.repLimit = 15
                this.checkRepDialog = true
                return;
            }
            //
            const data = { value: 1, QuestionQuestionId: this.getQuestionData.data.question_id }
            if (this.queVotedUp === false) {
                const userVote = this.getQuestionData.votes.find((el: any) => el.UserUserId === this.getLoggedUser.user_id)
                if (userVote !== undefined) {
                    await this.updateQuestionVote(userVote.vote_id, { value: 1 })
                }
            } else if (this.queVotedUp === null) {
                await voteQuestion(data);
            }
            //first get the reps and then update question'user's rep & upvoter rep
            console.log(this.getLoggedUser, "the getLoggedUser in upvote")
            // const userRep = await getUserReputation(this.getLoggedUser.user_id)
            console.log(userRep, 'the user reputation!!')
            let oldRep = +userRep.value
            const data2 = { value: oldRep += 1 }
            console.log(data2, 'the update data')
            await updateReputation1(userRep.reputation_id, data2);
            // update writers reputation
            console.log(this.getQuestionData.data.UserUserId, 'the question data33')
            const writerId = this.getQuestionData.data.UserUserId
            const userRep2 = await getUserReputation(writerId)
            console.log(userRep, 'the user reputation!!')
            let oldRep2 = +userRep2.value
            const data3 = { value: oldRep2 += 5 }
            console.log(data2, 'the update data 2')
            await updateReputation1(userRep2.reputation_id, data3);
            //
            const historicalData = {
                action: 'vote-question',
                data: data
            }
            await createHistorical(historicalData);
            // this.$router.go(0);
            this.forceUpdateQuestion();
        },
        async updateQuestionVote(voteId: number, data: any) {
            await updateVote1(voteId, data)
        },
        async updateAnswerVote(voteId: number, data: any) {
            await updateAnswerVote1(voteId, data)
        },
        async downVoteQuestion() {
            //if not logged in
            const sessionCheck = await checkSession()
            if (sessionCheck.userSid === undefined && sessionCheck.message === 'user is not logged in') {
                this.sessionCheckDialog = true
                return;
            }
            //if logged in
            //check rep
            const userRep = await getUserReputation(this.getLoggedUser.user_id)
            console.log(userRep, 'the user reputation!!')
            if (+userRep.value < 125) {
                this.repLimit = 125
                this.checkRepDialog = true
                return;
            }
            const data = { value: -1, QuestionQuestionId: this.getQuestionData.data.question_id }
            if (this.queVotedUp === true) {
                console.log('mpika edw 1')
                const userVote = this.getQuestionData.votes.find((el: any) => el.UserUserId === this.getLoggedUser.user_id)
                if (userVote !== undefined) {
                    await this.updateQuestionVote(userVote.vote_id, { value: -1 })
                }
            } else if (this.queVotedUp === null) {
                console.log('mpika edw 2')
                await voteQuestion(data);
            }
            //first get the reps and then update question'user's rep & upvoter rep
            let oldRep = +userRep.value
            const data2 = { value: oldRep -= 1 }
            // console.log(data2, 'the update data')
            await updateReputation1(userRep.reputation_id, data2);
            // update writers reputation
            const writerId = this.getQuestionData.data.UserUserId
            const userRep2 = await getUserReputation(writerId)
            // console.log(userRep, 'the user reputation!!')
            let oldRep2 = +userRep2.value
            const data3 = { value: oldRep2 -= 2 }
            // console.log(data2, 'the update data 2')
            await updateReputation1(userRep2.reputation_id, data3);
            //
            const historicalData = {
                action: 'vote-question',
                data: data
            }
            await createHistorical(historicalData)
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
            //
            const historicalData = {
                action: 'update-question',
                data: value
            }
            await createHistorical(historicalData)
            this.editing = false;
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
            //if not logged in
            const sessionCheck = await checkSession()
            if (sessionCheck.userSid === undefined && sessionCheck.message === 'user is not logged in') {
                this.sessionCheckDialog = true
                return;
            }
            //if logged in
            //check rep
            const userRep = await getUserReputation(this.getLoggedUser.user_id)
            console.log(userRep, 'the user reputation!!')
            if (+userRep.value < 15) {
                this.repLimit = 15
                this.checkRepDialog = true
                return;
            }
            const data = { value: 1, AnswerAnswerId: value.answer_id }
            console.log(value, "value of up vote answer");
            //
            if (value.userAnswerVote === false) {
                // const
                const userAnswerVotes = await getUserAnswerVotes(this.getLoggedUser.user_id, { answer_id: value.answer_id }) as any//this.getQuestionData.votes.find((el: any) => el.UserUserId === this.getLoggedUser.user_id)
                console.log(userAnswerVotes, 'THE IUSER ANSWER VOTES')
                if (userAnswerVotes.length !== 0) {
                    // const answerVote = userAnswerVotes.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    // console.log(answerVote, 'THE latest answerVote')
                    const answerVote = this.getMostRecentVote(userAnswerVotes)
                    await this.updateAnswerVote(answerVote.vote_id, { value: 1 })
                }
            } else if (value.userAnswerVote === null) {
                await voteAnswer(data);
            }
            // await voteAnswer(data);
            //first get the reps and then update question'user's rep & upvoter rep
            console.log(this.getLoggedUser, "the getLoggedUser in upvote")
            // const userRep = await getUserReputation(this.getLoggedUser.user_id)
            console.log(userRep, 'the user reputation!!')
            let oldRep = +userRep.value
            const data2 = { value: oldRep += 1 }
            console.log(data2, 'the update data')
            await updateReputation1(userRep.reputation_id, data2);
            // update writers reputation
            console.log(this.getQuestionData.data.UserUserId, 'the question data33')
            const writerId = this.getQuestionData.data.UserUserId
            const userRep2 = await getUserReputation(writerId)
            console.log(userRep, 'the user reputation!!')
            let oldRep2 = +userRep2.value
            const data3 = { value: oldRep2 += 10 }
            console.log(data2, 'the update data 2')
            await updateReputation1(userRep2.reputation_id, data3);
            //
            const historicalData = {
                action: 'vote-answer',
                data: data
            }
            await createHistorical(historicalData)
            // this.$router.go(0);
            this.forceUpdateQuestion();
        },
        getMostRecentVote(votes: any[]) {
            const sortedVotes = votes.sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                return dateB.getTime() - dateA.getTime();
            });

            return sortedVotes[0];
        },
        async downVoteAnswer(value: any) {
            //if not logged in
            const sessionCheck = await checkSession()
            if (sessionCheck.userSid === undefined && sessionCheck.message === 'user is not logged in') {
                this.sessionCheckDialog = true
                return;
            }
            //if logged in
            const userRep = await getUserReputation(this.getLoggedUser.user_id)
            console.log(userRep, 'the user reputation!!')
            //to be restored
            if (+userRep.value < 125) {
                this.repLimit = 125
                this.checkRepDialog = true
                return;
            }
            console.log(value, "value of down vote answer")
            // console.log(value, "value of up vote answer");
            const data = { value: -1, AnswerAnswerId: value.answer_id }
            //
            if (value.userAnswerVote === true) {
                console.log('mpika edw 1')
                // const userVote = this.getQuestionData.votes.find((el: any) => el.UserUserId === this.getLoggedUser.user_id)
                const userAnswerVotes = await getUserAnswerVotes(this.getLoggedUser.user_id, { answer_id: value.answer_id }) as any//this.getQuestionData.votes.find((el: any) => el.UserUserId === this.getLoggedUser.user_id)
                console.log(userAnswerVotes, 'THE IUSER ANSWER VOTES')
                if (userAnswerVotes.length !== 0) {
                    const answerVote = this.getMostRecentVote(userAnswerVotes)
                    await this.updateAnswerVote(answerVote.vote_id, { value: -1 })
                }
            } else if (value.userAnswerVote === null) {
                await voteAnswer(data);
            }
            // await voteAnswer(data);
            //first get the reps and then update question'user's rep & upvoter rep
            let oldRep = +userRep.value
            const data2 = { value: oldRep -= 1 }
            // console.log(data2, 'the update data')
            await updateReputation1(userRep.reputation_id, data2);
            // update writers reputation
            const writerId = this.getQuestionData.data.UserUserId
            const userRep2 = await getUserReputation(writerId)
            // console.log(userRep, 'the user reputation!!')
            let oldRep2 = +userRep2.value
            const data3 = { value: oldRep2 -= 2 }
            // console.log(data2, 'the update data 2')
            await updateReputation1(userRep2.reputation_id, data3);
            //
            const historicalData = {
                action: 'vote-answer',
                data: data
            }
            await createHistorical(historicalData)
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
            //
            const historicalData = {
                action: 'update-answer',
                data: value
            }
            await createHistorical(historicalData)
            //
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
        },
        async getUserVote() {
            const qData = await getQuestion(this.getQuestionData.data.question_id)
            console.log(qData, 'THE QDATA222')
            const vot = qData.votes
            // console.log(vot, 'THE QDATA222 vot')
            const userVote = vot.find((el: any) => el.UserUserId === this.getLoggedUser.user_id)
            if (userVote !== undefined) {
                console.log(userVote, 'the logged in user vote in this question')
                console.log(this.getLoggedUser, 'the logged in user')
                if (userVote.value === 1) this.queVotedUp = true
                else if (userVote.value === -1) this.queVotedUp = false
            }

        },
        async getQuestionOwner() {
            const ownerId = this.questionExample.userId
            const owner = await getUser(ownerId);
            const rep = await this.getUserRep(ownerId);
            this.questionOwnerReputation = rep;
            // this.questionOwnerName = owner.data.username
            this.questionOwnerData = owner
            console.log(owner, 'the question owner')
        },
        goOwnerProfile() {
            // const userData = await getUser(userId);
            // console.log(userData, "the card data");
            store.commit("setUserData", this.questionOwnerData);
            this.$router.push(`/users/${this.questionOwnerData.data.user_id}`);
        }
    },
    beforeDestroy() {
        this.queVotedUp = null
    },
    async mounted() {
        window.katex = katex;
        // this.getQuestionData;
        // await this.getUserObject()
        console.log(this.getQuestionData, "the QUESTION NDATA");
        // this.getUserVote()
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
.overlayQues {
    top: 16px;
    left: 10px;
}

.answersTable > .v-data-table__wrapper > table > tbody > tr:hover {
    background: inherit !important;
}
.titleClass {
    font-size: 20px !important;
    color: #32325d !important;
    font-weight: 500;
    color: #5fb1e8;
}
.userCard {
    background-color: rgba(255, 167, 38, 0.3) !important;
}
</style>
