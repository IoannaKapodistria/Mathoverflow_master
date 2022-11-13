import { Answer } from "../db_models/answer_model.js";
import { Question } from "../db_models/question_model.js";
import { User } from "../db_models/user_model.js";
export async function createUser(req, res) {
  console.log(req.body);
  await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }).then(data => {
    res.send(data);
  }).catch(err => {});
}
export async function getUser(req, res) {
  const userId = req.params.id;
  await User.findByPk(userId).then(async data => {
    if (data) {
      const answers = await Answer.findAll({
        where: {
          UserUserId: userId
        }
      });
      const questions = await Question.findAll({
        where: {
          UserUserId: userId
        }
      });
      const value = {
        data,
        questions: questions,
        answers: answers
      };
      res.send(value);
    } else {
      res.status(404).send({
        message: `Cannot find User with id=${userId}.`
      });
    }
  }).catch(err => {
    console.log(err, "this ise the error");
    res.status(500).send({
      message: "Error retrieving User with id =" + userId
    });
  });
}
export async function getUsers(req, res) {
  User.findAll().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving Users."
    });
  });
}
export async function signIn(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  await User.findOne({
    where: {
      username: username
    }
  }).then(user => {
    if (!user) {
      console.log("User doesn't exist");
    } else if (password !== user.get("password")) {
      console.log(user, "the user");
      console.log(username, "this is the username");
      console.log("Wrong Password!!!");
    } else {
      console.log(req.session, "the REQ SESSION ");
      req.session.user_sid = user.get("user_id");
      console.log(req.session.user_sid, "the REQ SESSION 2 ");
      console.log("User is signed in ");
      res.send(req.session);
    }
  });
}
export async function signOut(req, res) {
  req.session.destroy();
  console.log("User is signed out");
}
export async function isLogged(req, res) {
  if (req.session.user_sid) {
    console.log("user is logged in");
    res.send(JSON.stringify({
      islogged: "true",
      userId: req.session.user_sid
    }));
  } else {
    res.send(JSON.stringify({
      islogged: "false"
    }));
  }
}
export function sessionChecker(req, res, next) {
  console.log(req.session.user_sid, "the user sid");

  if (req.session.user_sid) {
    console.log("user is logged in", req.session.user);
    res.send({
      userSid: req.session.user_sid,
      message: "user is logged in"
    });
    next();
  } else {
    console.log("user is not logged in");
    res.send({
      userSid: req.session.user_sid,
      message: "user is not logged in"
    });
  }
}
export function updateUser(req, res) {
  const id = req.params.id;
  User.update({
    username: req.body.username
  }, {
    where: {
      user_id: id
    }
  }).then(async data => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot update User with id=${id}.`
      });
    }
  }).catch(err => {
    console.log(err, "this is the error");
    res.status(500).send({
      message: "Error retrieving User with id=" + id
    });
  });
}
export function deleteUser(req, res) {
  const id = req.params.id;
  User.destroy({
    where: {
      user_id: id
    }
  }).then(num => {
    if (num == 1) {
      res.send({
        message: "User was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete User with id=${id}. Maybe User was not found!`
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: "Could not delete User with id=" + id
    });
  });
}
export async function deleteAllUsers(req, res) {
  User.destroy({
    where: {},
    truncate: false
  }).then(nums => {
    res.send({
      message: `${nums} Users were deleted successfully!`
    });
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while removing all users."
    });
  });
}