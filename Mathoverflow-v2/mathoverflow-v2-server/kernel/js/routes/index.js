import { Router } from "express";
import mathOverflowRouter from "./routes.js";
const routes = Router();
routes.use("/", mathOverflowRouter);
export default routes;