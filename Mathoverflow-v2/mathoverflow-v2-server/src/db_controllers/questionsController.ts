import { AnswerVote } from "~/db_models/answer_vote_model";
import { Vote } from "~/db_models/vote_model";
import { Answer } from "../db_models/answer_model";
import { Question } from "../db_models/question_model";

// // exports.showQuestions =
// export async function showQuestions(req: any, res: any) {
//     try {
//         const questions = await Question.findAll();

//         res.render("questions", {
//             questions,
//         });
//     } catch (e: any) {
//         console.log("error is :", e.message);
//     }
// }

// // exports.showQuestionsbyId =
//     export async function showQuestionsbyId(req: any, res: any) {
//     try {
//         let id = req.params.id; //pairnw to id ap t url
//         //console.log(id);
//         const questionwithid = await Question.findByPk(id);
//         //answer body pare db
// const answers = await Answer.findAll({ where: { QuestionQuestionId: id } });
// console.log(answers);

// res.render("questionid", {
//     question_title: questionwithid?.title,
//     question_body: questionwithid?.body,
//     answers: answers,
// });
//     } catch (e) {
//         console.log("error is :", e.message);
//     }
// };

// exports.create_question = async function (req, res) {
//     try {
// const question = await Question.create({
//     title: req.body.title,
//     body: req.body.body,
//     UserUserId: req.session.user_sid,
// });

//         res.redirect("/questions");
//         //res.render("questions");
//     } catch (e) {
//         console.log("error is :", e.message, e);
//         res.render("questions");
//     }
// };

// exports.create_answer = async function (req, res) {
//     try {
//         const answer = await Answer.create({
//             body: req.body.body,
//             UserUserId: req.session.user_sid,
//             QuestionQuestionId: req.body.QuestionQuestionId,
//         });

//         res.redirect("/questions/" + req.body.QuestionQuestionId);
//     } catch (e) {
//         console.log("error is :", e.message, e);
//         res.redirect("/questions");
//         //mipws na to stelnw sto error page
//     }
// };
export async function createQuestion(req: any, res: any) {
    console.log("mpike sto create question");
    console.log(req.session.user_sid, "USER ID");
    // Validate request
    // if (!req.body.title) {
    //     res.status(400).send({
    //         message: "Content can not be empty!",
    //     });
    //     return;
    // }
    // Create a Question
    await Question.create(
        {
            title: req.body.title,
            body: req.body.body,
            UserUserId: req.session.user_sid,
            // answers: [],
        }
        // {
        //     include: [{ association: User }],
        // }
    )
        .then((data) => {
            res.send(data);
            //res.redirect("/questions");
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Tutorial.",
            });
        });
}

