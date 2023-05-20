import Vue from "vue";
import Router from "vue-router";
import Questions from "./components/questions.vue";
import Question from "./components/question.vue";
import UnansweredQuestions from "./components/unanswered_questions.vue";
import TopVotedQuestions from "./components/top_voted_questions.vue";
import Users from "./components/users.vue";
import User from "./components/user.vue";
import AskQuestion from "./components/ask_question.vue";
import Login from "./components/login.vue";
import Home from "./components/home.vue";
import About from "./components/about.vue";

Vue.use(Router);

const router = new Router({
    mode: "history",
    base: "/", //process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
        },
        {
            path: "/questions",
            name: "Questions",
            component: Questions,
        },
        {
            path: "/unanswered_questions",
            name: "Unanswered Questions",
            component: UnansweredQuestions,
        },
        {
            path: "/top_voted_questions",
            name: "Top Voted Questions",
            component: TopVotedQuestions,
        },
        {
            path: "/questions/:id",
            name: "Question",
            component: Question,
        },
        {
            path: "/users",
            name: "Users",
            component: Users,
        },
        {
            path: "/users/:id",
            name: "User",
            component: User,
        },
        {
            path: "/ask",
            name: "AskQuestion",
            component: AskQuestion,
        },
        {
            path: "/signup",
            name: "Sign Up",
            component: Login,
        },
        {
            path: "/login",
            name: "Login",
            component: Login,
        },
        {
            path: "/about",
            name: "Login",
            component: About,
        },
    ],
});
export default router;
