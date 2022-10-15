export type question1 = {
    uid: string;
    title: string;
    body: string;
    userId: string;
};

export type buttonObj = {
    uid: string;
    title: string;
    icon: string;
    content?: buttons;
    url: string;
};

export type buttons = buttonObj[];
