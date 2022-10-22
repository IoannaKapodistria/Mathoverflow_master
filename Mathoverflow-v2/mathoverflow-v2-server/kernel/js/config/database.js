import { Sequelize } from "sequelize";
const sequelize_db = new Sequelize("mathoverflow_v2", "postgres", "1234", {
  host: "localhost",
  dialect: "postgres",
  logging: console.log
});
sequelize_db.sync({}).then(() => console.log("sync ok")).catch(err => console.error(".sync was called", err));
export default sequelize_db;