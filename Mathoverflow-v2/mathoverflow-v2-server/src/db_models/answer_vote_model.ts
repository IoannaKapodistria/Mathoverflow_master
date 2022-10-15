import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import sequelize_db from "~/config/database";
import { Question } from "./question_model";

export class AnswerVote extends Model {
    public vote_id!: number;
    public value!: string;
    // public UserUserId!: number;
    // public QuestionQuestionId!: number;
}

AnswerVote.init(
    {
        vote_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        value: { type: DataTypes.INTEGER },
    },
    {
        sequelize: sequelize_db,
        tableName: "AnswerVote",
    }
);
