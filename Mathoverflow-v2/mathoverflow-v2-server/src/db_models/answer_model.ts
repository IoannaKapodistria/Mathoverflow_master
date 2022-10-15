// const { Sequelize, DataTypes, Model } = require("sequelize");
import { DataTypes, Model, Optional, Sequelize } from "sequelize";
// const sequelize_db = require("../config/database");
import sequelize_db from "~/config/database";
import { AnswerVote } from "./answer_vote_model";
import { Question } from "./question_model";

// interface AnswerAttributes {
//     answer_id: number;
//     // title: string;
//     body: string;
//     userId: number;
//     questionId: number;
//     // password: string;
//     // username: string;
// }

// // Some fields are optional when calling UserModel.create() or UserModel.build()
// interface AnswerCreationAttributes extends Optional<AnswerAttributes, "answer_id"> {}

// // We need to declare an interface for our model that is basically what our class would be
// interface AnswerInstance extends Model<AnswerAttributes, AnswerCreationAttributes>, AnswerAttributes {}

// export const Answer = sequelize_db.define<AnswerInstance>(
//     "Answer",
//     {
//         answer_id: {
//             type: DataTypes.INTEGER,
//             autoIncrement: true,
//             primaryKey: true,
//             //autoIncrement: true, // mallon den xreiazetai me UUID
//         },

//         body: {
//             type: DataTypes.TEXT,
//             allowNull: false,
//         },
//         userId: {
//             type: DataTypes.INTEGER,
//             // autoIncrement: true,
//             // primaryKey: true,
//         },
//         questionId: {
//             type: DataTypes.INTEGER,
//             // autoIncrement: true,
//             // primaryKey: true,
//         },
//     },

//     {
//         tableName: "Answer",
//     }
// );

// // module.exports = Answer;
export class Answer extends Model {
    public answer_id!: number;
    public body!: string;
    // public UserUserId!: number;
    // public QuestionQuestionId!: number;
}

Answer.init(
    {
        answer_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        body: { type: DataTypes.TEXT },

        // UserUserId: { type: DataTypes.INTEGER },
        // QuestionQuestionId: { type: DataTypes.INTEGER },
    },
    {
        sequelize: sequelize_db,
        tableName: "Answer",
    }
);
// Answer.belongsTo(Question, { foreignKey: "QuestionQuestionId", as: "question" });
Answer.hasMany(AnswerVote, {
    as: "AnswerVote",
});
AnswerVote.belongsTo(Answer, {
    as: "Answer",
});
