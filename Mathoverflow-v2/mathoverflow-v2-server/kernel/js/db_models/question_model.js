import { DataTypes, Model } from "sequelize";
import sequelize_db from "../config/database.js";
import { Answer } from "./answer_model.js";
import { Vote } from "./vote_model.js";
export class Question extends Model {
  question_id;
  title;
  body;
}
Question.init({
  question_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.TEXT
  },
  body: {
    type: DataTypes.TEXT
  }
}, {
  sequelize: sequelize_db,
  tableName: "Question"
});
Question.hasMany(Answer, {
  as: "Answer"
});
Answer.belongsTo(Question, {
  as: "Question"
});
Question.hasMany(Vote, {
  as: "Vote"
});
Vote.belongsTo(Question, {
  as: "Question"
});