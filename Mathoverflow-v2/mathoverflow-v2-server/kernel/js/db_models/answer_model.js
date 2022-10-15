import { DataTypes, Model } from "sequelize";
import sequelize_db from "../../../kernel/js/config/database.js";
import { AnswerVote } from "./answer_vote_model.js";
export class Answer extends Model {
  answer_id;
  body;
}
Answer.init({
  answer_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  body: {
    type: DataTypes.TEXT
  }
}, {
  sequelize: sequelize_db,
  tableName: "Answer"
});
Answer.hasMany(AnswerVote, {
  as: "AnswerVote"
});
AnswerVote.belongsTo(Answer, {
  as: "Answer"
});