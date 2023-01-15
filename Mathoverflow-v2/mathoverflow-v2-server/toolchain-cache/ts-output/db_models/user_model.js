import { DataTypes, Model } from "sequelize";
import sequelize_db from "../config/database";
import { Answer } from "./answer_model";
import { AnswerVote } from "./answer_vote_model";
import { HistoricalData } from "./historical_data_model";
import { Question } from "./question_model";
import { Reputation } from "./reputation_model";
import { Vote } from "./vote_model";
export class User extends Model {
    user_id;
    username;
    email;
    password;
}
User.init({
    user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
}, {
    sequelize: sequelize_db,
    tableName: "User",
});
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
User.hasMany(AnswerVote, {
    as: "AnswerVote",
});
AnswerVote.belongsTo(User, {
    as: "User",
});
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
//# sourceMappingURL=user_model.js.map