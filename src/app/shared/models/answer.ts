import { PropType, Choice } from 'src/app/shared/models';

export interface Answer {
    id: string,
    question: string,
    type: PropType,
    answer?: Choice,
    isCorrect?: boolean,
}