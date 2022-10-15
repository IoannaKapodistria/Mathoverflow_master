import store from "@/store";
import ky from "ky";

export async function postQuestion(data: any) {
    console.log(data, " these are data");
    let respone = await ky
        .post("http://localhost:3000/ask", {
            mode: "cors",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json",
            },
            timeout: false,
        })
        .then((value: any) => {
            console.log("this is the value:", value);
        });
}

export async function getQuestions() {
    try {
        let response = await ky
            .get("http://localhost:3000/questions", {
                mode: "cors",
                headers: {
                    "content-type": "application/json",
                },
                timeout: false,
            })
            .catch((err: any) => {
                console.log("mathoverflow: error while attempting to get a list of questions", err);
            });
        if (response !== undefined) {
            const questions = await response.json();
            console.log(questions, "these are questions");
            store.commit("setQuestions", questions);
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getQuestion(id: any) {
    try {
        let response = await ky
            .get(`http://localhost:3000/questions/${id}`, {
                mode: "cors",
                headers: {
                    "content-type": "application/json",
                },
                timeout: false,
            })
            .catch((err: any) => {
                console.log("mathoverflow: error while attempting to get a question", err);
            });
        if (response !== undefined) {
            const value = await response.json();
            console.log(value, "this is the question by id 1");
            // store.commit("setQuestions", questions);
            return value;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getAnswer(id: any) {
    try {
        let response = await ky
            .get(`http://localhost:3000/answers/${id}`, {
                mode: "cors",
                headers: {
                    "content-type": "application/json",
                },
                timeout: false,
            })
            .catch((err: any) => {
                console.log("mathoverflow: error while attempting to get an answer", err);
            });
        if (response !== undefined) {
            const value = await response.json();
            console.log(value, "this is the answer by id 1");
            // store.commit("setQuestions", questions);
            return value;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function postAnswer(data: any) {
    console.log(data, " these are data");
    let respone = await ky
        .post("http://localhost:3000/answer", {
            mode: "cors",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json",
            },
            timeout: false,
        })
        .then((value: any) => {
            console.log("this is the value:", value);
        });
}

export async function getUsers() {
    try {
        let response = await ky
            .get("http://localhost:3000/users", {
                mode: "cors",
                headers: {
                    "content-type": "application/json",
                },
                timeout: false,
            })
            .catch((err: any) => {
                console.log("mathoverflow: error while attempting to get users", err);
            });
        if (response !== undefined) {
            const value = await response.json();
            console.log(value, "this is the users");
            store.commit("setUsers", value);
            return value;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getUser(id: any) {
    try {
        let response = await ky
            .get(`http://localhost:3000/users/${id}`, {
                mode: "cors",
                headers: {
                    "content-type": "application/json",
                },
                timeout: false,
            })
            .catch((err: any) => {
                console.log("mathoverflow: error while attempting to get a user", err);
            });
        if (response !== undefined) {
            const value = await response.json();
            console.log(value, "this is the user by id 1");
            // store.commit("setQuestions", questions);
            return value;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function isLogged() {
    try {
        let response = await ky
            .get("http://localhost:3000/islogged", {
                mode: "cors",
                headers: {
                    "content-type": "application/json",
                },
                timeout: false,
            })
            .catch((err: any) => {
                console.log("mathoverflow: error while attempting to get isLogged", err);
            });
        if (response !== undefined) {
            const value = await response.json();
            console.log(value, "this is the ISLOGGED");
            // store.commit("setUsers", value);
            return value;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function signUp(data: any) {
    let respone = await ky
        .post("http://localhost:3000/signup", {
            mode: "cors",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json",
            },
            timeout: false,
        })
        .then((value: any) => {
            console.log("this is the value:", value);
        });
}

export async function signIn(data: any) {
    let response = await ky
        .post("http://localhost:3000/signin", {
            mode: "cors",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json",
            },
            timeout: false,
        })
        .then(async (value: any) => {
            console.log("this is the login value:", value);
            console.log("this is the login response:", response);
            // isLogged();
            //
            // let response = await ky
            //     .post("http://localhost:3000/sessionCheck", {
            //         mode: "cors",
            //         body: JSON.stringify(value),
            //         headers: {
            //             "content-type": "application/json",
            //         },
            //         timeout: false,
            //     })
            //     .catch((err: any) => {
            //         console.log("mathoverflow: error while attempting to get sessionCheck", err);
            //     });
        });
    // .catch((err) => {
    //     console.log("something error occured,", err);
    //     return false;
    // });
}

//upvote question
export async function voteQuestion(data: any) {
    let response = await ky
        .post("http://localhost:3000/vote", {
            mode: "cors",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json",
            },
            timeout: false,
        })
        .then((value: any) => {
            console.log("this is the value:", value);
        });
}

//downvote question
//delete question
export async function deleteQuestion(id: any) {
    let response = await ky
        .delete(`http://localhost:3000/delete_question/${id}`, {
            mode: "cors",
            // body: JSON.stringify(data),
            headers: {
                "content-type": "application/json",
            },
            timeout: false,
        })
        .then((value: any) => {
            console.log("this is the value:", value);
        });
}

export async function deleteAnswer(id: any) {
    let response = await ky
        .delete(`http://localhost:3000/delete_answer/${id}`, {
            mode: "cors",
            // body: JSON.stringify(data),
            headers: {
                "content-type": "application/json",
            },
            timeout: false,
        })
        .then((value: any) => {
            console.log("this is the value:", value);
        });
}

export async function removeUser(id: any) {
    let response = await ky
        .delete(`http://localhost:3000/delete_user/${id}`, {
            mode: "cors",
            // body: JSON.stringify(data),
            headers: {
                "content-type": "application/json",
            },
            timeout: false,
        })
        .then((value: any) => {
            console.log("this is the value:", value);
        });
}
