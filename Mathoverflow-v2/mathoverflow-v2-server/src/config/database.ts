// const { Sequelize } = require("sequelize");
// const { applyExtraSetup } = require("./extra-setup");
import { Sequelize } from "sequelize";
// import applyExtraSetup from "./extra-setup";
import { Answer } from "../db_models/answer_model";
import { Question } from "../db_models/question_model";
import { User } from "../db_models/user_model";

//Option 2: Passing parameters separately (other dialects)
const sequelize_db: Sequelize = new Sequelize("new_math", "postgres", "1234", {
    host: "localhost",
    dialect: "postgres",
    logging: console.log,
});

// const modelDefiners = [
//     require("../db_models/question_model"),
//     require("../db_models/answer_model"),
//     require("../db_models/user_model"),
//     // Add more models here...
//     // require('./models/item'),
//     // User,
//     // Answer,
//     // Question,
// ];

// for (const modelDefiner of modelDefiners) {
//     new modelDefiner(sequelize_db);
// }
//
// applyExtraSetup(sequelize_db);

sequelize_db
    .sync({}) //force: true adds a DROP TABLE IF EXISTS before trying to create the table - if you force, existing tables will be overwritten.
    .then(() => console.log("sync ok"))
    .catch((err) => console.error(".sync was called", err));

export default sequelize_db;

// const dbUrl: string = process.env.DB_URL || "";
// const nodeEnv: string = process.env.NODE_ENV || "";

// if (!dbUrl) {
//     console.log("Please create .env file, refer .env.sample");
//     process.exit(0);
// }

// let optionsObj: object = { benchmark: true, logging: console.log };

// if (nodeEnv && nodeEnv === "production") {
//     optionsObj = { logging: false };
// }
// const options = optionsObj;

// export const sequelize: Sequelize = new Sequelize(dbUrl, options);

// sequelize
//     .authenticate()
//     .then(() => {
//         console.log("Connection has been established successfully..");
//     })
//     .catch((err) => {
//         console.error("Unable to connect to the database:", err);
//     });
