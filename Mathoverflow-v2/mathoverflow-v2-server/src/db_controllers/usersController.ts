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
            } else if (password !== user.get("password")) {
                /*get('password') */ console.log(user, "the user");
                console.log(username, "this is the username");
                // console.log(user.password, user.username, "this is the user,password");
                // res.redirect("/login");
                console.log("Wrong Password!!!");
            } else {
                console.log(req.session, "the REQ SESSION ");
                req.session.user_sid = user.get("user_id"); //user.dataValues.user_id //giati to xrisimopoiw meta stis questions and answers san user_id
                console.log(req.session.user_sid, "the REQ SESSION 2 ");

                // res.redirect("/questions");
                console.log("User is signed in ");
                // sessionChecker;
                // res.render("questions");
                res.send(req.session);
            }
        });
}

//sign out
export async function signOut(req: any, res: any) {
    req.session.destroy();
    //  res.redirect("/login");
    console.log("User is signed out");
}

//is logged
export async function isLogged(req: any, res: any) {
    if (req.session.user_sid) {
        console.log("user is logged in");
        res.send(JSON.stringify({ islogged: "true", userId: req.session.user_sid }));
    } else {
        res.send(JSON.stringify({ islogged: "false" }));
    }
}

// sessionChecker,  NA XRISIMOPOIITHEI
export function sessionChecker(req: any, res: any, next: any) {
    console.log(req.session.user_sid, "the user sid");
    if (req.session.user_sid) {
        console.log("user is logged in");
        res.send("user is logged in");

        next();
    } else {
        console.log("user is not logged in");
        res.send("user is not logged in");
        // res.redirect("/login");
    }
}

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