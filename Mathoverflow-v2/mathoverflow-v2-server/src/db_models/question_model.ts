import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import sequelize_db from "../config/database";
import { Answer } from "./answer_model";
import { User } from "./user_model";
import { Vote } from "./vote_model";

// interface QuestionAttributes {
//     question_id: number;
//     title: string;
//     body: string;
//     userId: number;
//     answers: [];

//     // password: string;
//     // username: string;
// }

// // Some fields are optional when calling UserModel.create() or UserModel.build()
// interface QuestionCreationAttributes extends Optional<QuestionAttributes, "question_id"> {}

// // We need to declare an interface for our model that is basically what our class would be
// interface QuestionInstance extends Model<QuestionAttributes, QuestionCreationAttributes>, QuestionAttributes {}

// export const Question = sequelize_db.define<QuestionInstance>(
//     "Question",
//     {
//         question_id: {
//             type: DataTypes.INTEGER,
//             autoIncrement: true,
//             primaryKey: true,
//             //autoIncrement: true, // mallon den xreiazetai me UUID
//         },
//         title: {
//             type: DataTypes.TEXT,
//             allowNull: false,
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
//         answers: {
//             type: DataTypes.ARRAY,
//             allowNull: false,
//         },
//     },

//     {
//         tableName: "Question",
//     }
// );

// module.exports = Question;
// export default class Question extends Model {}
// Question.init(
//     {
//         title: {
//             allowNull: false,
//             type: DataTypes.STRING(100),
//         },
//     },
//     { sequelize_db, modelName: "books" }
// );

export class Question extends Model {
    public question_id!: number;
    public title!: string;
    public body!: string;
    // public UserUserId!: number;
    // public answers!: [];
}

Question.init(
    {
        question_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        title: { type: DataTypes.TEXT },
        body: { type: DataTypes.TEXT },

        // answers: { type: DataTypes.ARRAY(DataTypes.STRING) },
        // UserUserId: { type: DataTypes.INTEGER },
    },
    {
        sequelize: sequelize_db,
        tableName: "Question",
    }
);
// Question.belongsTo(User, { foreignKey: "question_id", as: "question" });
Question.hasMany(Answer, {
    as: "Answer",
    //foreignKey: "answer_id",
});
Answer.belongsTo(Question, {
    as: "Question",
    //foreignKey: "answer_id",
});

Question.hasMany(Vote, {
    as: "Vote",
});
Vote.belongsTo(Question, {
    as: "Question",
});
