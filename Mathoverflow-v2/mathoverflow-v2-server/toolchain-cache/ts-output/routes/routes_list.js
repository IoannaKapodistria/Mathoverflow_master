import { Router } from "express";
import { createQuestion } from "../db_controllers/questionsController";
const mathOverflowRouter = Router();
mathOverflowRouter.get("/", function (req, res) {
    res.render("hey this worked");
});
mathOverflowRouter.post("/ask", createQuestion);
export default mathOverflowRouter;
//# sourceMappingURL=routes_list.js.map