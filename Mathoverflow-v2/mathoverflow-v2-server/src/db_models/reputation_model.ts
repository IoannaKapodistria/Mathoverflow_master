import { DataTypes, Model, Optional, Sequelize } from "sequelize";
// const sequelize_db = require("../config/database");
import sequelize_db from "~/config/database";

//
export class Reputation extends Model {
    public reputation_id!: number;
    public value!: string;
    // public userId!: number;
    // public UserUserId!: number;
    // public QuestionQuestionId!: number;
}

Reputation.init(
    {
        reputation_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        value: { type: DataTypes.TEXT },
        // userId: { type: DataTypes.INTEGER },

        // UserUserId: { type: DataTypes.INTEGER },
        // QuestionQuestionId: { type: DataTypes.INTEGER },
    },
    {
        sequelize: sequelize_db,
        tableName: "Reputation",
    }
);
