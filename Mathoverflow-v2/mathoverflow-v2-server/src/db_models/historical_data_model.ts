import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import sequelize_db from "../config/database";
import { User } from "./user_model";

export class HistoricalData extends Model {
    public historical_id!: number;
    public action!: string;
    public data!: object;
}

HistoricalData.init(
    {
        historical_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        action: { type: DataTypes.TEXT },
        data: { type: DataTypes.JSON },
    },
    {
        sequelize: sequelize_db,
        tableName: "HistoricalData",
    }
);
