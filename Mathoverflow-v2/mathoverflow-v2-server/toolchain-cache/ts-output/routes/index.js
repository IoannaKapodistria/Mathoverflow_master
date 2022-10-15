import { Router } from "express";
import mathOverflowRouter from "./routes";
const routes = Router();
routes.use("/", mathOverflowRouter);
export default routes;
//# sourceMappingURL=index.js.map