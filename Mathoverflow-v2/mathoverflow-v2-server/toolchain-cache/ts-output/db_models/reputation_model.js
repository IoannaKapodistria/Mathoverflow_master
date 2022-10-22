import { DataTypes, Model } from "sequelize";
import sequelize_db from "~/config/database";
export class Reputation extends Model {
    reputation_id;
    value;
}
Reputation.init({
    reputation_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    value: { type: DataTypes.TEXT },
}, {
    sequelize: sequelize_db,
    tableName: "Reputation",
});
//# sourceMappingURL=reputation_model.js.map