import { Router } from "express";
import { createReputation, createUser, deleteReputation, deleteUser, getUser, getUsers, isLogged, sessionChecker, signIn, signOut, updateReputation, updateUser } from "~/db_controllers/usersController";
// import path from "path";
// import { getSignup, postSignup, getQuestions, getQuestionsbyId, getAskQuestion, postSubmitQuestion, postAnswer, getUserbyId, getUsers, postLogin, getLogin, getLogout } from "../route_controllers/functions";
// import { sessionChecker } from "../db_controllers/usersController";
import { createAnswer, createAnswerVote, createQuestion, createVote, deleteAllAnswers, deleteAnswer, deleteAnswerVote, deleteQuestion, deleteVote, getAnswer, getQuestion, getQuestions, updateAnswer, updateQuestion } from "../db_controllers/questionsController";

const mathOverflowRouter = Router();

mathOverflowRouter.get("/", function (req, res) {
    res.render("hey this worked");
});
//
mathOverflowRouter.post("/ask", createQuestion);
mathOverflowRouter.put("/update_question/:id", updateQuestion);
mathOverflowRouter.delete("/delete_question/:id", deleteQuestion);
mathOverflowRouter.get("/questions", /*sessionChecker,*/ getQuestions);
mathOverflowRouter.post("/sessionCheck", /*sessionChecker,*/ sessionChecker);
mathOverflowRouter.get("/questions/:id", getQuestion);
// mathOverflowRouter.get("/questions/:id", sessionChecker, getQuestion);

mathOverflowRouter.get("/users", getUsers);
mathOverflowRouter.get("/users/:id", getUser);
// mathOverflowRouter.get("/users/:id", getUser);
mathOverflowRouter.put("/update_user/:id", updateUser);
mathOverflowRouter.delete("/delete_user/:id", deleteUser);
//
mathOverflowRouter.post("/create_reputation", createReputation);
mathOverflowRouter.put("/update_reputation/:id", updateReputation);
mathOverflowRouter.delete("/delete_reputation/:id", deleteReputation);

mathOverflowRouter.post("/answer", createAnswer);
mathOverflowRouter.delete("/delete_answer/:id", deleteAnswer);
mathOverflowRouter.delete("/delete_user_answers/:id", deleteAllAnswers);
mathOverflowRouter.put("/update_answer/:id", updateAnswer);
mathOverflowRouter.get("/answers/:id", getAnswer);

mathOverflowRouter.post("/vote", createVote);
mathOverflowRouter.delete("/delete_vote/:id", deleteVote);

mathOverflowRouter.post("/answer_vote", createAnswerVote);
mathOverflowRouter.delete("/delete_answer_vote/:id", deleteAnswerVote);

mathOverflowRouter.post("/signup", createUser);
mathOverflowRouter.post("/signout", signOut);
mathOverflowRouter.post("/signin", signIn);
mathOverflowRouter.get("/islogged", isLogged);

// mathOverflowRouter.get("/questions", getQuestions);
// router.get("/", function (req, res) {
//     res.redirect("/questions");
// });

// router.get("/signup", getSignup);
// router.post("/signup", postSignup);

// //router.get("/login", route_functions.getlogin);

// //router.post("/login", route_functions.postlogin);

// router.get(
//     "/questions",
//     //route_functions.checkAuthenticated,
//     getQuestions
// );

// router.get("/questions/:id", sessionChecker, getQuestionsbyId);

// router.get("/ask", sessionChecker, getAskQuestion);

// router.post("/questions", postSubmitQuestion);

// router.post("/answer", postAnswer);

// router.get("/users/:id", getUserbyId);

// router.get("/users", getUsers);

// //router.get("/login", route_functions.getSessionChecker);
// router.post("/login", postLogin);
// router.get("/login", getLogin);

// router.get("/logout", getLogout);

// router.get("/islogged", function (req, res) {
//     //mono g tobutton log in/out
//     if (req.session.user_sid) {
//         res.send(JSON.stringify({ islogged: "true", userId: req.session.user_sid }));
//     } else {
//         res.send(JSON.stringify({ islogged: "false" }));
//     }
// });

export default mathOverflowRouter;
