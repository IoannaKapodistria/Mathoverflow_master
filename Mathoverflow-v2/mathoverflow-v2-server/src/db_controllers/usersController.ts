import { Session } from "express-session";
import { HistoricalData } from "~/db_models/historical_data_model";
import { Reputation } from "~/db_models/reputation_model";
// import { sessions } from "~/main";
import { Answer } from "../db_models/answer_model";
import { Question } from "../db_models/question_model";
import { User } from "../db_models/user_model";

//create user/ Sign Up
export async function createUser(req: any, res: any) {
    console.log(req.body);
    await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password, // mono clear text, xwris hash h kruptografish
        // questions: [],
        // answers: [],
    })
        .then((data) => {
            res.send(data);
            // res.render("signup", {
            //message: "Account successfully created. You can now Log In.",
            //});
        })
        .catch((err) => {
            //res.render("signup", {
            //message: err.message || ": Username or Email already exists.",
            //});
        });
}

//get user by id
export async function getUser(req: any, res: any) {
    const userId = req.params.id;
    await User.findByPk(userId)
        .then(async (data) => {
            if (data) {
                const answers = await Answer.findAll({ /* include: { model: User,*/ where: { UserUserId: userId } });
                const questions = await Question.findAll({ /* include: { model: User, */ where: { UserUserId: userId } });
                // res.render("userid", {
                //     user_name: data.username, //userwithid
                //     answers: answers,
                //     questions: questions,
                // });
                const value = {
                    data,
                    questions: questions,
                    answers: answers,
                };
                res.send(value);
            } else {
                res.status(404).send({
                    message: `Cannot find User with id=${userId}.`,
                });
            }
        })
        .catch((err) => {
            console.log(err, "this ise the error");
            res.status(500).send({
                message: "Error retrieving User with id =" + userId,
            });
        });
}

//exports.showUserbyId = async function (req, res) {
// try {
//     let user_id = req.params.id; //pairnei to id apo to url
//     //console.log(id);
//     const Userwithid = await User.findByPk(user_id);
//     //answer body pare db
//     const answers = await Answer.findAll({ where: { UserUserId: user_id } });
//     const questions = await Question.findAll({
//         where: { UserUserId: user_id },
//     });
//     //console.log(answers);

//     res.render("userid", {
//         user_name: Userwithid.username,

//         answers: answers,
//         questions: questions,
//     });
// } catch (e) {
//     console.log("error is :", e.message);
// }
//};

//get all users
export async function getUsers(req: any, res: any) {
    User.findAll()
        .then((data) => {
            res.send(data);
            // res.render("users", {
            //     data,
            // });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Users.",
            });
        });
}

// exports.showUsers = async function (req, res) {
//     try {
//         const users = await User.findAll();

//         res.render("users", {
//             users,
//         });
//     } catch (e) {
//         console.log("error is :", e.message);
//     }
// };

export async function signIn(req: any, res: any) {
    const username = req.body.username;
    const password = req.body.password;
    await User.findOne({ where: { username: username } })
        // .catch((err: any) => {
        //     console.log(err, "this is the error");
        // })
        .then((user) => {
            if (!user) {
                // res.redirect("/login");
                console.log("User doesn't exist");
                // res.send("User doesn't exist");
            } else if (password !== user.get("password")) {
                /*get('password') */ console.log(user, "the user");
                console.log(username, "this is the username");
                // console.log(user.password, user.username, "this is the user,password");
                // res.redirect("/login");
                console.log("Wrong Password!!!");
            } else {
                console.log(req.session, "the REQ SESSION ");
                req.session.user_sid = user.get("user_id"); //user.dataValues.user_id //giati to xrisimopoiw meta stis questions and answers san user_id
                //to be deleted
                console.log(req.session, "the REQ SESSION 2 after user sid is added");
                console.log(req.session.user_sid, "the REQ SESSION 2 ");

                // res.redirect("/questions");
                console.log("User is signed in ");
                // sessionChecker;
                // aisLogged(req, res);
                // res.render("questions");
                res.send(req.session);
            }
        });
}

//sign out
export async function signOut(req: any, res: any) {
    req.session.destroy();
    // res.redirect("/login");
    res.send({ message: "User signed out successfully" });
    console.log("User is signed out");
}

//is logged
export async function isLogged(req: any, res: any) {
    if (req.session.user_sid) {
        console.log("user is logged in");
        res.send(JSON.stringify({ islogged: true, userId: req.session.user_sid }));
    } else {
        res.send(JSON.stringify({ islogged: false }));
    }
}

// sessionChecker,  NA XRISIMOPOIITHEI
export function sessionChecker(req: any, res: any, next: any) {
    console.log(req.session.user_sid, "the user sid");
    console.log(req.session, "the req.session in session checker");
    if (req.session.user_sid) {
        console.log("user is logged in", req.session.user);
        res.send({
            userSid: req.session.user_sid,
            message: "user is logged in",
        });

        next();
    } else {
        console.log("user is not logged in");
        res.send({
            userSid: req.session.user_sid,
            message: "user is not logged in",
        });
        res.redirect("/login");
    }
}

