import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mathOverflowRouter from "./routes/routes.js";
import session from "express-session";
import sequelize_db from "./config/database.js";
import connectSessionSequelize from "connect-session-sequelize";
const SequelizeStore = connectSessionSequelize(session.Store);
const myStore = new SequelizeStore({
  db: sequelize_db,
  checkExpirationInterval: 15 * 60 * 1000,
  expiration: 86400 * 1000
});
const port = process.env.PORT || 3000;
sequelize_db.authenticate().then(() => console.log("Database connected...")).catch(err => console.log("Error: " + err));
const app = express();
app.use(cors({
  origin: `http://localhost:${port}`,
  credentials: true
}));
app.use(express.static("dist"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session({
  secret: process.env.secret || "PynOjAuHetAuWawtinAytVunarAcjeBlybEshkEjVudyelwa",
  resave: false,
  store: myStore,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: true,
    maxAge: 86400 * 1000,
    secure: false
  }
}));
myStore.sync();
app.use("/", mathOverflowRouter);
const server = app.listen(port, () => {
  console.log(`HTTP server started at http://localhost:${port} !!!!`);
});
export function isQuestion(value) {
  if (!value) return false;
  if (typeof value.uid !== "string") return false;
  if (typeof value.name !== "string") return false;
  if (typeof value.body !== "string") return false;
  if (typeof value.userid !== "string") return false;
  if (typeof value.answers !== "number") return false;
  if (typeof value.votes !== "number") return false;
  return true;
}
export function isQuestions(value) {
  if (!Array.isArray(value)) return false;

  for (const val of value) if (!isQuestions(val)) return false;

  return true;
}
export function isAnswer(value) {
  if (!value) return false;
  if (typeof value.uid !== "string") return false;
  if (typeof value.name !== "string") return false;
  if (typeof value.body !== "string") return false;
  if (typeof value.userid !== "string") return false;
  if (typeof value.questionid !== "string") return false;
  return true;
}
export function isAnswers(value) {
  if (!Array.isArray(value)) return false;

  for (const val of value) if (!isAnswers(val)) return false;

  return true;
}
export function isUser(value) {
  if (!value) return false;
  if (typeof value.uid !== "string") return false;
  if (typeof value.name !== "string") return false;
  if (typeof value.questions !== "string") return false;
  if (typeof value.answers !== "string") return false;
  return true;
}
export function isUsers(value) {
  if (!Array.isArray(value)) return false;

  for (const val of value) if (!isUsers(val)) return false;

  return true;
}
let questionsArray = [];