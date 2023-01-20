import { Question } from "./question";

export interface Sheet {
    uid: string,
    name: string,
    eventTime: string,
    password: string,
    owner: string,
    questions: Array<Question>

};
