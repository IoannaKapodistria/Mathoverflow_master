import { DataTypes, Model } from "sequelize";
import sequelize_db from "../config/database.js";
import { Answer } from "./answer_model.js";
import { AnswerVote } from "./answer_vote_model.js";
import { Question } from "./question_model.js";
import { Reputation } from "./reputation_model.js";
import { Vote } from "./vote_model.js";
export class User extends Model {
  user_id;
  username;
  email;
  password;
}
User.init({
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  }
}, {
  sequelize: sequelize_db,
  tableName: "User"
});
User.hasMany(Question, {
  as: "Question"
});
Question.belongsTo(User, {
  as: "User"
});
User.hasMany(Answer, {
  as: "Answer"
});
Answer.belongsTo(User, {
  as: "User"
});
User.hasMany(Vote, {
  as: "Vote"
});
Vote.belongsTo(User, {
  as: "User"
});
User.hasMany(AnswerVote, {
  as: "AnswerVote"
});
AnswerVote.belongsTo(User, {
  as: "User"
});
User.hasMany(Reputation, {
  as: "Reputation"
});
Reputation.belongsTo(User, {
  as: "User"
});