// export async function sessionChecker(req: any, res: any, next: any) {
//     //
//     const id = req.params.id;
//     // const id = 1;
//     await sessions
//         .findOne({ where: { sid: "fSRLbM3bq9gGFA-BoZKCqh-MavOZ7CUE" } }) //findByPk(id)
//         .then(async (data) => {
//             if (data) {
//                 // const answers = await Answer.findAll({ where: { QuestionQuestionId: id } } /*{ include: [{ model: Question, as: "Question", where: { QuestionQuestionId: id } }] }*/);
//                 // const votes = await Vote.findAll({ where: { QuestionQuestionId: id } });

//                 // const value = {
//                 //     data,
//                 //     answers: answers,
//                 //     votes: votes,
//                 // };
//                 res.send(data, "the data from check session");
//             } else {
//                 res.status(404).send({
//                     message: `Session checker Cannot find User with id=${id}.`,
//                 });
//             }
//         })
//         .catch((err) => {
//             console.log(err, "this is teh error");
//             res.status(500).send({
//                 message: "Error retrieving User with id=" + id,
//             });
//         });
// }

//update user
export function updateUser(req: any, res: any) {
    const id = req.params.id;
    User.update(
        { username: req.body.username },
        {
            where: { user_id: id },
        }
    )
        .then(async (data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot update User with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            console.log(err, "this is the error");
            res.status(500).send({
                message: "Error retrieving User with id=" + id,
            });
        });
}

//delete user
export function deleteUser(req: any, res: any) {
    const id = req.params.id;
    User.destroy({
        where: { user_id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete User with id=" + id,
            });
        });
}

//delete all users
export async function deleteAllUsers(req: any, res: any) {
    User.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({ message: `${nums} Users were deleted successfully!` });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all users.",
            });
        });
}

//create Vote
export async function createReputation(req: any, res: any) {
    console.log(req.session, "this the req seession in vote");
    await Reputation.create({
        // title: req.body.title,
        value: req.body.value,
        UserUserId: req.body.userId, //req.session.user_sid,
        // QuestionQuestionId: req.body.QuestionQuestionId,
    })
        .then((data: any) => {
            //res.redirect("/questions/" + req.body.QuestionQuestionId);
            res.send(data);
        })
        .catch((err: any) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Reputation.",
            });
        });
}

//delete reputation
export function deleteReputation(req: any, res: any) {
    const id = req.params.id;
    Reputation.destroy({
        where: { reputation_id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Reputation was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete Reputation with id=${id}. Maybe Reputation was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Reputation with id=" + id,
            });
        });
}
export async function getReputation(req: any, res: any) {
    const id = req.params.id;
    await Reputation.findOne({ where: { UserUserId: id } })
        // await Reputation.findByPk(id)
        .then(async (data) => {
            if (data) {
                // const answers = await Answer.findAll({ where: { QuestionQuestionId: id } } /*{ include: [{ model: Question, as: "Question", where: { QuestionQuestionId: id } }] }*/);
                // const votes = await Vote.findAll({ where: { QuestionQuestionId: id } });

                // na ftiaxtei na epistrefetai kai to athroisma twn votes
                // const value = {
                //     data,
                // };
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Reputation with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not find Reputation with id=" + id,
            });
        });
}

//update reputation
export function updateReputation(req: any, res: any) {
    const id = req.params.id;
    Reputation.update(
        { value: req.body.value },
        // { title: req.body.title },
        {
            where: { reputation_id: id },
        }
    )
        .then(async (data) => {
            if (data) {
                res.send({
                    message: "Reputation with id=" + id + " has been updated successfully",
                });
            } else {
                res.status(404).send({
                    message: `Cannot update Reputation with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            console.log(err, "this is the error");
            res.status(500).send({
                message: "Error retrieving Reputation with id=" + id,
            });
        });
}
//create Historical Data
export async function createHistorical(req: any, res: any) {
    console.log(req.session, "this the req seession in vote");
    await HistoricalData.create({
        // title: req.body.title,
        action: req.body.action,
        data: req.body.data,
        UserUserId: req.session.user_sid,
        // QuestionQuestionId: req.body.QuestionQuestionId,
    })
        .then((data: any) => {
            //res.redirect("/questions/" + req.body.QuestionQuestionId);

            res.send(data);
        })
        .catch((err: any) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Historical Data.",
            });
        });
}

export async function getHistorical(req: any, res: any) {
    const id = req.params.id;
    await HistoricalData.findAll({ where: { UserUserId: id } })
        .then(async (data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Historical Data with user-id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not find Historical Data with user-id=" + id,
            });
        });
}
