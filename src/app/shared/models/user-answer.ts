import { Answer } from '.';

export interface UserAnswer {
    userId: string,
    answers: Array<Answer>
}