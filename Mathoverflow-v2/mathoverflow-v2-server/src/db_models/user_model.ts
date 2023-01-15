import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import sequelize_db from "../config/database";
import { Answer } from "./answer_model";
import { AnswerVote } from "./answer_vote_model";
import { HistoricalData } from "./historical_data_model";
import { Question } from "./question_model";
import { Reputation } from "./reputation_model";
import { Vote } from "./vote_model";
// import { Answer } from "../db_models/answer_model";
// import { Question } from "../db_models/question_model";

// interface UserAttributes {
//     user_id: number;
//     username: string;
//     email: string;
//     password: string;
//     questions: [];
//     answers: [];
//     // username: string;
// }

// // Some fields are optional when calling UserModel.create() or UserModel.build()
// interface UserCreationAttributes extends Optional<UserAttributes, "user_id"> {}

// // We need to declare an interface for our model that is basically what our class would be
// interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {}

// export const User = sequelize_db.define<UserInstance>(
//     "User",
//     {
//         user_id: {
//             type: DataTypes.INTEGER,
//             autoIncrement: true,
//             primaryKey: true,
//         },
//         username: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             unique: true, //https://stackoverflow.com/questions/22932447/sequelize-validation-throwing-error
//         },
//         email: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             unique: true,
//         },
//         password: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         questions: {
//             type: DataTypes.ARRAY,
//             allowNull: false,
//         },

//         answers: {
//             type: DataTypes.ARRAY,
//             allowNull: false,
//         },
//     },
//     {
//         tableName: "User",
//     }
// );

// module.exports = User;
export class User extends Model {
    public user_id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
    // dataValues: any;
}

User.init(
    {
        user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        username: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING },
        password: { type: DataTypes.STRING },

        // questions: { type: DataTypes.ARRAY(DataTypes.STRING) },
        // answers: { type: DataTypes.ARRAY(DataTypes.STRING) },
    },
    {
        sequelize: sequelize_db,
        tableName: "User",
    }
);

User.hasMany(Question, {
    as: "Question",
});
Question.belongsTo(User, {
    as: "User",
});

User.hasMany(Answer, {
    as: "Answer",
});
Answer.belongsTo(User, {
    as: "User",
});
User.hasMany(Vote, {
    as: "Vote",
});
Vote.belongsTo(User, {
    as: "User",
});
//
User.hasMany(AnswerVote, {
    as: "AnswerVote",
});
AnswerVote.belongsTo(User, {
    as: "User",
});
//
User.hasMany(Reputation, {
    as: "Reputation",
});
Reputation.belongsTo(User, {
    as: "User",
});

HistoricalData.belongsTo(User, {
    as: "User",
});

User.hasMany(HistoricalData, {
    as: "HistoricalData",
});
