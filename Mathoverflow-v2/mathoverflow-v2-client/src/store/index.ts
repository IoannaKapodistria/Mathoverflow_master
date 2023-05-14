import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        questions: [] as any[],
        questionData: {},
        users: [] as any[],
        userData: {},
        content: true,
        loggedUser: {},
        admin: false,
    },
    mutations: {
        setQuestions(state, value) {
            //typecheckers
            state.questions = value;
        },
        setQuestionData(state, value) {
            //typecheckers
            state.questionData = value;
        },
        setUsers(state, value) {
            //typecheckers
            state.users = value;
        },
        setUserData(state, value) {
            state.userData = value;
        },
        setContent(state, value) {
            state.content = value;
        },
        setLoggedUser(state, value) {
            state.loggedUser = value;
        },
        setAdmin(state, value) {
            state.admin = value;
        },
    },
    actions: {},
    getters: {
        getQuestions(state) {
            return state.questions;
        },
        getQuestionData(state) {
            return state.questionData;
        },
        getUsers(state) {
            return state.users;
        },
        getUserData(state) {
            return state.userData;
        },
        getContent(state) {
            return state.content;
        },
        getLoggedUser(state) {
            return state.loggedUser;
        },
        getAdmin(state) {
            return state.admin;
        },
    },
    modules: {},
});
