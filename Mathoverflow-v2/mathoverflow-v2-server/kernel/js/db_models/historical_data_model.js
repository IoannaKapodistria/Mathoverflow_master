import { DataTypes, Model } from "sequelize";
import sequelize_db from "../config/database.js";
export class HistoricalData extends Model {
  historical_id;
  action;
  data;
}
HistoricalData.init({
  historical_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  action: {
    type: DataTypes.TEXT
  },
  data: {
    type: DataTypes.JSON
  }
}, {
  sequelize: sequelize_db,
  tableName: "HistoricalData"
});