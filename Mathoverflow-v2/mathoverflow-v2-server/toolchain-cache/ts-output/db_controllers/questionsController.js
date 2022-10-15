import { AnswerVote } from "~/db_models/answer_vote_model";
import { Vote } from "~/db_models/vote_model";
import { Answer } from "../db_models/answer_model";
import { Question } from "../db_models/question_model";
export async function createQuestion(req, res) {
    console.log("mpike sto create question");
    console.log(req.session.user_sid, "USER ID");
    await Question.create({
        title: req.body.title,
        body: req.body.body,
        UserUserId: req.session.user_sid,
    })
        .then((data) => {
        res.send(data);
    })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Tutorial.",
        });
    });
}
export async function getQuestions(req, res) {
    console.log("mpioka get questions");
    await Question.findAll()
        .then((data) => {
        res.send(data);
    })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving questions.",
        });
    });
}
export async function getQuestion(req, res) {
    const id = req.params.id;
    await Question.findByPk(id)
        .then(async (data) => {
        if (data) {
            const answers = await Answer.findAll({ where: { QuestionQuestionId: id } });
            const votes = await Vote.findAll({ where: { QuestionQuestionId: id } });
            const value = {
                data,
                answers: answers,
                votes: votes,
            };
            res.send(value);
        }
        else {
            res.status(404).send({
                message: `Cannot find Question with id=${id}.`,
            });
        }
    })
        .catch((err) => {
        console.log(err, "this is teh error");
        res.status(500).send({
            message: "Error retrieving Question with id=" + id,
        });
    });
}
export async function getAnswer(req, res) {
    const id = req.params.id;
    await Answer.findByPk(id)
        .then(async (data) => {
        if (data) {
            const votes = await AnswerVote.findAll({ where: { AnswerAnswerId: id } });
            const value = {
                data,
                answerVotes: votes,
            };
            res.send(value);
        }
        else {
            res.status(404).send({
                message: `Cannot find Answer with id=${id}.`,
            });
        }
    })
        .catch((err) => {
        console.log(err, "this is teh error");
        res.status(500).send({
            message: "Error retrieving Answer with id=" + id,
        });
    });
}
export function updateQuestion(req, res) {
    const id = req.params.id;
    Question.update({ body: req.body.body, title: req.body.title }, {
        where: { question_id: id },
    })
        .then(async (data) => {
        if (data) {
            res.send(data);
        }
        else {
            res.status(404).send({
                message: `Cannot update Question with id=${id}.`,
            });
        }
    })
        .catch((err) => {
        console.log(err, "this is the error");
        res.status(500).send({
            message: "Error retrieving Question with id=" + id,
        });
    });
}
export function deleteQuestion(req, res) {
    const id = req.params.id;
    Question.destroy({
        where: { question_id: id },
    })
        .then((num) => {
        if (num == 1) {
            res.send({
                message: "Question was deleted successfully!",
            });
        }
        else {
            res.send({
                message: `Cannot delete Question with id=${id}. Maybe Question was not found!`,
            });
        }
    })
        .catch((err) => {
        res.status(500).send({
            message: "Could not delete Question with id=" + id,
        });
    });
}
export async function deleteAllQuestions(req, res) {
    Question.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
        res.send({ message: `${nums} Questions were deleted successfully!` });
    })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all questions.",
        });
    });
}
export async function createAnswer(req, res) {
    console.log(req.session, "this the req seession in answeer");
    console.log(req.body, "this the req body in answeer");
    await Answer.create({
        body: req.body.body,
        UserUserId: req.session.user_sid,
        QuestionQuestionId: req.body.QuestionQuestionId,
    })
        .then((data) => {
        res.send(data);
    })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Answer.",
        });
    });
}
export function updateAnswer(req, res) {
    const id = req.params.id;
    Answer.update({ body: req.body.body }, {
        where: { answer_id: id },
    })
        .then(async (data) => {
        if (data) {
            res.send(data);
        }
        else {
            res.status(404).send({
                message: `Cannot update Answer with id=${id}.`,
            });
        }
    })
        .catch((err) => {
        console.log(err, "this is the error");
        res.status(500).send({
            message: "Error retrieving Answer with id=" + id,
        });
    });
}
export function deleteAnswer(req, res) {
    const id = req.params.id;
    Answer.destroy({
        where: { answer_id: id },
    })
        .then((num) => {
        if (num == 1) {
            res.send({
                message: "Answer was deleted successfully!",
            });
        }
        else {
            res.send({
                message: `Cannot delete Answer with id=${id}. Maybe Answer was not found!`,
            });
        }
    })
        .catch((err) => {
        res.status(500).send({
            message: "Could not delete Answer with id=" + id,
        });
    });
}
export async function deleteAllAnswers(req, res) {
    Answer.destroy({
        where: { UserUserId: req.session.user_sid },
        truncate: false,
    })
        .then((nums) => {
        res.send({ message: `${nums} Answers were deleted successfully!` });
    })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all answers.",
        });
    });
}
export async function createVote(req, res) {
    console.log(req.session, "this the req seession in vote");
    await Vote.create({
        value: req.body.value,
        UserUserId: req.session.user_sid,
        QuestionQuestionId: req.body.QuestionQuestionId,
    })
        .then((data) => {
        res.send(data);
    })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Vote.",
        });
    });
}
export function deleteVote(req, res) {
    const id = req.params.id;
    Vote.destroy({
        where: { vote_id: id },
    })
        .then((num) => {
        if (num == 1) {
            res.send({
                message: "Vote was deleted successfully!",
            });
        }
        else {
            res.send({
                message: `Cannot delete Vote with id=${id}. Maybe Vote was not found!`,
            });
        }
    })
        .catch((err) => {
        res.status(500).send({
            message: "Could not delete Vote with id=" + id,
        });
    });
}
export async function createAnswerVote(req, res) {
    console.log(req.session, "this the req seession in answer-vote");
    await AnswerVote.create({
        value: req.body.value,
        UserUserId: req.session.user_sid,
        AnswerAnswerId: req.body.AnswerAnswerId,
    })
        .then((data) => {
        res.send(data);
    })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Answer-Vote.",
        });
    });
}
export function deleteAnswerVote(req, res) {
    const id = req.params.id;
    AnswerVote.destroy({
        where: { vote_id: id },
    })
        .then((num) => {
        if (num == 1) {
            res.send({
                message: "AnswerVote was deleted successfully!",
            });
        }
        else {
            res.send({
                message: `Cannot delete AnswerVote with id=${id}. Maybe AnswerVote was not found!`,
            });
        }
    })
        .catch((err) => {
        res.status(500).send({
            message: "Could not delete AnswerVote with id=" + id,
        });
    });
}
//# sourceMappingURL=questionsController.js.map