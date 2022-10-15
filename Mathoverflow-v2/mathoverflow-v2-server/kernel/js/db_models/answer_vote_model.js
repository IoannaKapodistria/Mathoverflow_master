import { DataTypes, Model } from "sequelize";
import sequelize_db from "../../../kernel/js/config/database.js";
export class AnswerVote extends Model {
  vote_id;
  value;
}
AnswerVote.init({
  vote_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  value: {
    type: DataTypes.INTEGER
  }
}, {
  sequelize: sequelize_db,
  tableName: "AnswerVote"
});