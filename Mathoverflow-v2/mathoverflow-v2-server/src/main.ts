import express from "express";
import cors from "cors";
import nodePath from "path";
import bodyParser from "body-parser";
import mathOverflowRouter from "./routes/routes";
import session from "express-session";
import sequelize_db from "./config/database";
import connectSessionSequelize from "connect-session-sequelize";

const SequelizeStore = connectSessionSequelize(session.Store); //den dimiourgeitai session
const myStore = new SequelizeStore({
    db: sequelize_db,
    checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds. = 15minutes
    expiration: 86400 * 1000, //60 * 60 * 1000, //86400*1000
    // The maximum age (in milliseconds) of a valid session. = 1 Hour
});
//
const port = process.env.PORT || 3000;

//connection with the database
sequelize_db
    .authenticate() //eisagw ta stoixeia pu exw dwsei stop config
    .then(() => console.log("Database connected..."))
    .catch((err) => console.log("Error: " + err));

const app = express();
// app.use(cors());
app.use(
    cors({
        origin: `http://localhost:${port}`,
        // origin: "http://192.168.1.3:8080",
        credentials: true,
    })
);

app.use(express.static("dist"));
//
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//
app.use(
    session({
        secret: process.env.secret || "PynOjAuHetAuWawtinAytVunarAcjeBlybEshkEjVudyelwa",
        resave: false,
        store: myStore, //store
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            sameSite: true,
            maxAge: 86400 * 1000, // 600000,
            secure: false,
        },
    })
);

// store.sync();
myStore.sync();

app.use("/", mathOverflowRouter);

//start the Express server
const server = app.listen(port, () => {
    console.log(`HTTP server started at http://localhost:${port} !!!!`);
});

//question
export type question = {
    uid: string;
    name: string;
    body: string;
    userid: string;
    answers: number;
    votes: number;
};
export function isQuestion(value: any): value is question {
    if (!value) return false;
    if (typeof value.uid !== "string") return false;
    if (typeof value.name !== "string") return false;
    if (typeof value.body !== "string") return false;
    if (typeof value.userid !== "string") return false;
    if (typeof value.answers !== "number") return false;
    if (typeof value.votes !== "number") return false;
    return true;
}

//questions
export type questions = question[];
export function isQuestions(value: any): value is questions {
    if (!Array.isArray(value)) return false;
    for (const val of value) if (!isQuestions(val)) return false;
    return true;
}
//answer
export type answer = {
    uid: string;
    name: string;
    body: string;
    userid: string;
    questionid: string;
};
export function isAnswer(value: any): value is answer {
    if (!value) return false;
    if (typeof value.uid !== "string") return false;
    if (typeof value.name !== "string") return false;
    if (typeof value.body !== "string") return false;
    if (typeof value.userid !== "string") return false;
    if (typeof value.questionid !== "string") return false;
    return true;
}

//answers
export type answers = answer[];
export function isAnswers(value: any): value is answers {
    if (!Array.isArray(value)) return false;
    for (const val of value) if (!isAnswers(val)) return false;
    return true;
}

//user
export type user = {
    uid: string;
    name: string;
    questions: string;
    answers: string;
};
export function isUser(value: any): value is user {
    if (!value) return false;
    if (typeof value.uid !== "string") return false;
    if (typeof value.name !== "string") return false;
    if (typeof value.questions !== "string") return false;
    if (typeof value.answers !== "string") return false;
    return true;
}

//users
export type users = user[];
export function isUsers(value: any): value is users {
    if (!Array.isArray(value)) return false;
    for (const val of value) if (!isUsers(val)) return false;
    return true;
}

//define a global variable, questionsArray
let questionsArray = [];

//endpoints