//get all questions
export async function getQuestions(req: any, res: any) {
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

//get one question
export async function getQuestion(req: any, res: any) {
    const id = req.params.id;
    // const id = 1;
    await Question.findByPk(id)
        .then(async (data) => {
            if (data) {
                const answers = await Answer.findAll({ where: { QuestionQuestionId: id } } /*{ include: [{ model: Question, as: "Question", where: { QuestionQuestionId: id } }] }*/);
                const votes = await Vote.findAll({ where: { QuestionQuestionId: id } });
                console.log(votes, "the get question value votes in server");

                // na ftiaxtei na epistrefetai kai to athroisma twn votes
                const value = {
                    data,
                    answers: answers,
                    votes: votes,
                    // votes2: votes,
                };
                console.log(value, "the get question value in server");
                res.send(value);
                // res.send(votes);
            } else {
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

export async function getAnswer(req: any, res: any) {
    const id = req.params.id;
    // const id = 1;
    await Answer.findByPk(id)
        .then(async (data) => {
            if (data) {
                // const answers = await Answer.findAll({ where: { QuestionQuestionId: id } } /*{ include: [{ model: Question, as: "Question", where: { QuestionQuestionId: id } }] }*/);
                const votes = await AnswerVote.findAll({ where: { AnswerAnswerId: id } });
                console.log(votes, "the votes in get answer");
                // na ftiaxtei na epistrefetai kai to athroisma twn votes
                const value = {
                    data,
                    // answers: answers,
                    answerVotes: votes,
                };
                console.log(value, "the get answer value");
                res.send(value);
            } else {
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

//update question
export function updateQuestion(req: any, res: any) {
    const id = req.params.id;
    Question.update(
        { body: req.body.body, title: req.body.title },
        // { title: req.body.title },
        {
            where: { question_id: id },
        }
    )
        .then(async (data) => {
            if (data) {
                res.send(data);
            } else {
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

//delete question
export function deleteQuestion(req: any, res: any) {
    const id = req.params.id;
    Question.destroy({
        where: { question_id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Question was deleted successfully!",
                });
            } else {
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

//delete all questions
export async function deleteAllQuestions(req: any, res: any) {
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

//create answer
export async function createAnswer(req: any, res: any) {
    // Validate request
    // if (!req.body.title) {
    //     res.status(400).send({
    //         message: "Content can not be empty!",
    //     });
    //     return;

    // }
    console.log(req.session, "this the req seession in answeer");
    console.log(req.body, "this the req body in answeer");
    await Answer.create({
        // title: req.body.title,
        body: req.body.body,
        UserUserId: req.session.user_sid,
        QuestionQuestionId: req.body.QuestionQuestionId,
    })
        .then((data: any) => {
            //res.redirect("/questions/" + req.body.QuestionQuestionId);

            res.send(data);
        })
        .catch((err: any) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Answer.",
            });
        });
}

//update answer

//delete answer

//delete all answers

//update answer
export function updateAnswer(req: any, res: any) {
    const id = req.params.id;
    Answer.update(
        { body: req.body.body },
        {
            where: { answer_id: id },
        }
    )
        .then(async (data) => {
            if (data) {
                res.send(data);
            } else {
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

//delete answer
export function deleteAnswer(req: any, res: any) {
    const id = req.params.id;
    Answer.destroy({
        where: { answer_id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Answer was deleted successfully!",
                });
            } else {
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

//delete all answers from a User, if delete ALL answers remove "where"
export async function deleteAllAnswers(req: any, res: any) {
    // const userId = req.params.id;
    Answer.destroy({
        where: { UserUserId: req.session.user_sid }, // check an einai swst
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

//create Vote
export async function createVote(req: any, res: any) {
    console.log(req.session, "this the req seession in vote");
    await Vote.create({
        // title: req.body.title,
        value: req.body.value,
        UserUserId: req.session.user_sid,
        QuestionQuestionId: req.body.QuestionQuestionId,
    })
        .then((data: any) => {
            //res.redirect("/questions/" + req.body.QuestionQuestionId);

            res.send(data);
        })
        .catch((err: any) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Vote.",
            });
        });
}

//update vote
export function updateVote(req: any, res: any) {
    const id = req.params.id;
    Vote.update(
        { value: req.body.value },
        {
            where: { vote_id: id },
        }
    )
        .then(async (data) => {
            if (data) {
                res.send({
                    message: "Vote with id=" + id + " has been updated successfully",
                });
            } else {
                res.status(404).send({
                    message: `Cannot update Vote with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            console.log(err, "this is the error");
            res.status(500).send({
                message: "Error retrieving Vote with id=" + id,
            });
        });
}

//delete vote
export function deleteVote(req: any, res: any) {
    const id = req.params.id;
    Vote.destroy({
        where: { vote_id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Vote was deleted successfully!",
                });
            } else {
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

//create AnswerVote
export async function createAnswerVote(req: any, res: any) {
    console.log(req.session, "this the req seession in answer-vote");
    await AnswerVote.create({
        // title: req.body.title,
        value: req.body.value,
        UserUserId: req.session.user_sid,
        AnswerAnswerId: req.body.AnswerAnswerId,
    })
        .then((data: any) => {
            res.send(data);
        })
        .catch((err: any) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Answer-Vote.",
            });
        });
}

//delete answer-vote
export function deleteAnswerVote(req: any, res: any) {
    const id = req.params.id;
    AnswerVote.destroy({
        where: { vote_id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "AnswerVote was deleted successfully!",
                });
            } else {
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
