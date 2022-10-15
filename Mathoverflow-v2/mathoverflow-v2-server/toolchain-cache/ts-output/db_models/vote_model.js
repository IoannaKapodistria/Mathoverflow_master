import { DataTypes, Model } from "sequelize";
import sequelize_db from "~/config/database";
export class Vote extends Model {
    vote_id;
    value;
}
Vote.init({
    vote_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    value: { type: DataTypes.INTEGER },
}, {
    sequelize: sequelize_db,
    tableName: "Vote",
});
//# sourceMappingURL=vote_model.js.map