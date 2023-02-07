import { Choice } from 'src/app/shared/models';
import { PropType } from ".";

export interface Prop {
    id: string,
    question: string,
    type: PropType,
    answer?: Choice,
    isCorrect?: boolean
}